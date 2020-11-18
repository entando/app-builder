import { createSelector } from 'reselect';
import { get, isEmpty, differenceWith } from 'lodash';

export const getProfileTypes = state => state.profileTypes;
export const getProfileTypesIdList = state => state.profileTypes.list;
export const getProfileTypesMap = state => state.profileTypes.map;
export const getSelectedProfileType = state => state.profileTypes.selected;
export const getProfileTypeAttributes = state => state.profileTypes.attributes;
export const getProfileTypeAttributesIdList = state => get(state.profileTypes.attributes, 'list');
export const getProfileTypeSelectedAttribute = state => state.profileTypes.attributes.selected;
export const getProfileTypeSelectedAttributeType = state =>
  state.profileTypes.attributes.selected.listAttribute;
export const getProfileTypeSelectedAttributeSearchable = state =>
  state.profileTypes.attributes.selected.searchableOptionSupported;
export const getProfileTypeSelectedAttributeIndexable = state =>
  state.profileTypes.attributes.selected.indexableOptionSupported;
export const getProfileTypeSelectedAttributeAllowedRoles = state =>
  state.profileTypes.attributes.selected.allowedRoles || [];
export const getProfileTypeSelectedAttributeAssignedRoles = state =>
  state.profileTypes.attributes.selected.assignedRoles || {};
export const getProfileTypeSelectedAttributeallowedDisablingCodes = state =>
  state.profileTypes.attributes.selected.allowedDisablingCodes;
export const getProfileTypeSelectedAttributeIsList = state => get(state.profileTypes.attributes.selected, 'listAttribute');
export const getSelectedProfileTypeAttributes = state => get(state.profileTypes.selected, 'attributes');
export const getSelectedAttributeType = state => get(state.profileTypes.selected, 'attributeSelected.type');
export const getSelectedAttributeNestedType = state => get(state.profileTypes.selected, 'attributeSelected.nestedAttribute.type');
export const getSelectedValidationRules = state => get(state.profileTypes.selected, 'attributeSelected.validationRules');
export const getProfileTypeSelectedAttributeCode = state => get(state.profileTypes.attributes.selected, 'code');

export const getProfileTypeSelectedAttributeRoleChoices = createSelector(
  [getProfileTypeSelectedAttributeAllowedRoles, getProfileTypeSelectedAttributeAssignedRoles],
  (allRoles, assignedRoles) => differenceWith(
    allRoles,
    Object.keys(assignedRoles),
    (roleInfo, roleCode) => roleInfo && roleCode && roleInfo.code === roleCode,
  ),
);

export const getProfileTypeList = createSelector(
  [getProfileTypesMap, getProfileTypesIdList],
  (profileTypesMap, idList) => idList.map(id => (profileTypesMap[id])),
);

export const getProfileTypesOptions = createSelector(
  [getProfileTypesIdList, getProfileTypesMap],
  (idList, profileTypesMap) => idList.map(id => ({
    value: profileTypesMap[id].code,
    text: profileTypesMap[id].name,
  })),
);

const getProfileTypeReferences = state => state.profileTypes.references;

export const getProfileTypeReferencesStatus = createSelector([getProfileTypeReferences], (ref) => {
  const { status } = ref;
  if (!isEmpty(status.toRefresh)) {
    return {
      type: 'warning', status: 'toRefresh', profileTypeCodes: status.toRefresh, count: status.toRefresh.length,
    };
  }
  return { type: 'success', status: 'ready', profileTypesCode: [] };
});
