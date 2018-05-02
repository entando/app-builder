import { initialize } from 'redux-form';
import { SET_USERS, SET_SELECTED_USER, SET_USERS_TOTAL } from 'state/users/types';
import { getUsers, getUser, postUser, putUser, deleteUser, postUserAuthorities } from 'api/users';
import { setPage } from 'state/pagination/actions';
import { addErrors } from 'state/errors/actions';
import { toggleLoading } from 'state/loading/actions';
import { ROUTE_USER_LIST } from 'app-init/router';
import { getParams, gotoRoute } from '@entando/router';

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

export const setUsersTotal = usersTotal => ({
  type: SET_USERS_TOTAL,
  payload: {
    usersTotal,
  },
});

// thunk

export const fetchUsers = (page = { page: 1, pageSize: 10 }, params = '') => dispatch => (
  new Promise((resolve) => {
    dispatch(toggleLoading('users'));
    getUsers(page, params).then((response) => {
      response.json().then((json) => {
        if (response.ok) {
          dispatch(setUsers(json.payload));
          dispatch(setPage(json.metaData));
        } else {
          dispatch(addErrors(json.errors.map(err => err.message)));
        }
        dispatch(toggleLoading('users'));
        resolve();
      });
    });
  })
);

export const fetchUsersTotal = () => dispatch => (
  new Promise((resolve) => {
    getUsers({ page: 1, pageSize: 1 }).then((response) => {
      response.json().then((json) => {
        if (response.ok) {
          dispatch(setUsersTotal(json.metaData.totalItems));
        } else {
          dispatch(addErrors(json.errors.map(err => err.message)));
        }
        resolve();
      });
    });
  })
);


export const fetchCurrentPageUserDetail = () => (dispatch, getState) => (
  new Promise((resolve) => {
    const { username } = getParams(getState());
    dispatch(toggleLoading('user'));
    getUser(username).then((response) => {
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
  })
);


export const fetchUserForm = username => dispatch => (
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
  })
);

export const sendPostUser = user => async (dispatch) => {
  const response = await postUser(user);
  const json = await response.json();
  if (response.ok) {
    dispatch(setSelectedUserDetail(json.payload));
    dispatch(fetchUsers());
    gotoRoute(ROUTE_USER_LIST);
    return json;
  }
  dispatch(addErrors(json.errors.map(e => e.message)));
  throw json;
};

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

export const sendDeleteUser = username => dispatch => (
  new Promise((resolve) => {
    deleteUser(username).then((response) => {
      response.json().then((json) => {
        if (response.ok) {
          dispatch(fetchUsers());
        } else {
          dispatch(addErrors(json.errors.map(err => err.message)));
        }
        resolve();
      });
    });
  })
);

export const sendPostUserAuthorities = authorities => async (dispatch, getState) => {
  const username = getParams(getState());
  const response = await postUserAuthorities(username, authorities);
  const contentType = response.headers.get('content-type');
  if (contentType && contentType.includes('application/json')) {
    const json = await response.json();
    if (response.ok) {
      gotoRoute(ROUTE_USER_LIST);
      return json;
    }
    dispatch(addErrors(json.errors.map(e => e.message)));
    throw json;
  }
  throw new TypeError('No JSON content-type in response headers');
};
