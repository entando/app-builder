import {
  SET_CONTENT_MODELS,
  SET_CONTENT_MODEL_FILTER,
  SET_CONTENT_MODEL_SEARCH_KEYWORD,
} from 'state/content-model/types';
import { combineReducers } from 'redux';

const list = (state = [], action = {}) => {
  switch (action.type) {
    case SET_CONTENT_MODELS:
      return [
        ...action.payload.list,
      ];
    default:
      return state;
  }
};

const defaultFilterState = {
  filterProps: {},
  attribute: '',
  keyword: '',
};

const filters = (state = defaultFilterState, action = {}) => {
  switch (action.type) {
    case SET_CONTENT_MODEL_FILTER:
      return {
        ...state,
        filterProps: action.payload,
      };
    case SET_CONTENT_MODEL_SEARCH_KEYWORD:
      return {
        ...state,
        keyword: action.payload,
      };
    default:
      return state;
  }
};

const reducer = combineReducers({
  list,
  filters,
});

export default reducer;
