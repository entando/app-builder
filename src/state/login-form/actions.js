
import { gotoRoute, formattedText } from 'frontend-common-components';
import login from 'api/login';

import { SET_LOGIN_ERROR_MESSAGE } from 'state/login-form/types';


// eslint-disable-next-line
export const setLoginErrorMessage = (message) => ({
  type: SET_LOGIN_ERROR_MESSAGE,
  payload: {
    message,
  },
});


// thunks

const ERROR_LOGIN_MESSAGE = 'error: username or password is invalid';

export const performLogin = (username, password) => (dispatch) => {
  if (username && password) {
    dispatch(setLoginErrorMessage(''));
    login(username, password).then(() => {
      gotoRoute('dashboard');
    });
  } else {
    dispatch(setLoginErrorMessage(formattedText('fcc.login.errorMessage', ERROR_LOGIN_MESSAGE, {})));
  }
};
