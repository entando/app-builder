
import { getMfeConfigList } from 'api/mfe';
import { addToast, TOAST_ERROR } from '@entando/messages';
import { SET_MFE_CONFIG_LIST, ADD_MFE_CONFIG, UPDATE_MFE_CONFIG } from 'state/mfe/types';

export const setMfeConfigList = mfeConfigList => ({
  type: SET_MFE_CONFIG_LIST,
  payload: mfeConfigList,
});

export const addMfeConfig = mfeConfig => ({
  type: ADD_MFE_CONFIG,
  payload: mfeConfig,
});

export const updateMfeConfig = mfeConfig => ({
  type: UPDATE_MFE_CONFIG,
  payload: mfeConfig,
});


export const fetchMfeConfigList = (page = { page: 1, pageSize: 0 }, params = '') => dispatch => getMfeConfigList(page, params)
  .then((response) => {
    response.json().then((json) => {
      if (response.ok) {
        dispatch(setMfeConfigList(json.payload));
      }
      return response;
    }).catch(error => dispatch(addToast(error.message, TOAST_ERROR)));
  }).catch(error => dispatch(addToast(error.message, TOAST_ERROR)));
