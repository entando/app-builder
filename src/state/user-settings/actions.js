import { addToast, addErrors, TOAST_ERROR, TOAST_SUCCESS } from '@entando/messages';
import { getUserSettings, putUserSettings } from 'api/userSettings';
import { SET_USER_SETTINGS } from 'state/user-settings/types';
import { toggleLoading } from 'state/loading/actions';

export const setUserSettings = settings => ({
  type: SET_USER_SETTINGS,
  payload: {
    settings,
  },
});

export const fetchUserSettings = () => dispatch => new Promise((resolve) => {
  dispatch(toggleLoading('userSettings'));
  getUserSettings().then((response) => {
    response.json().then((json) => {
      if (response.ok) {
        dispatch(setUserSettings(json.payload));
      } else {
        dispatch(addErrors(json.errors.map(err => err.message)));
        dispatch(addToast(json.errors[0].message, TOAST_ERROR));
      }
      dispatch(toggleLoading('userSettings'));
      resolve();
    });
  }).catch(() => { dispatch(toggleLoading('userSettings')); });
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
