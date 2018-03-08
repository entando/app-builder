import { createSelector } from 'reselect';

export const getDataModels = state => state.dataModelList;

export const getListDataModels = createSelector(
  [getDataModels],
  dataModelList => dataModelList.list,
);

export const getListDataModelsPaged = createSelector(
  [getDataModels],
  dataModelList => dataModelList.pagedList,
);
