import {
  SET_CONTENT_TEMPLATES,
  SET_CONTENT_TEMPLATE_OPENED,
  SET_CONTENT_TEMPLATE_FILTER,
  SET_CONTENT_TEMPLATE_SEARCH_ATTRIBUTE,
  SET_CONTENT_TEMPLATE_SEARCH_KEYWORD,
  SET_CONTENT_TEMPLATE_DICTIONARY,
  CLEAR_CONTENT_TEMPLATE_DICTIONARY,
  CLEAR_CONTENT_TEMPLATE_OPENED,
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

const defaultDictState = {
  map: {},
  list: [],
};

const toListCodes = items => Object.entries(items).map(([key, value]) => ({
  code: key,
  methods: value,
}));

const dictionary = (state = defaultDictState, action = {}) => {
  switch (action.type) {
    case SET_CONTENT_TEMPLATE_DICTIONARY:
      return {
        ...state,
        list: toListCodes(action.payload),
        map: action.payload,
      };
    case CLEAR_CONTENT_TEMPLATE_DICTIONARY:
      return defaultDictState;
    default:
      return state;
  }
};

const opened = (state = {}, action = {}) => {
  switch (action.type) {
    case SET_CONTENT_TEMPLATE_OPENED:
      return {
        ...action.payload,
      };
    case CLEAR_CONTENT_TEMPLATE_OPENED:
      return {};
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
    case SET_CONTENT_TEMPLATE_SEARCH_ATTRIBUTE:
      return {
        ...state,
        attribute: action.payload,
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
  opened,
  filters,
  dictionary,
});

export default reducer;
