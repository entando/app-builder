import { addToast, addErrors, TOAST_ERROR, TOAST_SUCCESS } from '@entando/messages';
import { getUserPreferences, putUserPreferences } from 'api/userPreferences';
import { SET_USER_PREFERENCES } from 'state/user-preferences/types';

export const setUserPreferences = preferences => ({
  type: SET_USER_PREFERENCES,
  payload: {
    preferences,
  },
});

export const fetchUserPreferences = username => dispatch => new Promise((resolve) => {
  getUserPreferences(username).then((response) => {
    response.json().then((json) => {
      if (response.ok) {
        dispatch(setUserPreferences(json.payload));
        resolve();
      } else {
        dispatch(addErrors(json.errors.map(err => err.message)));
        dispatch(addToast(json.errors[0].message, TOAST_ERROR));
        resolve();
      }
    });
  });
});

export const updateUserPreferences = (user, preferences) =>
  dispatch => new Promise((resolve) => {
    putUserPreferences(user, preferences).then((response) => {
      response.json().then((json) => {
        if (response.ok) {
          dispatch(setUserPreferences(json.payload));
          dispatch(addToast(
            { id: 'userpreferences.edit.success' },
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
