import { combineReducers } from 'redux';
import { SET_ROLES, SET_SELECTED, REMOVE_ROLE } from 'state/roles/types';

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
    case REMOVE_ROLE: {
      const { roleCode } = action.payload;
      return state.filter(role => role !== roleCode);
    }
    default: return state;
  }
};

export const selected = (state = {}, action = {}) => {
  switch (action.type) {
    case SET_SELECTED: {
      return action.payload.role;
    }
    default: return state;
  }
};

export const roleMap = (state = {}, action = {}) => {
  switch (action.type) {
    case SET_ROLES: {
      return toMap(action.payload.roles);
    }
    case REMOVE_ROLE: {
      const { roleCode } = action.payload;
      const newState = { ...state };
      delete newState[roleCode];
      return newState;
    }
    default: return state;
  }
};

export default combineReducers({
  list,
  map: roleMap,
  selected,
});
