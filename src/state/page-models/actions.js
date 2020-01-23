import { initialize } from 'redux-form';
import { addToast, addErrors, TOAST_ERROR, TOAST_SUCCESS } from '@entando/messages';

import {
  getPageModels, getPageModel, deletePageModel, postPageModel, putPageModel,
  getPageReferences,
} from 'api/pageModels';
import { setPage } from 'state/pagination/actions';
import { toggleLoading } from 'state/loading/actions';
import { getSelectedPageModel } from 'state/page-models/selectors';
import {
  SET_PAGE_MODELS, SET_SELECTED_PAGE_MODEL, REMOVE_PAGE_MODEL,
  SET_SELECTED_PAGE_MODEL_PAGE_REFS, SET_PAGE_MODELS_TOTAL,
} from 'state/page-models/types';
import { history, ROUTE_PAGE_MODEL_LIST } from 'app-init/router';


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
    }).catch(() => {});
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
    }).catch(() => {});
  })
);

export const removePageModel = pageModelCode => dispatch => (
  new Promise((resolve) => {
    deletePageModel(pageModelCode).then((response) => {
      response.json().then((data) => {
        if (response.ok) {
          dispatch(removePageModelSync(pageModelCode));
          dispatch(addToast(
            { id: 'app.deleted', values: { type: 'page model', code: pageModelCode } },
            TOAST_SUCCESS,
          ));
          resolve();
        } else {
          dispatch(addErrors(data.errors.map(err => err.message)));
          dispatch(addToast(data.errors[0].message, TOAST_ERROR));
          resolve();
        }
      });
    }).catch(() => {});
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
    }).catch(() => {});
  })
);

export const loadSelectedPageModel = pageModelCode => (dispatch, getState) => {
  const selectedPage = getSelectedPageModel(getState());
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

export const initPageModelForm = pageModelCode => dispatch => (
  fetchPageModel(pageModelCode)(dispatch).then((json) => {
    const pageModel = json.payload;
    pageModel.configuration = JSON.stringify(pageModel.configuration, null, 2);
    dispatch(initialize('pageModel', pageModel));
  }).catch(() => {})
);

export const updatePageModel = pageModel => dispatch => new Promise((resolve) => {
  putPageModel(pageModel).then((response) => {
    if (!response.ok) {
      response.json().then((data) => {
        dispatch(addErrors(data.errors.map(err => err.message)));
        resolve();
      });
    } else {
      dispatch(addToast(
        { id: 'app.updated', values: { type: 'page model', code: pageModel.code } },
        TOAST_SUCCESS,
      ));
      history.push(ROUTE_PAGE_MODEL_LIST);
      resolve();
    }
  }).catch(() => {});
});

export const createPageModel = pageModel => dispatch => new Promise((resolve) => {
  postPageModel(pageModel).then((response) => {
    if (!response.ok) {
      response.json().then((data) => {
        dispatch(addErrors(data.errors.map(err => err.message)));
        resolve();
      });
    } else {
      dispatch(addToast(
        { id: 'app.created', values: { type: 'page model', code: pageModel.code } },
        TOAST_SUCCESS,
      ));
      history.push(ROUTE_PAGE_MODEL_LIST);
      resolve();
    }
  }).catch(() => {});
});

const fetchCurrentReference = (getApiCall, setActionCreator) =>
  (pageModelCode, page = { page: 1, pageSize: 10 }) => dispatch =>
    new Promise((resolve) => {
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
      }).catch(() => {});
    });

export const fetchCurrentReferencePages =
  fetchCurrentReference(getPageReferences, setSelectedPageModelPageRefs);
