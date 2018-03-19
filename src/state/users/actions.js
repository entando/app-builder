import { initialize } from 'redux-form';
import { SET_USERS } from 'state/users/types';
import { getUsers } from 'api/users';
import { getUser, putUser } from 'api/user';
import { setPage } from 'state/pagination/actions';
import { addErrors } from 'state/errors/actions';
import { ROUTE_USER_LIST } from 'app-init/router';

import { gotoRoute } from 'frontend-common-components';


export const setUsers = users => ({
  type: SET_USERS,
  payload: {
    users,
  },
});

// thunk
export const fetchUsers = (page = 1, params) => dispatch =>
  getUsers(page, params).then((data) => {
    dispatch(setUsers(data.payload));
    dispatch(setPage(data.metaData));
  });


export const fetchUserForm = username => dispatch =>
  getUser(username).then((response) => {
    if (response.errors && response.errors.length) {
      dispatch(addErrors(response.errors.map(err => err.message)));
    } else {
      dispatch(initialize('user', response.payload));
    }
  });

export const sendPutUser = user => dispatch => (
  new Promise((resolve) => {
    if (user) {
      putUser(user).then((response) => {
        if (response.ok) {
          gotoRoute(ROUTE_USER_LIST);
          resolve();
        } else {
          dispatch(addErrors(response.errors.map(err => err.message)));
          resolve();
        }
      });
    }
  })
);
