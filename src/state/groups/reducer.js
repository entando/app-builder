import { combineReducers } from 'redux';
import { SET_GROUPS, SELECTED_GROUP } from 'state/groups/types';

export const toMap = array => array.reduce((acc, group) => {
  acc[group.code] = group;
  return acc;
}, {});

export const toIdList = array => array.map(group => group.code);

export const list = (state = [], action = {}) => {
  switch (action.type) {
    case SET_GROUPS: {
      return toIdList(action.payload.groups);
    }
    default: return state;
  }
};

export const groupMap = (state = {}, action = {}) => {
  switch (action.type) {
    case SET_GROUPS: {
      return toMap(action.payload.groups);
    }
    default: return state;
  }
};

export const selected = (state = {}, action = {}) => {
  switch (action.type) {
    case SELECTED_GROUP: {
      return action.payload.group;
    }
    default: return state;
  }
};

export default combineReducers({
  list,
  map: groupMap,
  selected,
});
