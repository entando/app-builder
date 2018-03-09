import { SET_CONTENT_TOOLBAR, SET_SEARCH_FILTER } from 'state/page-config/types';

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

export default setContentToolbar;
