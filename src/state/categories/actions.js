import { getCategoryTree } from 'api/categories';

import {
  SET_CATEGORIES, TOGGLE_CATEGORY_EXPANDED, SET_CATEGORY_LOADING,
  SET_CATEGORY_LOADED,
} from 'state/categories/types';
import { addErrors } from 'state/errors/actions';
import { getStatusMap } from 'state/categories/selectors';

export const setCategories = categories => ({
  type: SET_CATEGORIES,
  payload: {
    categories,
  },
});

export const toggleCategoryExpanded = (categoryCode, expanded) => ({
  type: TOGGLE_CATEGORY_EXPANDED,
  payload: {
    categoryCode,
    expanded,
  },
});

export const setCategoryLoading = categoryCode => ({
  type: SET_CATEGORY_LOADING,
  payload: {
    categoryCode,
  },
});

export const setCategoryLoaded = categoryCode => ({
  type: SET_CATEGORY_LOADED,
  payload: {
    categoryCode,
  },
});

export const fetchCategoryTree = (params = '') => dispatch =>
  new Promise((resolve) => {
    getCategoryTree(params).then((response) => {
      response.json().then((data) => {
        if (response.ok) {
          dispatch(setCategories(data.payload));
          resolve();
        } else {
          dispatch(addErrors(data.errors.map(err => err.message)));
          resolve();
        }
      });
    });
  });

export const handleExpandCategory = (categoryCode = 'home') => (dispatch, getState) =>
  new Promise((resolve) => {
    const categoryStatus = getStatusMap(getState())[categoryCode];
    const toExpand = (!categoryStatus || !categoryStatus.expanded);
    const toLoad = (toExpand && (!categoryStatus || !categoryStatus.loaded));
    if (toLoad) {
      dispatch(setCategoryLoading(categoryCode));
      dispatch(fetchCategoryTree(`?parentNode=${categoryCode}`)).then(() => {
        dispatch(toggleCategoryExpanded(categoryCode, true));
        dispatch(setCategoryLoaded(categoryCode));
        resolve();
      });
    } else {
      dispatch(toggleCategoryExpanded(categoryCode, toExpand));
      resolve();
    }
  });
