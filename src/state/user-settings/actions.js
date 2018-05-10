import { getUserSettings, putUserSettings } from 'api/userSettings';
import { addErrors } from 'state/errors/actions';
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
      } else {
        dispatch(addErrors(json.errors.map(err => err.message)));
      }
      resolve();
    });
  });
});
