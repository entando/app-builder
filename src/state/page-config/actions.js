import { getParams, formattedText } from 'frontend-common-components';
import {
  SET_CONTENT_TOOLBAR, SET_SEARCH_FILTER, CHANGE_VIEW_LIST,
  SET_PAGE_WIDGET, SET_PAGE_CONFIG, REMOVE_PAGE_WIDGET,
} from 'state/page-config/types';

import { addErrors } from 'state/errors/actions';
import { setSelectedPageModel } from 'state/page-models/actions';
import { validatePageModel } from 'state/page-models/helpers';
import {
  fetchPage,
  getPageWidgets,
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


export const setContentToolbar = content => ({
  type: SET_CONTENT_TOOLBAR,
  payload: {
    content,
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
  return fetchPage(pageCode)
    .then(handleResponseErrors(dispatch))
    .then((response) => {
      const pageModelCode = response.payload.pageModel;
      return getPageModel(pageModelCode)
        .then(handleResponseErrors(dispatch))
        .then((pmResp) => {
          const pageModel = pmResp.payload;
          const errors = validatePageModel(pageModel);
          if (errors && errors.length) {
            const translatedErrors = errors.map(err => formattedText(err.id, null, err.values));
            dispatch(addErrors(translatedErrors));
            throw new Error('Page model invalid', errors);
          } else {
            dispatch(setSelectedPageModel(pageModel));
          }
        });
    })
    .then(() => {
      getPageWidgets(pageCode)
        .then(handleResponseErrors(dispatch))
        .then((pwResp) => {
          dispatch(setPageConfig(pageCode, pwResp.payload));
        });
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
