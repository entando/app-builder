import { gotoRoute, formattedText } from 'frontend-common-components';

import login from 'api/login';
import { setUser } from 'state/current-user/actions';
import { SET_LOGIN_ERROR_MESSAGE } from 'state/login-form/types';
import { ROUTE_DASHBOARD } from 'app-init/router';


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
            dispatch(setUser({
              username,
              token: json.payload.access_token,
            }));
            gotoRoute(ROUTE_DASHBOARD);
            resolve();
          });
        } else {
          dispatch(setLoginErrorMessage(formattedText('fcc.login.errorMessage', ERROR_LOGIN_MESSAGE, {})));
          resolve();
        }
      });
    } else {
      dispatch(setLoginErrorMessage(formattedText('fcc.login.errorMessage', ERROR_LOGIN_MESSAGE, {})));
      resolve();
    }
  })
);
