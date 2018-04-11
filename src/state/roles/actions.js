import { initialize } from 'redux-form';
import { gotoRoute } from 'frontend-common-components';
import { getRoles, getRole, postRoles, putRole, deleteRole } from 'api/roles';
import { setPage } from 'state/pagination/actions';
import { addErrors } from 'state/errors/actions';
import { toggleLoading } from 'state/loading/actions';
import { SET_ROLES, REMOVE_ROLE } from 'state/roles/types';
import { ROUTE_ROLE_LIST } from 'app-init/router';

export const setRoles = roles => ({
  type: SET_ROLES,
  payload: {
    roles,
  },
});

export const removeRole = roleCode => ({
  type: REMOVE_ROLE,
  payload: {
    roleCode,
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
          resolve();
        } else {
          dispatch(addErrors(data.errors.map(err => err.message)));
          dispatch(toggleLoading('roles'));
          resolve();
        }
      });
    });
  });

export const fetchRole = roleCode => dispatch =>
  new Promise((resolve) => {
    getRole(roleCode).then((response) => {
      response.json().then((data) => {
        if (response.ok) {
          dispatch(initialize('role', data.payload));
          resolve();
        } else {
          dispatch(addErrors(data.errors.map(err => err.message)));
          resolve();
        }
      });
    });
  });

export const sendPostRole = rolesData => dispatch =>
  new Promise((resolve) => {
    postRoles(rolesData).then((response) => {
      response.json().then((data) => {
        if (response.ok) {
          dispatch(setRoles([data]));
          gotoRoute(ROUTE_ROLE_LIST);
          resolve();
        } else {
          dispatch(addErrors(data.errors.map(err => err.message)));
          resolve();
        }
      });
    });
  });

export const sendPutRole = rolesData => dispatch =>
  new Promise((resolve) => {
    putRole(rolesData).then((response) => {
      response.json().then((data) => {
        if (response.ok) {
          gotoRoute(ROUTE_ROLE_LIST);
          resolve();
        } else {
          dispatch(addErrors(data.errors.map(err => err.message)));
          resolve();
        }
      });
    });
  });

export const sendDeleteRole = roleCode => dispatch =>
  new Promise((resolve) => {
    deleteRole(roleCode).then((response) => {
      response.json().then((data) => {
        if (response.ok) {
          dispatch(removeRole(roleCode));
          resolve();
        } else {
          dispatch(addErrors(data.errors.map(err => err.message)));
          resolve();
        }
      });
    });
  });
