import { combineReducers } from 'redux';

import {
  SET_LABELS,
  UPDATE_LABEL,
  REMOVE_LABEL,
  SET_ACTIVE_TAB,
  SET_SELECTED_LABEL,
  SET_LABEL_FILTERS,
  SET_SEARCH_TERM,
} from 'state/labels/types';

const map = (state = {}, action = {}) => {
  switch (action.type) {
    case SET_LABELS: {
      return action.payload.labels.reduce((acc, label) => {
        acc[label.key] = label;
        return acc;
      }, {});
    }
    case UPDATE_LABEL: {
      const { label } = action.payload;
      return { ...state, [label.key]: label };
    }
    case REMOVE_LABEL: {
      const { labelCode } = action.payload;
      const newState = { ...state };
      delete newState[labelCode];
      return newState;
    }
    default: return state;
  }
};

const list = (state = [], action = {}) => {
  switch (action.type) {
    case SET_LABELS:
      return action.payload.labels.map(label => label.key);
    case REMOVE_LABEL: {
      const { labelCode } = action.payload;
      return state.filter(label => label !== labelCode);
    }
    default: return state;
  }
};


const activeTab = (state = null, action = {}) => {
  switch (action.type) {
    case SET_ACTIVE_TAB: {
      return action.payload.activeTab;
    }
    default: return state;
  }
};

const filters = (state = null, action = {}) => {
  switch (action.type) {
    case SET_LABEL_FILTERS:
      return action.payload;
    default:
      return state;
  }
};

const selected = (state = null, action = {}) => {
  switch (action.type) {
    case SET_SELECTED_LABEL: {
      return action.payload;
    }
    default: return state;
  }
};

const searchTerm = (state = null, action = {}) => {
  switch (action.type) {
    case SET_SEARCH_TERM: {
      return action.payload.searchTerm;
    }
    default: return state;
  }
};

export default combineReducers({
  map,
  list,
  activeTab,
  filters,
  selected,
  searchTerm,
});
