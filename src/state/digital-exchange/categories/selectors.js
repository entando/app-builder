import { createSelector } from 'reselect';
import { ALL_CATEGORIES_CATEGORY } from 'state/digital-exchange/categories/const';

export const getDECategories = state => state.digitalExchangeCategories;

export const getDECategoryList = createSelector(
  getDECategories,
  digitalExchangeCategories => digitalExchangeCategories.list,
);

export const getSelectedDECategory = createSelector(
  getDECategories,
  digitalExchangeCategories => digitalExchangeCategories.selected,
);

export const isAllCategoriesCategorySelected = createSelector(
  getSelectedDECategory,
  selectedCategory => selectedCategory === ALL_CATEGORIES_CATEGORY,
);
