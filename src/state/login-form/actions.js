import { loginUser, getApi } from '@entando/apimanager';

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

export const performLogin = (username, password) => (dispatch, getState) => (
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
      }).catch((err) => {
        const apiUnreacheableId = 'app.serverError';
        const { domain } = getApi(getState());
        const errorObject = err.message === apiUnreacheableId ? ({
          id: apiUnreacheableId,
          values: { domain },
        }) : ({ id: 'fcc.login.errorMessage', defaultMessage: ERROR_LOGIN_MESSAGE });
        dispatch(setLoginErrorMessage(errorObject));
        resolve();
      });
    } else {
      dispatch(setLoginErrorMessage({ id: 'fcc.login.errorMessage', defaultMessage: ERROR_LOGIN_MESSAGE }));
      resolve();
    }
  })
);
