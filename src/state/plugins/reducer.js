import { combineReducers } from 'redux';
import { SET_SELECTED_PLUGIN, SET_PLUGINS } from 'state/plugins/types';

const selected = (state = {}, action = {}) => {
  switch (action.type) {
    case SET_SELECTED_PLUGIN: {
      return action.payload.plugin;
    }
    default: return state;
  }
};

const map = (state = {}, action = {}) => {
  switch (action.type) {
    case SET_PLUGINS: {
      return action.payload.plugins.reduce(
        (acc, curr) => ({
          ...acc,
          [curr.id]: curr,
        }),
        {},
      );
    }
    default: return state;
  }
};

const list = (state = [], action = {}) => {
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
  map,
});
