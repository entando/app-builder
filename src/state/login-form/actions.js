import { loginUser, getDomain } from '@entando/apimanager';

import login from 'api/login';
import { SET_LOGIN_ERROR_MESSAGE } from 'state/login-form/types';

export const apiUnreacheableId = 'app.serverError';
export const incorrectCredentialsId = 'fcc.login.errorMessage';

export const ERROR_LOGIN_MESSAGE = 'error: username or password is invalid';

export const setLoginErrorMessage = message => ({
  type: SET_LOGIN_ERROR_MESSAGE,
  payload: {
    message,
  },
});

export const generateLoginErrorMessage = error => (dispatch, getState) => {
  let intlErrorObject = null;
  switch (error.message) {
    case apiUnreacheableId: {
      const domain = getDomain(getState());
      intlErrorObject = ({
        id: apiUnreacheableId,
        values: { domain },
      });
      break;
    }
    default: {
      intlErrorObject = ({ id: incorrectCredentialsId, defaultMessage: ERROR_LOGIN_MESSAGE });
      break;
    }
  }
  dispatch(setLoginErrorMessage(intlErrorObject));
};


// thunks

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
          dispatch(setLoginErrorMessage({
            id: incorrectCredentialsId,
            defaultMessage: ERROR_LOGIN_MESSAGE,
          }));
          resolve();
        }
      }).catch((err) => {
        dispatch(generateLoginErrorMessage(err));
        resolve();
      });
    } else {
      dispatch(setLoginErrorMessage({
        id: incorrectCredentialsId,
        defaultMessage: ERROR_LOGIN_MESSAGE,
      }));
      resolve();
    }
  })
);
