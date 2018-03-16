import { createSelector } from 'reselect';

export const getDataModels = state => state.dataModels;

export const getListDataModels = createSelector(
  [getDataModels],
  dataModels => dataModels.pagedList,
);
