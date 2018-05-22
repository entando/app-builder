import { initialize } from 'redux-form';
import { getParams, gotoRoute } from '@entando/router';
import { formattedText } from '@entando/utils';

import {
  getPageModels, getPageModel, deletePageModel, postPageModel, putPageModel,
  getPageReferences,
} from 'api/pageModels';
import { setPage } from 'state/pagination/actions';
import { addErrors } from 'state/errors/actions';
import { toggleLoading } from 'state/loading/actions';
import { getSelectedPageModel, getFormPageModel } from 'state/page-models/selectors';
import { addToast } from 'state/toasts/actions';
import { TOAST_ERROR, TOAST_SUCCESS } from 'state/toasts/const';
import {
  SET_PAGE_MODELS, SET_SELECTED_PAGE_MODEL, REMOVE_PAGE_MODEL,
  SET_SELECTED_PAGE_MODEL_PAGE_REFS, SET_PAGE_MODELS_TOTAL,
} from 'state/page-models/types';
import { ROUTE_PAGE_MODEL_LIST } from 'app-init/router';


export const setPageModels = pageModels => ({
  type: SET_PAGE_MODELS,
  payload: {
    pageModels,
  },
});

export const setPageModelsTotal = pageModelsTotal => ({
  type: SET_PAGE_MODELS_TOTAL,
  payload: {
    pageModelsTotal,
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

export const setSelectedPageModelPageRefs = references => ({
  type: SET_SELECTED_PAGE_MODEL_PAGE_REFS,
  payload: {
    references,
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

export const fetchPageModelsTotal = () => dispatch => (
  new Promise((resolve) => {
    getPageModels({ page: 1, pageSize: 1 }).then((response) => {
      response.json().then((data) => {
        if (response.ok) {
          dispatch(setPageModelsTotal(data.metaData.totalItems));
        } else {
          dispatch(addErrors(data.errors.map(err => err.message)));
        }
        resolve();
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
          dispatch(addToast(
            formattedText('app.deleted', null, { type: 'page model', code: pageModelCode }),
            TOAST_SUCCESS,
          ));
          resolve();
        } else {
          dispatch(addErrors(data.errors.map(err => err.message)));
          dispatch(addToast(data.errors[0].message, TOAST_ERROR));
          resolve();
        }
      });
    });
  })
);

export const fetchPageModel = pageModelCode => dispatch => (
  new Promise((resolve, reject) => {
    dispatch(toggleLoading('pageModel'));
    getPageModel(pageModelCode).then((response) => {
      response.json().then((data) => {
        if (response.ok) {
          resolve(data);
        } else {
          dispatch(addErrors(data.errors.map(err => err.message)));
          reject(data);
        }
        dispatch(toggleLoading('pageModel'));
      });
    });
  })
);

export const loadSelectedPageModel = pageCode => (dispatch, getState) => {
  const selectedPage = getSelectedPageModel(getState());
  const pageModelCode = pageCode || getParams(getState()).pageModelCode;
  if (selectedPage && selectedPage.code === pageModelCode) {
    return new Promise(r => r(selectedPage));
  }
  return fetchPageModel(pageModelCode)(dispatch)
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
          dispatch(addToast(
            formattedText('app.updated', null, { type: 'page model', code: toSend.code }),
            TOAST_SUCCESS,
          ));
          gotoRoute(ROUTE_PAGE_MODEL_LIST);
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
          dispatch(addToast(
            formattedText('app.created', null, { type: 'page model', code: toSend.code }),
            TOAST_SUCCESS,
          ));
          gotoRoute(ROUTE_PAGE_MODEL_LIST);
          resolve();
        }
      });
    } else {
      resolve();
    }
  });
};

const fetchCurrentReference = (getApiCall, setActionCreator) =>
  (page = { page: 1, pageSize: 10 }) => (dispatch, getState) =>
    new Promise((resolve) => {
      const { pageModelCode } = getParams(getState());
      dispatch(toggleLoading('references'));
      getApiCall(pageModelCode, page).then((response) => {
        response.json().then((json) => {
          if (response.ok) {
            dispatch(setActionCreator(json.payload));
            dispatch(setPage(json.metaData));
          } else {
            dispatch(addErrors(json.errors.map(err => err.message)));
          }
          dispatch(toggleLoading('references'));
          resolve();
        });
      });
    });

export const fetchCurrentReferencePages =
  fetchCurrentReference(getPageReferences, setSelectedPageModelPageRefs);
