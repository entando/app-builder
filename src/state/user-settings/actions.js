import { initialize } from 'redux-form';
import { addToast, addErrors, TOAST_ERROR, TOAST_SUCCESS } from '@entando/messages';

import { getUserSettings, putUserSettings } from 'api/userSettings';
import { SET_USER_SETTINGS } from 'state/user-settings/types';

export const setUserSettings = settings => ({
  type: SET_USER_SETTINGS,
  payload: {
    settings,
  },
});

export const fetchUserSettings = () => dispatch => new Promise((resolve) => {
  getUserSettings().then((response) => {
    response.json().then((json) => {
      if (response.ok) {
        dispatch(setUserSettings(json.payload));
        dispatch(initialize('user-restrictions', json.payload));
      } else {
        dispatch(addErrors(json.errors.map(err => err.message)));
        dispatch(addToast(json.errors[0].message, TOAST_ERROR));
      }
      resolve();
    });
  }).catch(() => {});
});

export const updateUserSettings = settings => dispatch => new Promise((resolve) => {
  putUserSettings(settings).then((response) => {
    response.json().then((json) => {
      if (response.ok) {
        dispatch(setUserSettings(json.payload));
        dispatch(addToast(
          { id: 'app.updateSettings.success' },
          TOAST_SUCCESS,
        ));
      } else {
        dispatch(addErrors(json.errors.map(err => err.message)));
        dispatch(addToast(json.errors[0].message, TOAST_ERROR));
      }
      resolve();
    });
  }).catch(() => {});
});
