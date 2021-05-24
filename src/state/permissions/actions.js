import { addToast, addErrors, TOAST_ERROR } from '@entando/messages';

import {
  SET_PERMISSIONS,
  SET_LOGGED_USER_PERMISSIONS,
  CLEAR_LOGGED_USER_PERMISSIONS,
  SET_MY_GROUP_PERMISSIONS,
} from 'state/permissions/types';
import { getPermissionsIdList } from 'state/permissions/selectors';
import { getPermissions, getMyGroupPermissions } from 'api/permissions';
import { setPage } from 'state/pagination/actions';
import { toggleLoading } from 'state/loading/actions';


export const setPermissions = permissions => ({
  type: SET_PERMISSIONS,
  payload: {
    permissions,
  },
});

export const setLoggedUserPermissions = payload => ({
  type: SET_LOGGED_USER_PERMISSIONS,
  payload,
});

export const clearLoggedUserPermissions = () => ({
  type: CLEAR_LOGGED_USER_PERMISSIONS,
});

export const setMyGroupPermissions = payload => ({
  type: SET_MY_GROUP_PERMISSIONS,
  payload,
});

// thunk
export const fetchPermissions = (page = { page: 1, pageSize: 0 }, params = '') => dispatch =>
  new Promise((resolve) => {
    getPermissions(page, params).then((response) => {
      dispatch(toggleLoading('permissions'));
      response.json().then((data) => {
        if (response.ok) {
          dispatch(setPermissions(data.payload));
          dispatch(setPage(data.metaData));
          resolve();
        } else {
          dispatch(addErrors(data.errors.map(err => err.message)));
          data.errors.forEach(err => dispatch(addToast(err.message, TOAST_ERROR)));
          resolve();
        }
        dispatch(toggleLoading('permissions'));
      });
    }).catch(() => {});
  });

export const fetchLoggedUserPermissions = () => (dispatch, getState) => new Promise((resolve) => {
  dispatch(toggleLoading('loggedUserPermissions'));
  const allPermissions = getPermissionsIdList(getState());
  getMyGroupPermissions().then((res) => {
    res.json().then((json) => {
      if (res.ok) {
        dispatch(setLoggedUserPermissions({ result: json.payload, allPermissions }));
      } else {
        dispatch(addErrors(json.errors.map(e => e.message)));
        json.errors.forEach(err => dispatch(addToast(err.message, TOAST_ERROR)));
      }
      dispatch(toggleLoading('loggedUserPermissions'));
      resolve();
    });
  }).catch(() => {});
});

export const fetchMyGroupPermissions = () => dispatch => new Promise((resolve) => {
  getMyGroupPermissions().then((res) => {
    res.json().then((json) => {
      if (res.ok) {
        dispatch(setMyGroupPermissions(json.payload));
      } else {
        dispatch(addErrors(json.errors.map(e => e.message)));
        json.errors.forEach(err => dispatch(addToast(err.message, TOAST_ERROR)));
      }
      resolve();
    });
  }).catch(() => {});
});
