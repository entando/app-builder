import { combineReducers } from 'redux';
import { SET_CONTENT_TOOLBAR, SET_SEARCH_FILTER, CHANGE_VIEW_LIST } from 'state/page-config/types';

export const content = (state = 'WIDGET_LIST', action = {}) => {
  switch (action.type) {
    case SET_CONTENT_TOOLBAR: {
      return action.payload.content;
    }
    default: return state;
  }
};

export const searchFilter = (state = null, action = {}) => {
  switch (action.type) {
    case SET_SEARCH_FILTER: {
      return action.payload.filter;
    }
    default: return state;
  }
};

export const viewList = (state = 'list', action = {}) => {
  switch (action.type) {
    case CHANGE_VIEW_LIST: {
      return action.payload.view;
    }
    default: return state;
  }
};

export default combineReducers({
  content,
  searchFilter,
  viewList,
});
