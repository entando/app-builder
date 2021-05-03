import { combineReducers } from 'redux';
import { get, flatten } from 'lodash';
import { ROLE_SUPERUSER, CRUD_USERS_PERMISSION, VIEW_USERS_AND_PROFILES_PERMISSION, EDIT_USER_PROFILES_PERMISSION } from 'state/permissions/const';
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

const loggedUser = (state = null, action = {}) => {
  switch (action.type) {
    case SET_LOGGED_USER_PERMISSIONS: {
      const { result, allPermissions } = action.payload;
      const authorityMaps = result.map(authority => (
        stringToArr(authority.permissions ? authority.permissions : get(authority, 'role', []))
      ));
      const groups = result;
      const roles = Array.from(new Set(flatten(authorityMaps)));
      if (roles.includes(ROLE_SUPERUSER)) {
        return { groups, roles: allPermissions };
      }
      if (roles.includes(CRUD_USERS_PERMISSION) || roles.includes(EDIT_USER_PROFILES_PERMISSION)) {
        if (!roles.includes(VIEW_USERS_AND_PROFILES_PERMISSION)) {
          roles.push(VIEW_USERS_AND_PROFILES_PERMISSION);
        }
      }
      return { groups, roles };
    }
    case CLEAR_LOGGED_USER_PERMISSIONS:
      return null;
    default: return state;
  }
};

export default combineReducers({
  list,
  map: permissionMap,
  loggedUser,
});
