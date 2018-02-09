
import { gotoRoute } from 'frontend-common-components';
import login from 'api/login';

import { SET_LOGIN_ERROR_MESSAGE } from './types';


// eslint-disable-next-line
export const setLoginErrorMessage = (message) => ({
  type: SET_LOGIN_ERROR_MESSAGE,
  payload: {
    message,
  },
});


// thunks

export const performLogin = (username, password) => (dispatch) => {
  if (username && password) {
    dispatch(setLoginErrorMessage(''));
    login(username, password).then(() => {
      gotoRoute('dashboard');
    });
  } else {
    dispatch(setLoginErrorMessage('ERROR: USERNAME OR PASSWORD IS INVALID'));
  }
};
