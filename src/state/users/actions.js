import { initialize, reset } from 'redux-form';
import { getParams, gotoRoute } from '@entando/router';
import { formattedText } from '@entando/utils';
import { addToast, addErrors, clearErrors, TOAST_SUCCESS } from '@entando/messages';

import {
  getUsers,
  getUser,
  postUser,
  putUser,
  deleteUser,
  getUserAuthorities,
  postUserAuthorities,
  putUserAuthorities,
  deleteUserAuthorities,
  postUserPassword,
} from 'api/users';
import { setPage } from 'state/pagination/actions';
import { toggleLoading } from 'state/loading/actions';
import { ROUTE_USER_LIST } from 'app-init/router';
import { SET_USERS, SET_SELECTED_USER, SET_SELECTED_USER_AUTHORITIES, SET_USERS_TOTAL } from 'state/users/types';


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

export const setSelectedUserAuthorities = (username, authorities) => ({
  type: SET_SELECTED_USER_AUTHORITIES,
  payload: {
    username,
    authorities,
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
    }).catch(() => {});
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
    }).catch(() => {});
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
    }).catch(() => {});
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
    }).catch(() => {});
  })
);

export const sendPostUser = user => async (dispatch) => {
  try {
    const response = await postUser(user);
    const json = await response.json();
    if (response.ok) {
      dispatch(setSelectedUserDetail(json.payload));
      dispatch(fetchUsers());
      gotoRoute(ROUTE_USER_LIST);
    } else {
      dispatch(addErrors(json.errors.map(e => e.message)));
    }
  } catch (e) {
    // do nothing
  }
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
      }).catch(() => {});
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
    }).catch(() => {});
  })
);

export const fetchUserAuthorities = () => async (dispatch, getState) => {
  try {
    dispatch(toggleLoading('users'));
    const { username } = getParams(getState());
    const response = await getUserAuthorities(username);
    const json = await response.json();
    if (response.ok) {
      dispatch(setSelectedUserAuthorities(username, json.payload));
      dispatch(initialize('autorityForm', { groupRolesCombo: json.payload }));
    } else {
      dispatch(addErrors(json.errors.map(e => e.message)));
    }
    dispatch(toggleLoading('users'));
  } catch (e) {
    // do nothing
  }
};

export const sendPostUserAuthorities = authorities => async (dispatch, getState) => {
  try {
    const { username } = getParams(getState());
    const response = await postUserAuthorities(username, authorities);
    const json = await response.json();
    if (response.ok) {
      gotoRoute(ROUTE_USER_LIST);
    } else {
      dispatch(addErrors(json.errors.map(e => e.message)));
    }
  } catch (e) {
    // do nothing
  }
};

export const sendPutUserAuthorities = authorities => async (dispatch, getState) => {
  try {
    const { username } = getParams(getState());
    const response = await putUserAuthorities(username, authorities);
    const json = await response.json();
    if (response.ok) {
      gotoRoute(ROUTE_USER_LIST);
    } else {
      dispatch(addErrors(json.errors.map(e => e.message)));
    }
  } catch (e) {
    // do nothing
  }
};

export const sendDeleteUserAuthorities = () => async (dispatch, getState) => {
  try {
    const { username } = getParams(getState());
    const response = await deleteUserAuthorities(username);
    const json = await response.json();
    if (response.ok) {
      gotoRoute(ROUTE_USER_LIST);
    } else {
      dispatch(addErrors(json.errors.map(e => e.message)));
    }
  } catch (e) {
    // do nothing
  }
};

export const sendPostUserPassword = (username, data) => async (dispatch) => {
  try {
    const response = await postUserPassword(username, data);
    const json = await response.json();
    if (response.ok) {
      dispatch(addToast(
        formattedText('user.password.success'),
        TOAST_SUCCESS,
      ));
      dispatch(clearErrors());
      dispatch(reset('myprofile-password'));
    } else {
      dispatch(addErrors(json.errors.map(e => e.message)));
    }
  } catch (e) {
    // do nothing
  }
};
