
import { combineReducers } from 'redux';
import { SET_SELECTED, SET_FRAGMENTS } from 'state/fragments/types';


const selected = (state = {}, action = {}) => {
  switch (action.type) {
    case SET_SELECTED: {
      return action.payload.fragment;
    }
    default: return state;
  }
};

const list = (state = [], action = {}) => {
  switch (action.type) {
    case SET_FRAGMENTS: {
      return action.payload.fragments;
    }
    default: return state;
  }
};

export default combineReducers({
  selected,
  list,
});
