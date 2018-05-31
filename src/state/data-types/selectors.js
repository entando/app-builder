import { createSelector } from 'reselect';
import { get, isEmpty } from 'lodash';

export const getDataTypes = state => state.dataTypes;
export const getDataTypesIdList = state => state.dataTypes.list;
export const getDataTypesMap = state => state.dataTypes.map;
export const getSelectedDataType = state => state.dataTypes.selected;
export const getDataTypeAttributes = state => state.dataTypes.attributes;
const getDataTypeReferences = state => state.dataTypes.references;
export const getDataTypeAttributesIdList = state => get(state.dataTypes.attributes, 'list');
export const getDataTypeSelectedAttribute = state => state.dataTypes.attributes.selected;
export const getDataTypeSelectedAttributeType = state =>
  state.dataTypes.attributes.selected.listAttribute;
export const getDataTypeSelectedAttributeSearchable = state =>
  state.dataTypes.attributes.selected.searchableOptionSupported;
export const getDataTypeSelectedAttributeIndexable = state =>
  state.dataTypes.attributes.selected.indexableOptionSupported;
export const getDataTypeSelectedAttributeAllowedRoles = state =>
  state.dataTypes.attributes.selected.allowedRoles;
export const getDataTypeSelectedAttributeallowedDisablingCodes = state =>
  state.dataTypes.attributes.selected.allowedDisablingCodes;
export const getDataTypeSelectedAttributeIsList = state => get(state.dataTypes.attributes.selected, 'listAttribute');
export const getSelectedDataTypeAttributes = state => get(state.dataTypes.selected, 'attributes');
export const getSelectedAttributeType = state => get(state.dataTypes.selected, 'attributeSelected.type');
export const getSelectedAttributeNestedType = state => get(state.dataTypes.selected, 'attributeSelected.nestedAttribute.type');
export const getSelectedValidationRules = state => get(state.dataTypes.selected, 'attributeSelected.validationRules');
export const getDataTypeSelectedAttributeCode = state => get(state.dataTypes.attributes.selected, 'code');

export const getDataTypeList = createSelector(
  [getDataTypesMap, getDataTypesIdList],
  (dataTypesMap, idList) => idList.map(id => (dataTypesMap[id])),
);

export const getDataTypeReferencesStatus = createSelector([getDataTypeReferences], (ref) => {
  const { status } = ref;
  if (!isEmpty(status.toRefresh)) {
    return {
      type: 'warning', status: 'toRefresh', dataTypesCodes: status.toRefresh, count: status.toRefresh.length,
    };
  }
  return { type: 'success', status: 'ready', dataTypesCode: [] };
});
