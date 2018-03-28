import { combineReducers } from 'redux';
import {
  SET_GROUPS,
  SET_SELECTED_GROUP,
  TOGGLE_LOADING,
  SET_SELECTED_GROUP_PAGE_REFERENCES,
  SET_SELECTED_GROUP_USER_REFERENCES,
  SET_SELECTED_GROUP_WIDGETTYPE_REFERENCES,
  SET_SELECTED_GROUP_CONTENT_REFERENCES,
  SET_SELECTED_GROUP_RESOURCE_REFERENCES,
} from 'state/groups/types';

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
    case SET_SELECTED_GROUP: {
      return { ...state, ...action.payload.group };
    }
    case SET_SELECTED_GROUP_PAGE_REFERENCES: {
      return { ...state, pageReferences: action.payload.references };
    }
    case SET_SELECTED_GROUP_USER_REFERENCES: {
      return { ...state, userReferences: action.payload.references };
    }
    case SET_SELECTED_GROUP_WIDGETTYPE_REFERENCES: {
      return { ...state, widgetTypeReferences: action.payload.references };
    }
    case SET_SELECTED_GROUP_CONTENT_REFERENCES: {
      return { ...state, contentReferences: action.payload.references };
    }
    case SET_SELECTED_GROUP_RESOURCE_REFERENCES: {
      return { ...state, resourceReferences: action.payload.references };
    }
    default: return state;
  }
};

export const loading = (state = {}, action = {}) => {
  switch (action.type) {
    case TOGGLE_LOADING: {
      return { ...state, [action.payload.id]: !state[action.payload.id] };
    }
    default: return state;
  }
};

export default combineReducers({
  list,
  map: groupMap,
  selected,
  loading,
});
