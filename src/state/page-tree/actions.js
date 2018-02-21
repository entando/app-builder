
import {
  TOGGLE_PAGE_EXPANDED,
  SET_PAGE_LOADING,
  SET_PAGE_LOADED,
} from './types';


export const togglePageExpanded = (pageCode, expanded) => ({
  type: TOGGLE_PAGE_EXPANDED,
  payload: {
    pageCode,
    expanded,
  },
});

export const setPageLoading = (pageCode, loading) => ({
  type: SET_PAGE_LOADING,
  payload: {
    pageCode,
    loading,
  },
});
export const setPageLoaded = (pageCode, loaded) => ({
  type: SET_PAGE_LOADED,
  payload: {
    pageCode,
    loaded,
  },
});
