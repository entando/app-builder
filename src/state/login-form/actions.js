import { formattedText } from '@entando/utils';
import { loginUser } from '@entando/apimanager';
import { addToast, TOAST_ERROR } from '@entando/messages';

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
const ERROR_LOGIN_CODE = 'fcc.login.errorMessage';

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
          dispatch(setLoginErrorMessage(formattedText(ERROR_LOGIN_CODE, ERROR_LOGIN_MESSAGE, {})));
          resolve();
        }
      }).catch((e) => {
        const messageCode = (e.message === 'app.permissionDenied') ? ERROR_LOGIN_CODE : e.message;
        dispatch(addToast(
          formattedText(messageCode, ERROR_LOGIN_MESSAGE, { domain: e.data.domain }),
          TOAST_ERROR,
        ));
      });
    } else {
      dispatch(setLoginErrorMessage(formattedText(ERROR_LOGIN_CODE, ERROR_LOGIN_MESSAGE, {})));
      resolve();
    }
  })
);
