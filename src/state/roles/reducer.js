import { combineReducers } from 'redux';
import { SET_ROLES } from 'state/roles/types';

export const toMap = array => array.reduce((acc, role) => {
  acc[role.code] = role;
  return acc;
}, {});

export const toIdListRoles = array => array.map(role => role.code);

export const list = (state = [], action = {}) => {
  switch (action.type) {
    case SET_ROLES: {
      return toIdListRoles(action.payload.roles);
    }
    default: return state;
  }
};

export const roleMap = (state = {}, action = {}) => {
  switch (action.type) {
    case SET_ROLES: {
      return toMap(action.payload.roles);
    }
    default: return state;
  }
};

export default combineReducers({
  list,
  map: roleMap,
});
