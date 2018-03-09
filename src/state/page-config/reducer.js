import { combineReducers } from 'redux';
import { SET_CONTENT_TOOLBAR, SET_SEARCH_FILTER } from 'state/page-config/types';

const initialValue = {
  content: 'WIDGET_LIST',
};

export const setContent = (state = initialValue, action = {}) => {
  switch (action.type) {
    case SET_CONTENT_TOOLBAR: {
      return action.payload.content;
    }
    default: return state;
  }
};

export const setSearchFilter = (state = null, action = {}) => {
  switch (action.type) {
    case SET_SEARCH_FILTER: {
      return action.payload.filter;
    }
    default: return state;
  }
};

export default combineReducers({
  content: setContent,
  searchFilter: setSearchFilter,
});
