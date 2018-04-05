import { createSelector } from 'reselect';

import { getLocale } from 'state/locale/selectors';

export const getCategories = state => state.categories;
export const getCategoriesIdList = state => state.categories.list;
export const getCategoriesMap = state => state.categories.map;
export const getChildrenMap = state => state.categories.childrenMap;
export const getStatusMap = state => state.categories.statusMap;
export const getTitlesMap = state => state.categories.titlesMap;

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
