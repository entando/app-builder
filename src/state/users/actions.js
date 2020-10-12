import { initialize, reset } from 'redux-form';
import { addToast, addErrors, clearErrors, TOAST_SUCCESS, TOAST_ERROR } from '@entando/messages';

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
  postWizardSetting,
} from 'api/users';
import { setPage } from 'state/pagination/actions';
import { toggleLoading } from 'state/loading/actions';
import { history, ROUTE_USER_LIST, ROUTE_USER_PROFILE } from 'app-init/router';
import { routeConverter } from '@entando/utils';
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
          json.errors.forEach(err => dispatch(addToast(err.message, TOAST_ERROR)));
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
          json.errors.forEach(err => dispatch(addToast(err.message, TOAST_ERROR)));
        }
        resolve();
      });
    }).catch(() => {});
  })
);


export const fetchCurrentPageUserDetail = username => dispatch => (
  new Promise((resolve) => {
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
          json.errors.forEach(err => dispatch(addToast(err.message, TOAST_ERROR)));
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
          json.errors.forEach(err => dispatch(addToast(err.message, TOAST_ERROR)));
          dispatch(toggleLoading('form'));
          resolve();
        });
      }
    }).catch(() => {});
  })
);

export const sendPostUser = (user, editUserProfile) => async (dispatch) => {
  try {
    const response = await postUser(user);
    const json = await response.json();
    if (response.ok) {
      dispatch(setSelectedUserDetail(json.payload));
      dispatch(fetchUsers());
      if (editUserProfile) {
        history.push(routeConverter(
          ROUTE_USER_PROFILE,
          { username: user.username },
        ));
      } else {
        history.push(ROUTE_USER_LIST);
      }
    } else {
      dispatch(addErrors(json.errors.map(e => e.message)));
      json.errors.forEach(err => dispatch(addToast(err.message, TOAST_ERROR)));
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
          history.push(ROUTE_USER_LIST);
          resolve();
        } else {
          response.json().then((json) => {
            dispatch(addErrors(json.errors.map(err => err.message)));
            json.errors.forEach(err => dispatch(addToast(err.message, TOAST_ERROR)));
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
          json.errors.forEach(err => dispatch(addToast(err.message, TOAST_ERROR)));
        }
        resolve();
      });
    }).catch(() => {});
  })
);

export const fetchUserAuthorities = username => async (dispatch) => {
  try {
    dispatch(toggleLoading('users'));
    const response = await getUserAuthorities(username);
    const json = await response.json();
    if (response.ok) {
      dispatch(setSelectedUserAuthorities(username, json.payload));
      dispatch(initialize('autorityForm', { groupRolesCombo: json.payload }));
    } else {
      dispatch(addErrors(json.errors.map(e => e.message)));
      json.errors.forEach(err => dispatch(addToast(err.message, TOAST_ERROR)));
    }
    dispatch(toggleLoading('users'));
  } catch (e) {
    // do nothing
  }
};

export const sendPostUserAuthorities = (authorities, username) => async (dispatch) => {
  try {
    if (authorities.length === 0) {
      history.push(ROUTE_USER_LIST);
    } else {
      const response = await postUserAuthorities(username, authorities);
      const json = await response.json();
      if (response.ok) {
        history.push(ROUTE_USER_LIST);
      } else {
        dispatch(addErrors(json.errors.map(e => e.message)));
        json.errors.forEach(err => dispatch(addToast(err.message, TOAST_ERROR)));
      }
    }
  } catch (e) {
    // do nothing
  }
};

export const sendPutUserAuthorities = (authorities, username) => async (dispatch) => {
  try {
    const response = await putUserAuthorities(username, authorities);
    const json = await response.json();
    if (response.ok) {
      history.push(ROUTE_USER_LIST);
    } else {
      dispatch(addErrors(json.errors.map(e => e.message)));
      json.errors.forEach(err => dispatch(addToast(err.message, TOAST_ERROR)));
    }
  } catch (e) {
    // do nothing
  }
};

export const sendDeleteUserAuthorities = username => async (dispatch) => {
  try {
    const response = await deleteUserAuthorities(username);
    const json = await response.json();
    if (response.ok) {
      history.push(ROUTE_USER_LIST);
    } else {
      dispatch(addErrors(json.errors.map(e => e.message)));
      json.errors.forEach(err => dispatch(addToast(err.message, TOAST_ERROR)));
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
        { id: 'user.password.success' },
        TOAST_SUCCESS,
      ));
      dispatch(clearErrors());
      dispatch(reset('myprofile-password'));
    } else {
      dispatch(addErrors(json.errors.map(e => e.message)));
      json.errors.forEach(err => dispatch(addToast(err.message, TOAST_ERROR)));
    }
  } catch (e) {
    // do nothing
  }
};

export const sendPostWizardSetting = (username, data) => async (dispatch) => {
  try {
    const response = await postWizardSetting(username, data);
    const json = await response.json();
    if (!response.ok) {
      dispatch(addErrors(json.errors.map(e => e.message)));
      json.errors.forEach(err => dispatch(addToast(err.message, TOAST_ERROR)));
    } else if (data.showToast !== false) {
      dispatch(addToast(
        { id: 'user.wizard.success' },
        TOAST_SUCCESS,
      ));
    }
  } catch (e) {
    // do nothing
  }
};
