import { combineReducers } from 'redux';

import { SET_PAGE_MODELS, SET_SELECTED_PAGE_MODEL, REMOVE_PAGE_MODEL } from 'state/page-models/types';


const idList = (state = [], action = {}) => {
  switch (action.type) {
    case SET_PAGE_MODELS: {
      return action.payload.pageModels.map(pageModel => pageModel.code);
    }
    case REMOVE_PAGE_MODEL: {
      const { pageModelCode } = action.payload;
      if (!state.includes(pageModelCode)) {
        return state;
      }
      return state.filter(code => code !== pageModelCode);
    }
    default: return state;
  }
};

const map = (state = {}, action = {}) => {
  switch (action.type) {
    case SET_PAGE_MODELS: {
      return action.payload.pageModels.reduce((acc, pageModel) => {
        acc[pageModel.code] = pageModel;
        return acc;
      }, {});
    }
    case REMOVE_PAGE_MODEL: {
      const { pageModelCode } = action.payload;
      if (!state[pageModelCode]) {
        return state;
      }
      const newState = { ...state };
      delete newState[pageModelCode];
      return newState;
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
  idList,
  map,
  selected,
});
