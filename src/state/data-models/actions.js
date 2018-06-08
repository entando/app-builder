import { initialize } from 'redux-form';
import { gotoRoute } from '@entando/router';
import { formattedText } from '@entando/utils';
import { addToast, addErrors, TOAST_SUCCESS, TOAST_ERROR } from '@entando/messages';

import { getDataModels, getDataModel, postDataModel, putDataModel, deleteDataModel } from 'api/dataModels';
import { setPage } from 'state/pagination/actions';
import { toggleLoading } from 'state/loading/actions';
import { SET_DATA_MODELS } from 'state/data-models/types';
import { ROUTE_DATA_MODEL_LIST } from 'app-init/router';


export const setDataModels = dataModelsPaged => ({
  type: SET_DATA_MODELS,
  payload: {
    dataModelsPaged,
  },
});


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
  }).catch(() => {});
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
  }).catch(() => {});
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
  }).catch(() => {});
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
  }).catch(() => {});
});

export const sendDeleteDataModel = dataModelId => dispatch => (
  new Promise((resolve) => {
    deleteDataModel(dataModelId).then((response) => {
      if (response.ok) {
        gotoRoute(ROUTE_DATA_MODEL_LIST);
        dispatch(fetchDataModelListPaged());
        dispatch(addToast(
          formattedText('dataModel.deleteDataModelSuccess', null, { id: dataModelId }),
          TOAST_SUCCESS,
        ));
      } else {
        dispatch(addToast(
          formattedText(
            'dataModel.deleteDataModelError',
            null,
            { id: dataModelId },
          ),
          TOAST_ERROR,
        ));
      }
      resolve();
    }).catch(() => {});
  })
);
