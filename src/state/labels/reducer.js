import { combineReducers } from 'redux';

import { SET_LABELS, UPDATE_LABEL, REMOVE_LABEL } from 'state/labels/types';

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
      const { labelKey } = action.payload;
      const newState = { ...state };
      delete newState[labelKey];
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
      const { labelKey } = action.payload;
      return state.filter(label => label !== labelKey);
    }
    default: return state;
  }
};

export default combineReducers({
  map,
  list,
});
