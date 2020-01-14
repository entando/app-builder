import { loginUser, setUser } from '@entando/apimanager';

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

export const performLogin = (username, password) => dispatch => (
  new Promise((resolve) => {
    if (username && password) {
      dispatch(setLoginErrorMessage(''));
      login(username, password).then((response) => {
        if (response.ok) {
          response.json().then((json) => {
            dispatch(loginUser(
              username,
              json.access_token || json.payload.access_token,
            ));
            resolve();
          });
        } else {
          dispatch(setLoginErrorMessage({ id: 'fcc.login.errorMessage', defaultMessage: ERROR_LOGIN_MESSAGE }));
          resolve();
        }
      }).catch(() => {
        dispatch(setLoginErrorMessage({ id: 'fcc.login.errorMessage', defaultMessage: ERROR_LOGIN_MESSAGE }));
        resolve();
      });
    } else {
      dispatch(setLoginErrorMessage({ id: 'fcc.login.errorMessage', defaultMessage: ERROR_LOGIN_MESSAGE }));
      resolve();
    }
  })
);

export const updateUser = (username, token) => (dispatch) => {
  dispatch(setUser({
    username,
    token,
  }));
  localStorage.setItem('username', username);
  localStorage.setItem('token', token);
};
