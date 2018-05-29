import { gotoRoute } from '@entando/router';
import { formattedText } from '@entando/utils';

import { getDataModels, postDataModel } from 'api/dataModels';
import { addErrors } from 'state/errors/actions';
import { setPage } from 'state/pagination/actions';
import { toggleLoading } from 'state/loading/actions';
import { addToast } from 'state/toasts/actions';
import { SET_DATA_MODELS } from 'state/data-models/types';
import { TOAST_SUCCESS } from 'state/toasts/const';
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
  });
});

export const sendPostDataModel = data => dispatch => new Promise((resolve) => {
  postDataModel(data).then((response) => {
    response.json().then((json) => {
      if (response.ok) {
        dispatch(addToast(
          formattedText('app.updated', null, { type: 'data model', code: data.code }),
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
