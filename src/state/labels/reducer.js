import { combineReducers } from 'redux';

import { SET_LABELS, UPDATE_LABEL } from 'state/labels/types';

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
    default: return state;
  }
};

const list = (state = [], action = {}) => {
  switch (action.type) {
    case SET_LABELS:
      return action.payload.labels.map(label => label.key);
    default: return state;
  }
};

export default combineReducers({
  map,
  list,
});
