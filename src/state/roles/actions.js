import { initialize } from 'redux-form';
import { gotoRoute } from '@entando/router';
import {
  getRoles, getRole, postRole, putRole, deleteRole,
  getUserReferences,
} from 'api/roles';
import { setPage } from 'state/pagination/actions';
import { addErrors } from 'state/errors/actions';
import { toggleLoading } from 'state/loading/actions';
// import { fetchPermissions } from 'state/permissions/actions';
import {
  SET_ROLES, SET_SELECTED, REMOVE_ROLE,
  SET_USER_REFS,
} from 'state/roles/types';
import { ROUTE_ROLE_LIST } from 'app-init/router';

export const setRoles = roles => ({
  type: SET_ROLES,
  payload: {
    roles,
  },
});

export const setSelected = role => ({
  type: SET_SELECTED,
  payload: {
    role,
  },
});

export const removeRole = roleCode => ({
  type: REMOVE_ROLE,
  payload: {
    roleCode,
  },
});

export const setUserRefs = userRefs => ({
  type: SET_USER_REFS,
  payload: {
    userRefs,
  },
});

// thunk
export const fetchRoles = (page = { page: 1, pageSize: 10 }, params = '') => dispatch =>
  new Promise((resolve) => {
    getRoles(page, params).then((response) => {
      response.json().then((data) => {
        if (response.ok) {
          dispatch(setRoles(data.payload));
          dispatch(toggleLoading('roles'));
          dispatch(setPage(data.metaData));
        } else {
          dispatch(addErrors(data.errors.map(err => err.message)));
          dispatch(toggleLoading('roles'));
        }
        resolve();
      });
    });
  });

export const fetchRole = roleCode => dispatch =>
  new Promise((resolve) => {
    getRole(roleCode).then((response) => {
      response.json().then((data) => {
        if (response.ok) {
          dispatch(initialize('role', data.payload));
        } else {
          dispatch(addErrors(data.errors.map(err => err.message)));
        }
        resolve();
      });
    });
  });

export const fetchRoleDetail = roleCode => dispatch =>
  new Promise((resolve) => {
    getRole(roleCode).then((response) => {
      response.json().then((data) => {
        if (response.ok) {
          dispatch(setSelected(data.payload));
        } else {
          dispatch(addErrors(data.errors.map(err => err.message)));
        }
        resolve();
      });
    });
  });

export const sendPostRole = rolesData => dispatch =>
  new Promise((resolve) => {
    postRole(rolesData).then((response) => {
      response.json().then((data) => {
        if (response.ok) {
          gotoRoute(ROUTE_ROLE_LIST);
        } else {
          dispatch(addErrors(data.errors.map(err => err.message)));
        }
        resolve();
      });
    });
  });

export const sendPutRole = rolesData => dispatch =>
  new Promise((resolve) => {
    putRole(rolesData).then((response) => {
      response.json().then((data) => {
        if (response.ok) {
          gotoRoute(ROUTE_ROLE_LIST);
        } else {
          dispatch(addErrors(data.errors.map(err => err.message)));
        }
        resolve();
      });
    });
  });

export const sendDeleteRole = roleCode => dispatch =>
  new Promise((resolve) => {
    deleteRole(roleCode).then((response) => {
      response.json().then((data) => {
        if (response.ok) {
          dispatch(removeRole(roleCode));
        } else {
          dispatch(addErrors(data.errors.map(err => err.message)));
        }
        resolve();
      });
    });
  });

export const fetchUserRefs = (roleCode, page = { page: 1, pageSize: 10 }, params = '') => dispatch =>
  new Promise((resolve) => {
    dispatch(toggleLoading('references'));
    getUserReferences(roleCode, page, params).then((response) => {
      response.json().then((data) => {
        if (response.ok) {
          dispatch(setUserRefs(data.payload));
          dispatch(setPage(data.metaData));
        } else {
          dispatch(addErrors(data.errors.map(err => err.message)));
        }
        dispatch(toggleLoading('references'));
        resolve();
      });
    });
  });
