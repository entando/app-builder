import { initialize } from 'redux-form';
import { batch } from 'react-redux';
import { addToast, addErrors, TOAST_ERROR } from '@entando/messages';

import {
  getCategoryTree, getCategory, postCategory,
  putCategory, deleteCategory, getReferences,
} from 'api/categories';

import { setPage } from 'state/pagination/actions';
import { toggleLoading } from 'state/loading/actions';
import { history, ROUTE_CATEGORY_LIST, ROUTE_CATEGORY_ADD } from 'app-init/router';
import {
  getStatusMap,
  getReferenceKeyList,
  getSelectedRefs,
  getCategoriesMap,
  getChildrenMap,
  getCategoriesLoadedStatus,
} from 'state/categories/selectors';

import {
  SET_CATEGORIES, SET_CATEGORY_EXPANDED, SET_CATEGORY_LOADING,
  SET_CATEGORY_LOADED, SET_SELECTED_CATEGORY, REMOVE_CATEGORY,
  SET_REFERENCES,
} from 'state/categories/types';
import { ROOT_CODE } from 'state/categories/const';

export const setCategories = categories => ({
  type: SET_CATEGORIES,
  payload: {
    categories,
  },
});

export const setCategoryExpanded = (categoryCode, expanded) => ({
  type: SET_CATEGORY_EXPANDED,
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

export const removeCategory = (categoryCode, parentCode) => ({
  type: REMOVE_CATEGORY,
  payload: {
    categoryCode,
    parentCode,
  },
});

export const setReferences = references => ({
  type: SET_REFERENCES,
  payload: {
    references,
  },
});

export const wrapApiCall = apiFunc => (...args) => async (dispatch) => {
  const response = await apiFunc(...args);
  const json = await response.json();
  if (response.ok) {
    return json;
  }
  dispatch(addErrors(json.errors.map(e => e.message)));
  json.errors.forEach(err => dispatch(addToast(err.message, TOAST_ERROR)));
  throw json;
};

export const fetchCategoryNode = wrapApiCall(getCategory);
export const fetchCategoryChildren = wrapApiCall(getCategoryTree);

export const fetchCategoryTree = (categoryCode = ROOT_CODE) => async (dispatch, getState) => {
  let categoryTree;
  try {
    if (categoryCode === ROOT_CODE) {
      dispatch(toggleLoading('categories'));
      const responses = await Promise.all([
        fetchCategoryNode(categoryCode)(dispatch),
        fetchCategoryChildren(categoryCode)(dispatch),
      ]);
      dispatch(setCategoryLoaded(categoryCode));
      const categoryStatus = getStatusMap(getState())[categoryCode];
      const toExpand = (!categoryStatus || !categoryStatus.expanded);
      if (toExpand) {
        dispatch(setCategoryExpanded(categoryCode, true));
      }
      dispatch(toggleLoading('categories'));
      categoryTree = [responses[0].payload].concat(responses[1].payload);
    } else {
      const response = await fetchCategoryChildren(categoryCode)(dispatch);
      categoryTree = response.payload;
    }
    dispatch(setCategories(categoryTree));
  } catch (e) {
    // do nothing
  }
};

export const handleExpandCategory = (categoryCode = ROOT_CODE, alwaysExpand) =>
  (dispatch, getState) => {
    const categoryStatus = getStatusMap(getState())[categoryCode];
    const toExpand = (!categoryStatus || !categoryStatus.expanded);
    const toLoad = (toExpand && (!categoryStatus || !categoryStatus.loaded));
    if (toLoad) {
      dispatch(setCategoryLoading(categoryCode));
      return dispatch(fetchCategoryTree(categoryCode)).then(() => {
        dispatch(setCategoryExpanded(categoryCode, true));
        dispatch(setCategoryLoaded(categoryCode));
      });
    }
    dispatch(setCategoryExpanded(
      categoryCode,
      alwaysExpand !== undefined ? alwaysExpand : toExpand,
    ));
    return Promise.resolve();
  };

export const handleExpandAll = () => (dispatch, getState) => {
  const categories = Object.keys(getChildrenMap(getState()));
  Promise.all(categories.map(category => dispatch(handleExpandCategory(category, true))))
    .then(() => {
      const categoriesToLoad = getCategoriesLoadedStatus(getState());
      if (categoriesToLoad.length) {
        dispatch(handleExpandAll());
      }
    });
};

export const handleCollapseAll = () => (dispatch, getState) => {
  const categories = getStatusMap(getState());
  const categoriesToCollapse = Object.keys(categories);

  batch(() => {
    categoriesToCollapse
      .forEach(categoryCode => dispatch(setCategoryExpanded(categoryCode, false)));
  });
};

export const fetchCategory = categoryCode => dispatch =>
  dispatch(fetchCategoryNode(categoryCode)).then((data) => {
    dispatch(initialize('category', data.payload));
  });

export const sendPostCategory = categoryData => (dispatch, getState) => {
  try {
    const { parentCode } = categoryData;
    return dispatch(wrapApiCall(postCategory)(categoryData)).then((data) => {
      dispatch(setCategories([data.payload]));
      const { parentCode: grandParentCode } = getCategoriesMap(getState())[parentCode];
      dispatch(fetchCategoryTree(grandParentCode));
      history.push(ROUTE_CATEGORY_LIST);
    });
  } catch (e) {
    return Promise.resolve();
  }
};

export const sendPutCategory = categoryData => (dispatch) => {
  try {
    return dispatch(wrapApiCall(putCategory)(categoryData)).then((data) => {
      dispatch(setCategories([data.payload]));
      history.push(ROUTE_CATEGORY_LIST);
    });
  } catch (e) {
    return Promise.resolve();
  }
};

export const sendDeleteCategory = (categoryCode, parentCode) => (dispatch) => {
  try {
    return dispatch(wrapApiCall(deleteCategory)(categoryCode)).then(() => {
      dispatch(removeCategory(categoryCode, parentCode));
    });
  } catch (e) {
    return Promise.resolve();
  }
};

export const fetchReferences = (categoryCode, referenceKey, page) => (dispatch) => {
  try {
    return dispatch(wrapApiCall(getReferences)(categoryCode, referenceKey, page)).then((data) => {
      dispatch(setReferences({
        [referenceKey]: data.payload,
      }));
      dispatch(setPage(data.metaData, referenceKey));
    });
  } catch (e) {
    return Promise.resolve();
  }
};

export const fetchCategoryDetail = categoryCode => (dispatch, getState) => {
  try {
    dispatch(toggleLoading('categoryDetail'));
    return dispatch(wrapApiCall(getCategory)(categoryCode)).then((data) => {
      dispatch(setSelectedCategory(data.payload));
      const references = getReferenceKeyList(getState());
      references.forEach((referenceKey) => {
        if (getSelectedRefs(getState())[referenceKey]) {
          dispatch(fetchReferences(categoryCode, referenceKey));
        } else {
          setReferences({
            [referenceKey]: [],
          });
        }
      });
      dispatch(toggleLoading('categoryDetail'));
    });
  } catch (e) {
    dispatch(toggleLoading('categoryDetail'));
    return Promise.resolve();
  }
};

export const initCategoryForm = categoryData => (dispatch) => {
  dispatch(initialize('category', categoryData));
  history.push(ROUTE_CATEGORY_ADD);
};
