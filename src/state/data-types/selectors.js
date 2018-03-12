import { createSelector } from 'reselect';

export const getDataTypes = state => state.dataTypes;
export const getDataTypesIdList = state => state.dataTypes.list;
export const getDataTypesMap = state => state.dataTypes.map;

export const getDataTypeList = createSelector(
  [getDataTypesMap, getDataTypesIdList],
  (dataTypesMap, idList) => idList.map(id => (dataTypesMap[id])),
);
