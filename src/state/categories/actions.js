import { flattenDeep } from 'lodash';
import { addToast, addErrors, TOAST_ERROR } from '@entando/messages';

import {
  getCategoryTree, getCategory,
  getReferences,
} from 'api/categories';

import { setPage } from 'state/pagination/actions';
import { toggleLoading } from 'state/loading/actions';
import { getStatusMap } from 'state/categories/selectors';

import {
  SET_CATEGORIES, SET_CATEGORY_EXPANDED,
  SET_CATEGORY_LOADED,
  SET_REFERENCES, SET_CATEGORY_TREE_FETCHED,
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

export const setCategoryLoaded = categoryCode => ({
  type: SET_CATEGORY_LOADED,
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

export const setCategoryTreeFetched = value => ({
  type: SET_CATEGORY_TREE_FETCHED,
  payload: value,
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

export const fetchCategoryTreeAll = () => dispatch => new Promise((resolve) => {
  const fetchBranch = categoryCode => (
    dispatch(fetchCategoryChildren(categoryCode)).then(response => response.payload)
  );

  const loadChildrenBranch = catArr => (
    Promise.all(catArr.map((cat) => {
      if (cat.children.length > 0) {
        return fetchBranch(cat.code).then(res => (
          loadChildrenBranch(res)
        )).then(loadedres => (
          [cat, ...loadedres]
        ));
      }
      return Promise.resolve(cat);
    }))
  );

  dispatch(fetchCategoryNode(ROOT_CODE)).then((rootCat) => {
    fetchBranch(ROOT_CODE).then((catResult) => {
      loadChildrenBranch(catResult).then((fullResult) => {
        const allCats = [rootCat.payload, ...flattenDeep(fullResult)];
        dispatch(setCategories(allCats));
        dispatch(setCategoryTreeFetched(true));
        resolve(allCats);
      });
    });
  }).catch(() => {});
});

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
