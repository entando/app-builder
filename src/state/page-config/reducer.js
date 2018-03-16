import { combineReducers } from 'redux';
import { TOGGLE_CONTENT, SET_SEARCH_FILTER, CHANGE_VIEW_LIST, TOGGLE_CONTENT_TOOLBAR_EXPANDED } from 'state/page-config/types';
import { WIDGET_LIST, PAGES } from 'state/page-config/const';

export const content = (state = WIDGET_LIST, action = {}) => {
  switch (action.type) {
    case TOGGLE_CONTENT: {
      return state === WIDGET_LIST ? PAGES : WIDGET_LIST;
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

export const toolbarExpanded = (state = false, action = {}) => {
  switch (action.type) {
    case TOGGLE_CONTENT_TOOLBAR_EXPANDED: {
      return !state;
    }
    default: return state;
  }
};


export default combineReducers({
  content,
  searchFilter,
  viewList,
  toolbarExpanded,
});
