import { createSelector } from 'reselect';

export const getDECategories = state => state.digitalExchangeCategories;

export const getDECategoryList = createSelector(
  getDECategories,
  digitalExchangeCategories => digitalExchangeCategories.list,
);

export const getDECategorySelected = createSelector(
  [getDECategories],
  digitalExchangeCategory => digitalExchangeCategory.selected,
);
