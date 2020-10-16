import { initialize } from 'redux-form';
import { routeConverter } from '@entando/utils';
import { addToast, addErrors, TOAST_ERROR } from '@entando/messages';

import { loadSelectedPageTemplate } from 'state/page-templates/actions';
import { getSelectedPageTemplateMainFrame, getSelectedPageTemplateDefaultConfig } from 'state/page-templates/selectors';
import { loadSelectedPage, setSelectedPage } from 'state/pages/actions';
import { validatePageTemplate } from 'state/page-templates/helpers';
import {
  getPageConfig,
  deletePageWidget,
  putPageWidget,
  restorePageConfig,
  applyDefaultPageConfig,
} from 'api/pages';

import { getPublishedConfigMap, makeGetSelectedPageConfig } from 'state/page-config/selectors';
import { getWidgetsMap } from 'state/widgets/selectors';
import { getSelectedPage, getSelectedPageIsPublished } from 'state/pages/selectors';
import {
  SET_SEARCH_FILTER, CHANGE_VIEW_LIST, TOGGLE_CONTENT_TOOLBAR_EXPANDED,
  SET_PAGE_WIDGET, SET_PAGE_CONFIG, SET_PUBLISHED_PAGE_CONFIG, REMOVE_PAGE_WIDGET, TOGGLE_CONTENT,
} from 'state/page-config/types';
import { PAGE_STATUS_DRAFT, PAGE_STATUS_PUBLISHED } from 'state/pages/const';
import { history, ROUTE_WIDGET_CONFIG } from 'app-init/router';
import { toggleLoading } from 'state/loading/actions';
import { setAppTourLastStep } from 'state/app-tour/actions';
import { widgetNextSteps } from 'ui/app-tour/AppTourContainer';
import { getAppTourProgress } from 'state/app-tour/selectors';
import { APP_TOUR_STARTED } from 'state/app-tour/const';

export const setPageConfig = (pageCode, pageConfig = null) => ({
  type: SET_PAGE_CONFIG,
  payload: {
    pageCode,
    pageConfig,
  },
});

export const setPublishedPageConfig = (pageCode, pageConfig) => ({
  type: SET_PUBLISHED_PAGE_CONFIG,
  payload: {
    pageCode,
    pageConfig,
  },
});

export const setPageWidget = (pageCode, widgetId, sourceFrameId, targetFrameId, widgetConfig) => ({
  type: SET_PAGE_WIDGET,
  payload: {
    pageCode,
    widgetId,
    sourceFrameId,
    targetFrameId,
    widgetConfig,
  },
});

export const removePageWidgetSync = (pageCode, frameId) => ({
  type: REMOVE_PAGE_WIDGET,
  payload: {
    pageCode,
    frameId,
  },
});

export const toggleContent = () => ({
  type: TOGGLE_CONTENT,
});

export const toggleContentToolbarExpanded = expand => ({
  type: TOGGLE_CONTENT_TOOLBAR_EXPANDED,
  payload: {
    expand,
  },
});

export const setSearchFilter = filter => ({
  type: SET_SEARCH_FILTER,
  payload: {
    filter,
  },
});

export const changeViewList = view => ({
  type: CHANGE_VIEW_LIST,
  payload: {
    view,
  },
});


export const fetchPageConfig = (pageCode, status) =>
  dispatch => new Promise((resolve, reject) => {
    dispatch(toggleLoading('pageConfig'));
    getPageConfig(pageCode, status)
      .then(response => response.json()
        .then((json) => {
          dispatch(toggleLoading('pageConfig'));
          if (response.ok) {
            if (status === PAGE_STATUS_DRAFT) {
              dispatch(setPageConfig(pageCode, json.payload));
            } else {
              dispatch(setPublishedPageConfig(pageCode, json.payload));
            }
            return resolve(json.payload);
          }
          dispatch(addErrors(json.errors.map(e => e.message)));
          json.errors.forEach(err => dispatch(addToast(err.message, TOAST_ERROR)));
          return resolve();
        }).catch((err) => { dispatch(toggleLoading('pageConfig')); reject(err); }))
      .catch((err) => { dispatch(toggleLoading('pageConfig')); reject(err); });
  });


export const initConfigPage = pageCode => async (dispatch) => {
  try {
    const selectedPage = await dispatch(loadSelectedPage(pageCode));
    if (!selectedPage) {
      return;
    }

    const pageTemplate = await dispatch(loadSelectedPageTemplate(selectedPage.pageModel));
    if (!pageTemplate) {
      return;
    }

    const errors = validatePageTemplate(pageTemplate);
    if (errors && errors.length) {
      const translatedErrors = errors.map(({ id, values }) => ({ id, values }));
      dispatch(addErrors(translatedErrors));
      errors.forEach(err => dispatch(addToast(err.message, TOAST_ERROR)));
      return;
    }

    dispatch(fetchPageConfig(pageCode, PAGE_STATUS_DRAFT));
    if (selectedPage.status === PAGE_STATUS_PUBLISHED) {
      dispatch(fetchPageConfig(pageCode, PAGE_STATUS_PUBLISHED));
    } else {
      dispatch(setPublishedPageConfig(pageCode, null));
    }
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log('initConfigPage failed:', e);
  }
};


