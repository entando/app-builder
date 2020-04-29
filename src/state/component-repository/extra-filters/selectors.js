import { createSelector } from 'reselect';

export const getECRExtraFilters = state => state.componentRepositoryExtraFilters;


export const getSelectedECRExtraFilter = createSelector(
  getECRExtraFilters,
  componentRepositoryExtraFilters => componentRepositoryExtraFilters.selected,
);
