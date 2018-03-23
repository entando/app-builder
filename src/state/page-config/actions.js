import { getParams, formattedText } from 'frontend-common-components';
import {
  SET_SEARCH_FILTER, CHANGE_VIEW_LIST, TOGGLE_CONTENT_TOOLBAR_EXPANDED,
  SET_PAGE_WIDGET, SET_PAGE_CONFIG, SET_PUBLISHED_PAGE_CONFIG, REMOVE_PAGE_WIDGET, TOGGLE_CONTENT,
} from 'state/page-config/types';

import { addErrors } from 'state/errors/actions';
import { setSelectedPageModel } from 'state/page-models/actions';
import { getSelectedPageModelMainFrame, getSelectedPageModelDefaultConfig } from 'state/page-models/selectors';
import { setSelectedPage } from 'state/pages/actions';
import { validatePageModel } from 'state/page-models/helpers';
import {
  fetchPage,
  getPageConfig,
  deletePageWidget,
  putPageWidget,
  restorePageConfig,
  applyDefaultPageConfig,
} from 'api/pages';
import { getPageModel } from 'api/pageModels';
import { getPublishedConfigMap } from 'state/page-config/selectors';
import { PAGE_STATUS_DRAFT, PAGE_STATUS_PUBLISHED } from 'state/pages/const';


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

export const setPageWidget = (pageCode, widgetId, sourceFrameId, targetFrameId) => ({
  type: SET_PAGE_WIDGET,
  payload: {
    pageCode,
    widgetId,
    sourceFrameId,
    targetFrameId,
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

export const toggleContentToolbarExpanded = () => ({
  type: TOGGLE_CONTENT_TOOLBAR_EXPANDED,
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


// dispatch an action to populate errors
const handleResponseErrors = dispatch => (payload) => {
  if (payload.errors && payload.errors.length) {
    const action = addErrors(payload.errors.map(err => err.message));
    dispatch(action);
    throw action;
  }
  return payload;
};

export const initConfigPage = () => (dispatch, getState) => {
  const { pageCode } = getParams(getState());
  let pageIsPublished = false;
  return fetchPage(pageCode)
    .then(handleResponseErrors(dispatch))
    .then((response) => {
      const pageObject = response.payload;
      dispatch(setSelectedPage(pageObject));

      pageIsPublished = pageObject.status === PAGE_STATUS_PUBLISHED;
      const requests = [
        getPageModel(pageObject.pageModel),
        getPageConfig(pageCode, PAGE_STATUS_DRAFT),
        pageIsPublished && getPageConfig(pageCode, PAGE_STATUS_PUBLISHED),
      ];
      return Promise.all(requests);
    })
    .then((responses) => {
      // check if there are errors in any of the responses
      responses.forEach(handleResponseErrors(dispatch));

      // validate the page model
      const pageModel = responses[0].payload;
      const errors = validatePageModel(pageModel);
      if (errors && errors.length) {
        const translatedErrors = errors.map(err => formattedText(err.id, null, err.values));
        dispatch(addErrors(translatedErrors));
        throw new Error('Page model is invalid', errors);
      } else {
        dispatch(setSelectedPageModel(pageModel));
      }

      // set draft config
      dispatch(setPageConfig(pageCode, responses[1].payload));

      // set published config
      if (pageIsPublished) {
        dispatch(setPublishedPageConfig(pageCode, responses[2].payload));
      } else {
        dispatch(setPublishedPageConfig(pageCode, null));
      }
    })
    .catch(() => {});
};


export const removePageWidget = frameId => (dispatch, getState) => {
  const { pageCode } = getParams(getState());
  return deletePageWidget(pageCode, frameId)
    .then(() => {
      dispatch(removePageWidgetSync(pageCode, frameId));
    });
};

export const updatePageWidget = (widgetId, sourceFrameId, targetFrameId) =>
  (dispatch, getState) => {
    const { pageCode } = getParams(getState());
    // build payload
    return putPageWidget(pageCode, targetFrameId, widgetId)
      .then(() => {
        dispatch(setPageWidget(pageCode, widgetId, sourceFrameId, targetFrameId));
      });
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
    }, resolve);
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
    });
  });
