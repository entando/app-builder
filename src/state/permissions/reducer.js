import { combineReducers } from 'redux';
import { get, flatten } from 'lodash';
import { ROLE_SUPERUSER } from 'state/permissions/const';
import {
  SET_PERMISSIONS,
  SET_LOGGED_USER_PERMISSIONS,
  CLEAR_LOGGED_USER_PERMISSIONS,
} from 'state/permissions/types';

export const toMap = array => array.reduce((acc, permission) => {
  acc[permission.code] = permission;
  return acc;
}, {});

export const toIdListPermissions = array => array.map(permission => permission.code);

export const list = (state = [], action = {}) => {
  switch (action.type) {
    case SET_PERMISSIONS: {
      return toIdListPermissions(action.payload.permissions);
    }
    default: return state;
  }
};

export const permissionMap = (state = {}, action = {}) => {
  switch (action.type) {
    case SET_PERMISSIONS: {
      return toMap(action.payload.permissions);
    }
    default: return state;
  }
};

const stringToArr = val => (
  Array.isArray(val) ? val : [val]
);

const loggedUser = (state = [], action = {}) => {
  switch (action.type) {
    case SET_LOGGED_USER_PERMISSIONS: {
      const { result, allPermissions } = action.payload;
      const authorityMaps = result.map(authority => (
        stringToArr(authority.permissions ? authority.permissions : get(authority, 'role', []))
      ));
      const roles = Array.from(new Set(flatten(authorityMaps)));
      return roles.includes(ROLE_SUPERUSER) ? allPermissions : roles;
    }
    case CLEAR_LOGGED_USER_PERMISSIONS:
      return [];
    default: return state;
  }
};

export default combineReducers({
  list,
  map: permissionMap,
  loggedUser,
});
