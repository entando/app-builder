import { initialize } from 'redux-form';
import { SET_USERS, SET_SELECTED_USER, TOGGLE_LOADING } from 'state/users/types';
import { getUsers, getUserDetail } from 'api/users';
import { getUser, putUser } from 'api/user';
import { setPage } from 'state/pagination/actions';
import { addErrors } from 'state/errors/actions';
import { ROUTE_USER_LIST } from 'app-init/router';

import { getParams, gotoRoute } from 'frontend-common-components';

export const toggleLoading = id => ({
  type: TOGGLE_LOADING,
  payload: {
    id,
  },
});


export const setUsers = users => ({
  type: SET_USERS,
  payload: {
    users,
  },
});

export const setSelectedUserDetail = user => ({
  type: SET_SELECTED_USER,
  payload: {
    user,
  },
});

// thunk

export const fetchUsers = (page = { page: 1, pageSize: 10 }, params = '') => dispatch =>
  new Promise((resolve) => {
    dispatch(toggleLoading('users'));
    getUsers(page, params).then((response) => {
      if (response.ok) {
        response.json().then((json) => {
          dispatch(setUsers(json.payload));
          dispatch(toggleLoading('users'));
          dispatch(setPage(json.metaData));
          resolve();
        });
      } else {
        response.json().then((json) => {
          dispatch(addErrors(json.errors.map(err => err.message)));
          dispatch(toggleLoading('users'));
          resolve();
        });
      }
    });
  });

export const fetchCurrentPageUserDetail = () => (dispatch, getState) =>
  new Promise((resolve) => {
    const { username } = getParams(getState());
    dispatch(toggleLoading('user'));
    getUserDetail(username).then((response) => {
      if (response.ok) {
        response.json().then((json) => {
          dispatch(setSelectedUserDetail(json.payload));
          dispatch(toggleLoading('user'));
          resolve();
        });
      } else {
        response.json().then((json) => {
          dispatch(addErrors(json.errors.map(err => err.message)));
          dispatch(toggleLoading('user'));
          resolve();
        });
      }
    });
  });


export const fetchUserForm = username => dispatch =>
  new Promise((resolve) => {
    getUser(username).then((response) => {
      dispatch(toggleLoading('form'));
      if (response.ok) {
        response.json().then((json) => {
          dispatch(initialize('user', json.payload));
          dispatch(toggleLoading('form'));
          resolve();
        });
      } else {
        response.json().then((json) => {
          dispatch(addErrors(json.errors.map(err => err.message)));
          dispatch(toggleLoading('form'));
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
