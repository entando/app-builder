import { getCategoryTree, getCategory, postCategory } from 'api/categories';
import { toggleLoading } from 'state/loading/actions';
import { gotoRoute } from '@entando/router';
import { ROUTE_CATEGORY_LIST } from 'app-init/router';

import {
  SET_CATEGORIES, TOGGLE_CATEGORY_EXPANDED, SET_CATEGORY_LOADING,
  SET_CATEGORY_LOADED, SET_SELECTED_CATEGORY,
} from 'state/categories/types';
import { addErrors } from 'state/errors/actions';
import { getStatusMap } from 'state/categories/selectors';

const ROOT_CODE = 'home';

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

export const setSelectedCategory = category => ({
  type: SET_SELECTED_CATEGORY,
  payload: {
    category,
  },
});

// export const wrapApiCall = apiFunc => (...args) => async (dispatch) => {
//   const response = await apiFunc(...args);
//   const json = await response.json();
//   if (response.ok) {
//     return json;
//   }
//   dispatch(addErrors(json.errors.map(e => e.message)));
//   throw json;
// };

export const wrapApiCall = apiFunc => (...args) => async (dispatch) => {
  const response = await apiFunc(...args);
  const contentType = response.headers.get('content-type');
  if (contentType && contentType.includes('application/json')) {
    const json = await response.json();
    if (response.ok) {
      return json;
    }
    dispatch(addErrors(json.errors.map(e => e.message)));
    throw json;
  }
  throw new TypeError('No JSON content-type in response headers');
};

export const fetchCategory = wrapApiCall(getCategory);
export const fetchCategoryChildren = wrapApiCall(getCategoryTree);

export const fetchCategoryTree = (categoryCode = ROOT_CODE) => async (dispatch, getState) => {
  let categoryTree;
  if (categoryCode === ROOT_CODE) {
    dispatch(toggleLoading('categories'));
    const responses = await Promise.all([
      fetchCategory(categoryCode)(dispatch),
      fetchCategoryChildren(categoryCode)(dispatch),
    ]);
    dispatch(setCategoryLoaded(categoryCode));
    const categoryStatus = getStatusMap(getState())[categoryCode];
    const toExpand = (!categoryStatus || !categoryStatus.expanded);
    if (toExpand) {
      dispatch(toggleCategoryExpanded(categoryCode, true));
    }
    dispatch(toggleLoading('categories'));
    categoryTree = [responses[0].payload].concat(responses[1].payload);
  } else {
    const response = await fetchCategoryChildren(categoryCode)(dispatch);
    categoryTree = response.payload;
  }

  dispatch(setCategories(categoryTree));
};

export const handleExpandCategory = (categoryCode = ROOT_CODE) => (dispatch, getState) =>
  new Promise((resolve) => {
    const categoryStatus = getStatusMap(getState())[categoryCode];
    const toExpand = (!categoryStatus || !categoryStatus.expanded);
    const toLoad = (toExpand && (!categoryStatus || !categoryStatus.loaded));
    if (toLoad) {
      dispatch(setCategoryLoading(categoryCode));
      dispatch(fetchCategoryTree(categoryCode)).then(() => {
        dispatch(toggleCategoryExpanded(categoryCode, true));
        dispatch(setCategoryLoaded(categoryCode));
      });
    } else {
      dispatch(toggleCategoryExpanded(categoryCode, toExpand));
    }
    resolve();
  });

export const sendPostCategory = categoryData => dispatch =>
  new Promise((resolve) => {
    dispatch(wrapApiCall(postCategory)(categoryData)).then((data) => {
      dispatch(setCategories([data.payload]));
      gotoRoute(ROUTE_CATEGORY_LIST);
    });
    resolve();
  });
