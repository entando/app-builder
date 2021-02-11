
import { combineReducers } from 'redux';
import { SET_SELECTED, SET_FRAGMENTS, SET_PLUGINS, REMOVE_FRAGMENT, SET_FILTERS } from 'state/fragments/types';

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
    case REMOVE_FRAGMENT: {
      const { fragmentCode } = action.payload;
      return state.filter(f => f.code !== fragmentCode);
    }
    default: return state;
  }
};

const plugins = (state = [], action = {}) => {
  switch (action.type) {
    case SET_PLUGINS: {
      return action.payload.plugins;
    }
    default: return state;
  }
};

const filters = (state = '', action = {}) => {
  switch (action.type) {
    case SET_FILTERS: {
      return action.payload.filters;
    }
    default: return state;
  }
};

export default combineReducers({
  selected,
  list,
  plugins,
  filters,
});
