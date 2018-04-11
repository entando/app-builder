import { initialize } from 'redux-form';
import { getParams } from 'frontend-common-components';

import { getPageModels, getPageModel, deletePageModel, postPageModel, putPageModel } from 'api/pageModels';
import { setPage } from 'state/pagination/actions';
import { addErrors } from 'state/errors/actions';
import { toggleLoading } from 'state/loading/actions';
import { SET_PAGE_MODELS, SET_SELECTED_PAGE_MODEL, REMOVE_PAGE_MODEL } from 'state/page-models/types';
import { getSelectedPageModel, getFormPageModel } from 'state/page-models/selectors';


export const setPageModels = pageModels => ({
  type: SET_PAGE_MODELS,
  payload: {
    pageModels,
  },
});

export const setSelectedPageModel = pageModel => ({
  type: SET_SELECTED_PAGE_MODEL,
  payload: {
    pageModel,
  },
});

export const removePageModelSync = pageModelCode => ({
  type: REMOVE_PAGE_MODEL,
  payload: {
    pageModelCode,
  },
});


export const fetchPageModels = (page = { page: 1, pageSize: 10 }, params = '') => dispatch => (
  new Promise((resolve) => {
    dispatch(toggleLoading('pageModels'));
    getPageModels(page, params).then((response) => {
      response.json().then((data) => {
        if (response.ok) {
          dispatch(setPageModels(data.payload));
          dispatch(toggleLoading('pageModels'));
          dispatch(setPage(data.metaData));
          resolve();
        } else {
          dispatch(addErrors(data.errors.map(err => err.message)));
          dispatch(toggleLoading('pageModels'));
          resolve();
        }
      });
    });
  })
);

export const removePageModel = pageModelCode => dispatch => (
  new Promise((resolve) => {
    deletePageModel(pageModelCode).then((response) => {
      response.json().then((data) => {
        if (response.ok) {
          dispatch(removePageModelSync(pageModelCode));
          resolve();
        } else {
          dispatch(addErrors(data.errors.map(err => err.message)));
          resolve();
        }
      });
    });
  })
);

export const fetchPageModel = pageModelCode => dispatch => (
  new Promise((resolve, reject) => {
    getPageModel(pageModelCode).then((response) => {
      response.json().then((data) => {
        if (response.ok) {
          resolve(data);
        } else {
          dispatch(addErrors(data.errors.map(err => err.message)));
          reject(data);
        }
      });
    });
  })
);

export const loadSelectedPageModel = pageCode => (dispatch, getState) => {
  const selectedPage = getSelectedPageModel(getState());
  if (selectedPage && selectedPage.code === pageCode) {
    return new Promise(r => r(selectedPage));
  }
  return fetchPageModel(pageCode)(dispatch)
    .then((json) => {
      const pageObject = json.payload;
      dispatch(setSelectedPageModel(pageObject));
      return pageObject;
    }).catch(() => {});
};

export const initPageModelForm = () => (dispatch, getState) => {
  const { pageModelCode } = getParams(getState());
  return fetchPageModel(pageModelCode)(dispatch).then((json) => {
    const pageModel = json.payload;
    pageModel.configuration = JSON.stringify(pageModel.configuration, null, 2);
    dispatch(initialize('pageModel', pageModel));
  });
};

export const updatePageModel = pageModel => (dispatch, getState) => {
  const toSend = pageModel || getFormPageModel(getState());
  return new Promise((resolve) => {
    if (toSend) {
      putPageModel(toSend).then((response) => {
        if (!response.ok) {
          response.json().then((data) => {
            dispatch(addErrors(data.errors.map(err => err.message)));
            resolve();
          });
        } else {
          resolve();
        }
      });
    } else {
      resolve();
    }
  });
};

export const createPageModel = pageModel => (dispatch, getState) => {
  const toSend = pageModel || getFormPageModel(getState());
  return new Promise((resolve) => {
    if (toSend) {
      postPageModel(toSend).then((response) => {
        if (!response.ok) {
          response.json().then((data) => {
            dispatch(addErrors(data.errors.map(err => err.message)));
            resolve();
          });
        } else {
          resolve();
        }
      });
    } else {
      resolve();
    }
  });
};
