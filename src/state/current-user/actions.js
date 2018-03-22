import { gotoRoute } from 'frontend-common-components';

import { SET_USER, UNSET_USER } from 'state/current-user/types';
import { ROUTE_HOME, ROUTE_DASHBOARD } from 'app-init/router';

export const setUser = user => ({
  type: SET_USER,
  payload: {
    user,
  },
});

export const unsetUser = () => ({
  type: UNSET_USER,
  payload: {
    user: {
      username: null,
      token: null,
    },
  },
});

// thunks

export const loginUser = (username, token) => (dispatch) => {
  dispatch(setUser({
    username,
    token,
  }));

  localStorage.setItem('username', username);
  localStorage.setItem('token', token);
  gotoRoute(ROUTE_DASHBOARD);
};

export const logoutUser = () => (dispatch) => {
  dispatch(unsetUser());

  localStorage.removeItem('username');
  localStorage.removeItem('token');
  gotoRoute(ROUTE_HOME);
};
