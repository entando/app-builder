
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

export const fetchMfeConfigList = (page = { page: 1, pageSize: 0 }, params = '', withToastNotification = true) => dispatch =>
  new Promise((resolve, reject) => {
    getMfeConfigList(page, params)
      .then((response) => {
        response.json().then((json) => {
          if (response.ok) {
            dispatch(setMfeConfigList(json.payload));
            resolve(response);
          } else if (withToastNotification) {
            json.errors.forEach(err => dispatch(addToast(err.message, TOAST_ERROR)));
            resolve(response);
          } else {
            reject();
          }
        }).catch(error => (withToastNotification ?
          dispatch(addToast(error.message, TOAST_ERROR)) : reject()));
      }).catch(error => (withToastNotification ?
        dispatch(addToast(error.message, TOAST_ERROR)) : reject()));
  });
