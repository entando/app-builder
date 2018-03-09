import { combineReducers } from 'redux';

import { SET_PAGE_MODELS, SET_SELECTED_PAGE_MODEL } from 'state/page-models/types';

const list = (state = [], action = {}) => {
  switch (action.type) {
    case SET_PAGE_MODELS: {
      return action.payload.pageModels;
    }
    default: return state;
  }
};

const selected = (state = null, action = {}) => {
  switch (action.type) {
    case SET_SELECTED_PAGE_MODEL: {
      return action.payload.pageModel;
    }
    default: return state;
  }
};

export default combineReducers({
  list,
  selected,
});
