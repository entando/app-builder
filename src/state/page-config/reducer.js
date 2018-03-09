import { combineReducers } from 'redux';
import { SET_CONTENT_TOOLBAR, SET_SEARCH_FILTER, CHANGE_VIEW_LIST } from 'state/page-config/types';

const initialValue = {
  content: 'WIDGET_LIST',
  searchFilter: null,
  viewList: 'list',
};

export const setContent = (state = initialValue.content, action = {}) => {
  switch (action.type) {
    case SET_CONTENT_TOOLBAR: {
      return action.payload.content;
    }
    default: return state;
  }
};

export const setSearchFilter = (state = initialValue.searchFilter, action = {}) => {
  switch (action.type) {
    case SET_SEARCH_FILTER: {
      return action.payload.filter;
    }
    default: return state;
  }
};

export const changeViewList = (state = initialValue.viewList, action = {}) => {
  switch (action.type) {
    case CHANGE_VIEW_LIST: {
      return action.payload.view;
    }
    default: return state;
  }
};

export default combineReducers({
  content: setContent,
  searchFilter: setSearchFilter,
  viewList: changeViewList,
});
