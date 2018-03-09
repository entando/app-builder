
import { combineReducers } from 'redux';
import { SET_SELECTED, SET_FRAGMENTS, SET_WIDGET_TYPES, SET_PLUGINS } from 'state/fragments/types';

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

const widgetTypes = (state = [], action = {}) => {
  switch (action.type) {
    case SET_WIDGET_TYPES: {
      return action.payload.widgetTypes;
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


export default combineReducers({
  selected,
  list,
  widgetTypes,
  plugins,
});
