import { combineReducers } from 'redux';
import { SET_PERMISSIONS } from 'state/permissions/types';

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

export default combineReducers({
  list,
  map: permissionMap,
});
