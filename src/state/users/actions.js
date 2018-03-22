import { initialize } from 'redux-form';
import { SET_USERS, SELECTED_USER } from 'state/users/types';
import { getUsers, getUserDetail } from 'api/users';
import { getUser, putUser } from 'api/user';
import { setPage } from 'state/pagination/actions';
import { addErrors } from 'state/errors/actions';
import { ROUTE_USER_LIST } from 'app-init/router';

import { getParams, gotoRoute } from 'frontend-common-components';


export const setUsers = users => ({
  type: SET_USERS,
  payload: {
    users,
  },
});

export const setSelectedUserDetail = user => ({
  type: SELECTED_USER,
  payload: {
    user,
  },
});

// thunk
export const fetchUsers = (page = 1, params) => dispatch =>
  getUsers(page, params).then((data) => {
    dispatch(setUsers(data.payload));
    dispatch(setPage(data.metaData));
  });

export const fetchCurrentPageUserDetail = () => (dispatch, getState) =>
  new Promise((resolve) => {
    const { username } = getParams(getState());
    getUserDetail(username).then((response) => {
      if (response.ok) {
        response.json().then((json) => {
          dispatch(setSelectedUserDetail(json.payload));
          resolve();
        });
      } else {
        response.json().then((json) => {
          dispatch(addErrors(json.errors.map(err => err.message)));
          resolve();
        });
      }
    });
  });


export const fetchUserForm = username => dispatch =>
  new Promise((resolve) => {
    getUser(username).then((response) => {
      if (response.ok) {
        response.json().then((json) => {
          dispatch(initialize('user', json.payload));
          resolve();
        });
      } else {
        response.json().then((json) => {
          dispatch(addErrors(json.errors.map(err => err.message)));
          resolve();
        });
      }
    });
  });


export const sendPutUser = user => dispatch => (
  new Promise((resolve) => {
    if (user) {
      putUser(user).then((response) => {
        if (response.ok) {
          gotoRoute(ROUTE_USER_LIST);
          resolve();
        } else {
          response.json().then((json) => {
            dispatch(addErrors(json.errors.map(err => err.message)));
            resolve();
          });
        }
      });
    } else {
      resolve();
    }
  })
);
