import { initialize } from 'redux-form';
import { formattedText } from '@entando/utils';

import { getUserSettings, putUserSettings } from 'api/userSettings';
import { addErrors } from 'state/errors/actions';
import { addToast } from 'state/toasts/actions';
import { SET_USER_SETTINGS } from 'state/user-settings/types';
import { TOAST_ERROR, TOAST_SUCCESS } from 'state/toasts/const';

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
      }
      resolve();
    });
  });
});

export const updateUserSettings = settings => dispatch => new Promise((resolve) => {
  putUserSettings(settings).then((response) => {
    response.json().then((json) => {
      if (response.ok) {
        dispatch(setUserSettings(json.payload));
        dispatch(addToast(
          formattedText('user.restrictions.success', null),
          TOAST_SUCCESS,
        ));
      } else {
        dispatch(addErrors(json.errors.map(err => err.message)));
        dispatch(addToast(json.errors[0].message, TOAST_ERROR));
      }
      resolve();
    });
  });
});
