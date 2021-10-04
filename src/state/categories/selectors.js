import { createSelector } from 'reselect';
import { get } from 'lodash';
import { getLocale } from 'state/locale/selectors';

export const getCategories = state => state.categories;
export const getCategoriesIdList = state => state.categories.list;
export const getCategoryTreeFetched = state => state.categories.treeFetched.status;
export const getCategoriesMap = state => state.categories.map;
export const getChildrenMap = state => state.categories.childrenMap;
export const getStatusMap = state => state.categories.statusMap;
export const getTitlesMap = state => state.categories.titlesMap;
export const getJoinedCategoriesCodes = state => state.editContent.joinedCategories;
export const getSelected = state => get(state.categories, 'selected', {});
export const getSelectedRefs = state => get(state.categories, 'selected.references', {});
export const getReferenceKeyList = state => get(state.categories, 'selected.referenceKeyList', []);
export const getReferenceMap = state => get(state.categories, 'selected.referenceMap', {});

const CATEGORY_STATUS_DEFAULTS = {
  expanded: false,
  loading: false,
  loaded: false,
};

const getCategoriesOrder = (categoriesChildren) => {
  const fifo = ['home'];
  const sorted = [];
  while (fifo.length) {
    const curCategoryCode = fifo.pop();
    sorted.push(curCategoryCode);
    if (categoriesChildren[curCategoryCode]) {
      categoriesChildren[curCategoryCode].slice().reverse().forEach((code) => {
        fifo.push(code);
      });
    }
  }
  return sorted;
};

const isVisible = (categoryCode, categories, categoriesStatus) => {
  let curCategoryCode = categoryCode;
  if (categories[curCategoryCode]) {
    while (curCategoryCode !== 'home') {
      curCategoryCode = categories[curCategoryCode].parentCode;
      if (categoriesStatus[curCategoryCode] && !categoriesStatus[curCategoryCode].expanded) {
        return false;
      }
    }
    return true;
  }
  return false;
};

const getDepth = (categories, categoryCode) => {
  let curCategoryCode = categoryCode;
  let depth = 0;
  if (categories[curCategoryCode]) {
    while (curCategoryCode !== 'home') {
      curCategoryCode = categories[curCategoryCode].parentCode;
      depth += 1;
    }
  }
  return depth;
};

export const getCategoryTree = createSelector(
  [getCategoriesMap, getChildrenMap, getStatusMap, getTitlesMap, getLocale],
  (categories, categoryChildren, categoriesStatus, categoriesTitles, locale) =>
    getCategoriesOrder(categoryChildren)
      .filter(categoryCode => isVisible(categoryCode, categories, categoriesStatus))
      .map(categoryCode => ({
        ...categories[categoryCode],
        ...CATEGORY_STATUS_DEFAULTS,
        ...categoriesStatus[categoryCode],
        depth: getDepth(categories, categoryCode),
        isEmpty: !(categoryChildren[categoryCode] && categoryChildren[categoryCode].length),
        title: categoriesTitles[categoryCode][locale],
      })),
);

export const getCategoryTreeVisibleNodes = createSelector(
  [getCategoriesMap, getChildrenMap, getStatusMap, getTitlesMap, getLocale],
  (categories, categoryChildren, categoriesStatus, categoriesTitles, locale) => (
    getCategoriesOrder(categoryChildren)
  )
    .filter(categoryCode => isVisible(categoryCode, categories, categoriesStatus))
    .map(categoryCode => ({
      ...categories[categoryCode],
      ...CATEGORY_STATUS_DEFAULTS,
      ...categoriesStatus[categoryCode],
      depth: getDepth(categories, categoryCode),
      children: categoryChildren[categoryCode],
      isEmpty: !(categoryChildren[categoryCode] && categoryChildren[categoryCode].length),
      title: get(categoriesTitles, `${categoryCode}.${locale}`, ''),
    })),
);

export const getAllCategories = createSelector(
  [getCategoriesMap, getChildrenMap, getStatusMap, getTitlesMap, getLocale],
  (categories, categoryChildren, categoriesStatus) => (
    getCategoriesOrder(categoryChildren)
  ).map(categoryCode => ({
    ...categories[categoryCode],
    ...CATEGORY_STATUS_DEFAULTS,
    ...categoriesStatus[categoryCode],
    depth: getDepth(categories, categoryCode),
    children: categoryChildren[categoryCode],
    isEmpty: !(categoryChildren[categoryCode] && categoryChildren[categoryCode].length),
  })),
);

export const getJoinedCategoriesByCodes = createSelector(
  [getAllCategories, getJoinedCategoriesCodes],
  (categories, codes) => categories.filter(c => codes.includes(c.code)),
);

export const getCategoriesLoadedStatus = createSelector(
  [getChildrenMap, getStatusMap],
  (childCategories, categoryStatuses) => (
    Object.keys(childCategories).reduce((acc, curr) => {
      const { expanded, loaded } = get(categoryStatuses, curr, {});
      return !expanded && !loaded ? [...acc, curr] : acc;
    }, [])
  ),
);
