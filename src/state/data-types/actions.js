import { setPage } from 'state/pagination/actions';
import { toggleLoading } from 'state/loading/actions';
import { addErrors } from 'state/errors/actions';

import { getDataTypes, getDataTypeAttributes } from 'api/dataTypes';
import { SET_DATA_TYPES, SET_ATTRIBUTES } from 'state/data-types/types';
import { getDataTypeAttributesIdList } from 'state/data-types/selectors';


export const setDataTypes = dataTypes => ({
  type: SET_DATA_TYPES,
  payload: {
    dataTypes,
  },
});

export const setDataTypeAttributes = attributes => ({
  type: SET_ATTRIBUTES,
  payload: {
    attributes,
  },
});

// thunk

export const fetchDataTypes = (page = { page: 1, pageSize: 10 }, params = '') => dispatch => (
  new Promise((resolve) => {
    dispatch(toggleLoading('dataTypes'));
    getDataTypes(page, params).then((response) => {
      response.json().then((json) => {
        if (response.ok) {
          dispatch(setDataTypes(json.payload));
          dispatch(toggleLoading('dataTypes'));
          dispatch(setPage(json.metaData));
        } else if (json && json.errors) {
          dispatch(addErrors(json.errors.map(err => err.message)));
          dispatch(toggleLoading('dataTypes'));
        }
        resolve();
      });
    });
  })
);

export const fetchDataTypeAttributes = (page = { page: 1, pageSize: 10 }, params = '') => (dispatch, getState) => (
  new Promise((resolve) => {
    getDataTypeAttributes(page, params).then((response) => {
      response.json().then((json) => {
        if (response.ok) {
          if (!getDataTypeAttributesIdList(getState())) {
            dispatch(setDataTypeAttributes(json.payload));
          }
        } else {
          dispatch(addErrors(json.errors.map(err => err.message)));
        }
        resolve();
      });
    });
  })
);
