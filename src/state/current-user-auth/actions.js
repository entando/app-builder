import { SET_CURRENT_USER_AUTH, CLEAR_CURRENT_USER_AUTH } from 'state/current-user-auth/types';
import { addToast, addErrors, TOAST_ERROR } from '@entando/messages';
import { getCurrentUserAuth } from 'api/currentUserAuth';

export const setCurrentUserAuth = payload => ({
  type: SET_CURRENT_USER_AUTH,
  payload,
});

export const clearCurrentUserAuth = () => ({
  type: CLEAR_CURRENT_USER_AUTH,
});

export const fetchUserAuth = () => dispatch => new Promise((resolve) => {
  getCurrentUserAuth().then((res) => {
    res.json().then((json) => {
      if (res.ok) {
        dispatch(setCurrentUserAuth(json.payload));
      } else {
        dispatch(addErrors(json.errors.map(e => e.message)));
        json.errors.forEach(err => dispatch(addToast(err.message, TOAST_ERROR)));
      }
      resolve();
    });
  }).catch(() => {});
});
