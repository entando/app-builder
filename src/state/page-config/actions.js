import { getParams } from 'frontend-common-components';
import { SET_CONTENT_TOOLBAR, SET_SEARCH_FILTER, CHANGE_VIEW_LIST, EXPAND_CONTENT_TOOLBAR } from 'state/page-config/types';

import { addErrors } from 'state/errors/actions';
import { setSelectedPageModel } from 'state/page-models/actions';
import { fetchPage } from 'api/pages';
import { getPageModel } from 'api/pageModels';

export const setContentToolbar = () => ({
  type: SET_CONTENT_TOOLBAR,
});

export const expandContentToolbar = () => ({
  type: EXPAND_CONTENT_TOOLBAR,
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
          dispatch(setSelectedPageModel(pmResp.payload));
        });
    })
    .catch(() => {});
};
