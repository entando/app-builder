import { createSelector } from 'reselect';
import { ALL_CATEGORIES_CATEGORY } from 'state/component-repository/categories/const';

export const getECRCategories = state => state.componentRepositoryCategories;

export const getECRCategoryList = createSelector(
  getECRCategories,
  componentRepositoryCategories => componentRepositoryCategories.list,
);

export const getSelectedECRCategory = createSelector(
  getECRCategories,
  componentRepositoryCategories => componentRepositoryCategories.selected,
);

export const isAllCategoriesCategorySelected = createSelector(
  getSelectedECRCategory,
  selectedCategory => selectedCategory === ALL_CATEGORIES_CATEGORY,
);
