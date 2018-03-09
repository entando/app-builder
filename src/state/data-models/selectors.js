import { createSelector } from 'reselect';

export const getDataModels = state => state.dataModels;

export const getListDataModelsPaged = createSelector(
  [getDataModels],
  dataModels => dataModels.pagedList,
);
