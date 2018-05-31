import { gotoRoute } from '@entando/router';
import { formattedText } from '@entando/utils';
import { initialize } from 'redux-form';

import { getDataModels, getDataModel, postDataModel, putDataModel, deleteDataModel } from 'api/dataModels';
import { addErrors } from 'state/errors/actions';
import { setPage } from 'state/pagination/actions';
import { toggleLoading } from 'state/loading/actions';
import { addToast } from 'state/toasts/actions';
import { SET_DATA_MODELS } from 'state/data-models/types';
import { TOAST_SUCCESS, TOAST_ERROR } from 'state/toasts/const';
import { ROUTE_DATA_MODEL_LIST } from 'app-init/router';


export const setDataModels = dataModelsPaged => ({
  type: SET_DATA_MODELS,
  payload: {
    dataModelsPaged,
  },
});

const wrapApiCall = apiFunc => (...args) => async (dispatch) => {
  const response = await apiFunc(...args);
  const contentType = response.headers.get('content-type');
  if (contentType && contentType.includes('application/json')) {
    const json = await response.json();
    if (response.ok) {
      return json;
    }
    dispatch(addErrors(json.errors.map(e => e.message)));
    throw json;
  }
  throw new TypeError('No JSON content-type in response headers');
};


// thunks

export const fetchDataModelListPaged = (page = { page: 1, pageSize: 10 }, params = '') => dispatch => new Promise((resolve) => {
  dispatch(toggleLoading('dataModel'));
  getDataModels(page, params).then((response) => {
    response.json().then((json) => {
      if (response.ok) {
        dispatch(setDataModels(json.payload));
        dispatch(setPage(json.metaData));
      } else {
        dispatch(addErrors(json.errors.map(err => err.message)));
      }
      dispatch(toggleLoading('dataModel'));
      resolve();
    });
  });
});

export const fetchDataModel = dataModelId => dispatch => new Promise((resolve) => {
  getDataModel(dataModelId).then((response) => {
    response.json().then((json) => {
      if (response.ok) {
        dispatch(initialize('dataModel', json.payload));
      } else {
        dispatch(addErrors(json.errors.map(err => err.message)));
      }
      resolve();
    });
  });
});

export const sendPostDataModel = data => dispatch => new Promise((resolve) => {
  postDataModel(data).then((response) => {
    response.json().then((json) => {
      if (response.ok) {
        dispatch(addToast(
          formattedText('app.created', null, { type: 'data model', code: data.modelId }),
          TOAST_SUCCESS,
        ));
        gotoRoute(ROUTE_DATA_MODEL_LIST);
      } else {
        dispatch(addErrors(json.errors.map(err => err.message)));
      }
      resolve();
    });
  });
});

export const sendPutDataModel = data => dispatch => new Promise((resolve) => {
  putDataModel(data).then((response) => {
    response.json().then((json) => {
      if (response.ok) {
        dispatch(addToast(
          formattedText('app.updated', null, { type: 'data model', code: data.modelId }),
          TOAST_SUCCESS,
        ));
        gotoRoute(ROUTE_DATA_MODEL_LIST);
      } else {
        dispatch(addErrors(json.errors.map(err => err.message)));
      }
      resolve();
    });
  });
});

export const sendDeleteDataModel = dataModelId => dispatch => (
  new Promise((resolve) => {
    const deleteDataModelApi = wrapApiCall(deleteDataModel);
    deleteDataModelApi(dataModelId)(dispatch).then(() => {
      gotoRoute(ROUTE_DATA_MODEL_LIST);
      dispatch(fetchDataModelListPaged());
      dispatch(addToast(
        formattedText('dataModel.deleteDataModelSuccess', null, { id: dataModelId }),
        TOAST_SUCCESS,
      ));
      resolve();
    }).catch(() => {
      dispatch(addToast(
        formattedText(
          'dataModel.deleteDataModelError',
          null,
          { id: dataModelId },
        ),
        TOAST_ERROR,
      ));
    });
  })
);
