import { createSelector } from 'reselect';

export const getDEExtraFilters = state => state.digitalExchangeExtraFilters;


export const getSelectedDEExtraFilter = createSelector(
  getDEExtraFilters,
  digitalExchangeExtraFilters => digitalExchangeExtraFilters.selected,
);
