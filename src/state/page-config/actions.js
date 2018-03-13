import { getParams } from 'frontend-common-components';

import { addErrors } from 'state/errors/actions';
import { setSelectedPageModel } from 'state/page-models/actions';
import {
  fetchPage,
  getPageWidgets,
  deletePageWidget,
  putPageWidget,
} from 'api/pages';
import { getPageModel } from 'api/pageModels';
import { SET_PAGE_WIDGET, SET_PAGE_WIDGETS, REMOVE_PAGE_WIDGET } from 'state/page-config/types';

export const setPageWidgets = (pageCode, pageWidgets) => ({
  type: SET_PAGE_WIDGETS,
  payload: {
    pageCode,
    pageWidgets,
  },
});

export const setPageWidget = (pageCode, widget, frameId, oldFrameId) => ({
  type: SET_PAGE_WIDGET,
  payload: {
    pageCode,
    widget,
    frameId,
    oldFrameId,
  },
});

export const removePageWidgetSync = (pageCode, frameId) => ({
  type: REMOVE_PAGE_WIDGET,
  payload: {
    pageCode,
    frameId,
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
          dispatch(setSelectedPageModel(pmResp.payload));
        });
    })
    .then(() => {
      getPageWidgets(pageCode)
        .then(handleResponseErrors(dispatch))
        .then((pwResp) => {
          dispatch(setPageWidgets(pageCode, pwResp.payload));
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

export const updatePageWidget = (widget, frameId, oldFrameId) => (dispatch, getState) => {
  const { pageCode } = getParams(getState());
  return putPageWidget(pageCode, frameId, widget)
    .then(() => {
      dispatch(setPageWidget(pageCode, widget, frameId, oldFrameId));
    });
};