export const removePageWidget = (frameId, pageCode) => (dispatch, getState) => (
  deletePageWidget(pageCode, frameId)
    .then(() => {
      dispatch(removePageWidgetSync(pageCode, frameId));

      const isPagePublished = getSelectedPageIsPublished(getState());
      if (isPagePublished) {
        const selectedPage = getSelectedPage(getState());
        dispatch(setSelectedPage({
          ...selectedPage,
          status: PAGE_STATUS_DRAFT,
        }));
      }
    }).catch(() => {})
);

export const updatePageWidget = (widgetId, sourceFrameId, targetFrameId, pageCode) =>
  (dispatch, getState) => {
    const pageConfig = makeGetSelectedPageConfig(pageCode)(getState());

    // build payload
    const config = (pageConfig && pageConfig[sourceFrameId] && pageConfig[sourceFrameId].config);
    const requestBody = config ? { code: widgetId, config } : { code: widgetId };

    const promise = Promise.resolve();
    const putPagePromise = () =>
      promise.then(() => putPageWidget(pageCode, targetFrameId, requestBody))
        .then(() => {
          dispatch(setPageWidget(pageCode, widgetId, sourceFrameId, targetFrameId));
          const nextStep = widgetNextSteps[widgetId];
          const appTourProgress = getAppTourProgress(getState());
          if (nextStep && appTourProgress === APP_TOUR_STARTED) {
            dispatch(setAppTourLastStep(nextStep));
          }

          const isPagePublished = getSelectedPageIsPublished(getState());
          if (isPagePublished) {
            const selectedPage = getSelectedPage(getState());
            dispatch(setSelectedPage({
              ...selectedPage,
              status: PAGE_STATUS_DRAFT,
            }));
          }
        }).catch(() => {});

    if (sourceFrameId != null) {
      return promise
        .then(() => deletePageWidget(pageCode, sourceFrameId).then(() => putPagePromise()));
    }

    return putPagePromise();
  };

export const setSelectedPageOnTheFly = (value, pageCode) => (dispatch, getState) =>
  new Promise((resolve) => {
    const state = getState();
    const mainFrame = getSelectedPageTemplateMainFrame(state);

    if (!pageCode || !mainFrame) {
      resolve(null);
    }
    if (value) {
      dispatch(updatePageWidget('content_viewer', null, mainFrame.pos, pageCode))
        .then(resolve);
    } else {
      dispatch(removePageWidget(mainFrame.pos, pageCode))
        .then(resolve);
    }
  });

export const restoreSelectedPageConfig = pageCode => (dispatch, getState) => {
  const state = getState();
  const publishedPageConfigMap = getPublishedConfigMap(state);
  const publishedConfig = publishedPageConfigMap[pageCode];
  if (!pageCode || !publishedConfig) {
    return new Promise(r => r());
  }
  return new Promise((resolve) => {
    restorePageConfig(pageCode).then((response) => {
      if (response.ok) {
        dispatch(setPageConfig(pageCode, publishedConfig));
      }
      resolve();
    }).catch(() => {});
  });
};


export const applyDefaultConfig = pageCode => (dispatch, getState) =>
  new Promise((resolve) => {
    const state = getState();
    const defaultConfig = getSelectedPageTemplateDefaultConfig(state);

    if (!pageCode || !defaultConfig) {
      resolve();
      return;
    }
    applyDefaultPageConfig(pageCode).then((response) => {
      if (response.ok) {
        dispatch(setPageConfig(pageCode, defaultConfig));
      }
      resolve();
    }).catch(() => {});
  });

export const configOrUpdatePageWidget = (sourceWidgetId, sourceFrameId, targetFrameId, pageCode) =>
  (dispatch, getState) => new Promise((resolve) => {
    const widget = getWidgetsMap(getState())[sourceWidgetId];
    const pageConfig = makeGetSelectedPageConfig(pageCode)(getState());

    const isAlreadyConfigured =
      !!(pageConfig && pageConfig[sourceFrameId] && pageConfig[sourceFrameId].config);
    if (widget.hasConfig && !isAlreadyConfigured) {
      const nextStep = widgetNextSteps[sourceWidgetId];
      const appTourProgress = getAppTourProgress(getState());
      history.push(routeConverter(
        ROUTE_WIDGET_CONFIG,
        { pageCode, widgetCode: sourceWidgetId, framePos: targetFrameId },
      ));
      if (nextStep && appTourProgress === APP_TOUR_STARTED) {
        dispatch(setAppTourLastStep(nextStep));
      }
      resolve();
    } else {
      dispatch(updatePageWidget(sourceWidgetId, sourceFrameId, targetFrameId, pageCode))
        .then(resolve);
    }
  });

export const editWidgetConfig = (frameId, pageCode) =>
  (dispatch, getState) => {
    const pageConfig = makeGetSelectedPageConfig(pageCode)(getState());
    const pageConfigItem = (pageConfig && pageConfig[frameId]);

    if (pageConfigItem) {
      const widget = getWidgetsMap(getState())[pageConfigItem.code];
      const isConfigurableWidget = widget && widget.hasConfig;

      if (isConfigurableWidget || pageConfigItem.config) {
        dispatch(initialize('widgetConfigForm', pageConfigItem.config));
        history.push(routeConverter(
          ROUTE_WIDGET_CONFIG,
          { pageCode, widgetCode: pageConfigItem.code, framePos: frameId },
        ));
      }
    }
  };
