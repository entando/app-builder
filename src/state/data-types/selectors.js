import { createSelector } from 'reselect';
import { get } from 'lodash';

export const getDataTypes = state => state.dataTypes;
export const getDataTypesIdList = state => state.dataTypes.list;
export const getDataTypesMap = state => state.dataTypes.map;
export const getDataTypeAttributes = state => state.dataTypes.attributes;
export const getDataTypeAttributesIdList = state => get(state.dataTypes.attributes, 'list');

export const getDataTypeList = createSelector(
  [getDataTypesMap, getDataTypesIdList],
  (dataTypesMap, idList) => idList.map(id => (dataTypesMap[id])),
);
