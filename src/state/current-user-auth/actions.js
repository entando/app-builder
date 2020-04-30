import { SET_CURRENT_USER_AUTH, CLEAR_CURRENT_USER_AUTH } from 'state/current-user-auth/types';

export const setCurrentUserAuth = payload => ({
  type: SET_CURRENT_USER_AUTH,
  payload,
});

export const clearCurrentUserAuth = () => ({
  type: CLEAR_CURRENT_USER_AUTH,
});
