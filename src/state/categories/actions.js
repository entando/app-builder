import { initialize } from 'redux-form';
import { gotoRoute } from '@entando/router';
import { addErrors } from '@entando/messages';

import {
  getCategoryTree, getCategory, postCategory,
  putCategory, deleteCategory, getReferences,
} from 'api/categories';
import { toggleLoading } from 'state/loading/actions';
import { ROUTE_CATEGORY_LIST, ROUTE_CATEGORY_ADD } from 'app-init/router';
import { getStatusMap, getReferenceKeyList, getSelectedRefs } from 'state/categories/selectors';

import {
  SET_CATEGORIES, TOGGLE_CATEGORY_EXPANDED, SET_CATEGORY_LOADING,
  SET_CATEGORY_LOADED, SET_SELECTED_CATEGORY, REMOVE_CATEGORY,
  SET_REFERENCES,
} from 'state/categories/types';

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

export const removeCategory = categoryCode => ({
  type: REMOVE_CATEGORY,
  payload: {
    categoryCode,
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
        dispatch(toggleCategoryExpanded(categoryCode, true));
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

export const fetchCategory = categoryCode => dispatch =>
  dispatch(fetchCategoryNode(categoryCode)).then((data) => {
    dispatch(initialize('category', data.payload));
  });

export const sendPostCategory = categoryData => (dispatch) => {
  try {
    dispatch(wrapApiCall(postCategory)(categoryData)).then((data) => {
      dispatch(setCategories([data.payload]));
      gotoRoute(ROUTE_CATEGORY_LIST);
    });
  } catch (e) {
    // do nothing
  }
};

export const sendPutCategory = categoryData => (dispatch) => {
  try {
    dispatch(wrapApiCall(putCategory)(categoryData)).then((data) => {
      dispatch(setCategories([data.payload]));
      gotoRoute(ROUTE_CATEGORY_LIST);
    });
  } catch (e) {
    // do nothing
  }
};

export const sendDeleteCategory = categoryCode => (dispatch) => {
  try {
    dispatch(wrapApiCall(deleteCategory)(categoryCode)).then(() => {
      dispatch(removeCategory(categoryCode));
    });
  } catch (e) {
    // do nothing
  }
};

export const fetchReferences = (categoryCode, referenceKey) => (dispatch) => {
  try {
    dispatch(wrapApiCall(getReferences)(categoryCode, referenceKey)).then((data) => {
      dispatch(setReferences({
        [referenceKey]: data.payload,
      }));
    });
  } catch (e) {
    // do nothing
  }
};

export const fetchCategoryDetail = categoryCode => (dispatch, getState) => {
  try {
    dispatch(wrapApiCall(getCategory)(categoryCode)).then((data) => {
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
    });
  } catch (e) {
    // do nothing
  }
};

export const initCategoryForm = categoryData => (dispatch) => {
  dispatch(initialize('category', categoryData));
  gotoRoute(ROUTE_CATEGORY_ADD);
};
