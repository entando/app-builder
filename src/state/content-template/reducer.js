import {
  SET_CONTENT_TEMPLATES,
  SET_CONTENT_TEMPLATE_FILTER,
  SET_CONTENT_TEMPLATE_SEARCH_KEYWORD,
} from 'state/content-template/types';
import { combineReducers } from 'redux';

const list = (state = [], action = {}) => {
  switch (action.type) {
    case SET_CONTENT_TEMPLATES:
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
    case SET_CONTENT_TEMPLATE_FILTER:
      return {
        ...state,
        filterProps: action.payload,
      };
    case SET_CONTENT_TEMPLATE_SEARCH_KEYWORD:
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
