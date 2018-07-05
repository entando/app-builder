import { initialize } from 'redux-form';
import { getParams, gotoRoute } from '@entando/router';
import { formattedText } from '@entando/utils';
import { addErrors } from '@entando/messages';

import { loadSelectedPageModel } from 'state/page-models/actions';
import { getSelectedPageModelMainFrame, getSelectedPageModelDefaultConfig } from 'state/page-models/selectors';
import { loadSelectedPage } from 'state/pages/actions';
import { validatePageModel } from 'state/page-models/helpers';
import {
  getPageConfig,
  deletePageWidget,
  putPageWidget,
  restorePageConfig,
  applyDefaultPageConfig,
} from 'api/pages';
import { getPublishedConfigMap, getSelectedPageConfig } from 'state/page-config/selectors';
import { getWidgetsMap } from 'state/widgets/selectors';
import {
  SET_SEARCH_FILTER, CHANGE_VIEW_LIST, TOGGLE_CONTENT_TOOLBAR_EXPANDED,
  SET_PAGE_WIDGET, SET_PAGE_CONFIG, SET_PUBLISHED_PAGE_CONFIG, REMOVE_PAGE_WIDGET, TOGGLE_CONTENT,
} from 'state/page-config/types';
import { PAGE_STATUS_DRAFT, PAGE_STATUS_PUBLISHED } from 'state/pages/const';
import { ROUTE_WIDGET_CONFIG } from 'app-init/router';


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
  dispatch => getPageConfig(pageCode, status)
    .then(response => response.json()
      .then((json) => {
        if (response.ok) {
          if (status === PAGE_STATUS_DRAFT) {
            dispatch(setPageConfig(pageCode, json.payload));
          } else {
            dispatch(setPublishedPageConfig(pageCode, json.payload));
          }
          return json.payload;
        }
        dispatch(addErrors(json.errors.map(e => e.message)));
        return null;
      })).catch(() => {});


export const initConfigPage = () => async (dispatch, getState) => {
  try {
    const { pageCode } = getParams(getState());

    const selectedPage = await dispatch(loadSelectedPage(pageCode));
    if (!selectedPage) {
      return;
    }

    const pageModel = await dispatch(loadSelectedPageModel(selectedPage.pageModel));
    if (!pageModel) {
      return;
    }

    const errors = validatePageModel(pageModel);
    if (errors && errors.length) {
      const translatedErrors = errors.map(err => formattedText(err.id, null, err.values));
      dispatch(addErrors(translatedErrors));
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


export const removePageWidget = frameId => (dispatch, getState) => {
  const { pageCode } = getParams(getState());
  return deletePageWidget(pageCode, frameId)
    .then(() => {
      dispatch(removePageWidgetSync(pageCode, frameId));
    }).catch(() => {});
};

export const updatePageWidget = (widgetId, sourceFrameId, targetFrameId) =>
  (dispatch, getState) => {
    const { pageCode } = getParams(getState());
    const pageConfig = getSelectedPageConfig(getState());

    // build payload
    const config = (pageConfig && pageConfig[sourceFrameId] && pageConfig[sourceFrameId].config);
    const requestBody = config ? { code: widgetId, config } : { code: widgetId };

    const promise = Promise.resolve();
    if (sourceFrameId != null) {
      promise.then(() => deletePageWidget(pageCode, sourceFrameId));
    }

    return promise.then(() => putPageWidget(pageCode, targetFrameId, requestBody))
      .then(() => {
        dispatch(setPageWidget(pageCode, widgetId, sourceFrameId, targetFrameId));
      }).catch(() => {});
  };

export const setSelectedPageOnTheFly = value => (dispatch, getState) =>
  new Promise((resolve) => {
    const state = getState();
    const { pageCode } = getParams(state);
    const mainFrame = getSelectedPageModelMainFrame(state);

    if (!pageCode || !mainFrame) {
      resolve(null);
    }
    if (value) {
      updatePageWidget('content_viewer', null, mainFrame.pos)(dispatch, getState)
        .then(resolve);
    } else {
      removePageWidget(mainFrame.pos)(dispatch, getState)
        .then(resolve);
    }
  });

export const restoreSelectedPageConfig = () => (dispatch, getState) => {
  const state = getState();
  const { pageCode } = getParams(state);
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


export const applyDefaultConfig = () => (dispatch, getState) =>
  new Promise((resolve) => {
    const state = getState();
    const { pageCode } = getParams(state);
    const defaultConfig = getSelectedPageModelDefaultConfig(state);

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

export const configOrUpdatePageWidget = (sourceWidgetId, sourceFrameId, targetFrameId) =>
  (dispatch, getState) => new Promise((resolve) => {
    const widget = getWidgetsMap(getState())[sourceWidgetId];
    const pageConfig = getSelectedPageConfig(getState());

    const isAlreadyConfigured =
      !!(pageConfig && pageConfig[sourceFrameId] && pageConfig[sourceFrameId].config);

    if (widget.hasConfig && !isAlreadyConfigured) {
      const { pageCode } = getParams(getState());
      gotoRoute(
        ROUTE_WIDGET_CONFIG,
        { pageCode, widgetCode: sourceWidgetId, framePos: targetFrameId },
      );
      resolve();
    } else {
      updatePageWidget(sourceWidgetId, sourceFrameId, targetFrameId)(dispatch, getState)
        .then(resolve);
    }
  });

export const editWidgetConfig = frameId =>
  (dispatch, getState) => {
    const pageConfig = getSelectedPageConfig(getState());
    const pageConfigItem = (pageConfig && pageConfig[frameId]);
    if (pageConfigItem && pageConfigItem.config) {
      dispatch(initialize('widgetConfigForm', pageConfigItem.config));
    }
  };
