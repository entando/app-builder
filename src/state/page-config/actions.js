import { SET_CONTENT_TOOLBAR, SET_SEARCH_FILTER, CHANGE_VIEW_LIST } from 'state/page-config/types';

export const setContentToolbar = content => ({
  type: SET_CONTENT_TOOLBAR,
  payload: {
    content,
  },
});

export const setSearchFilter = filter => ({
  type: SET_SEARCH_FILTER,
  payload: {
    filter,
  },
});

export const changeViewList = view => ({
  type: CHANGE_VIEW_LIST,
  payload: {
    view,
  },
});

export default setContentToolbar;
