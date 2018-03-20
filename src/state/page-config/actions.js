import { getParams, formattedText } from 'frontend-common-components';
import {
  SET_SEARCH_FILTER, CHANGE_VIEW_LIST, TOGGLE_CONTENT_TOOLBAR_EXPANDED,
  SET_PAGE_WIDGET, SET_PAGE_CONFIG, SET_PUBLISHED_PAGE_CONFIG, REMOVE_PAGE_WIDGET, TOGGLE_CONTENT,
} from 'state/page-config/types';

import { addErrors } from 'state/errors/actions';
import { setSelectedPageModel } from 'state/page-models/actions';
import { validatePageModel } from 'state/page-models/helpers';
import {
  fetchPage,
  getPageConfig,
  deletePageWidget,
  putPageWidget,
} from 'api/pages';
import { getPageModel } from 'api/pageModels';


export const setPageConfig = (pageCode, pageConfig) => ({
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
      const pageModelCode = response.payload.pageModel;
      pageIsPublished = response.payload.status === 'published';
      const requests = [
        getPageModel(pageModelCode),
        getPageConfig(pageCode, 'draft'),
        pageIsPublished && getPageConfig(pageCode, 'published'),
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
