import { createSelector } from 'reselect';
import { get, isEmpty, difference, xor, union, isUndefined } from 'lodash';
import {
  TYPE_MONOLIST,
  TYPE_LIST,
  TYPE_COMPOSITE,
  TYPE_HYPERTEXT,
  TYPE_LONGTEXT,
  TYPE_TEXT,
  TYPE_ATTACH,
  TYPE_LINK,
  TYPE_IMAGE,
} from 'state/profile-types/const';

const NO_ATTRIBUTE_FOR_TYPE_LIST = [
  TYPE_ATTACH,
  TYPE_LINK,
  TYPE_IMAGE,
  TYPE_TEXT,
  TYPE_LONGTEXT,
  TYPE_HYPERTEXT,
  TYPE_MONOLIST,
  TYPE_LIST,
  TYPE_COMPOSITE,
];

const NO_ATTRIBUTE_FOR_TYPE_MONOLIST = [TYPE_LIST, TYPE_MONOLIST];

export const getProfileTypes = state => state.profileTypes;
export const getProfileTypesIdList = state => state.profileTypes.list;
export const getProfileTypesMap = state => state.profileTypes.map;
export const getSelectedProfileType = state => state.profileTypes.selected;
export const getProfileTypeAttributes = state => state.profileTypes.attributes;
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
export const getSelectedAttribute = state => get(state.profileTypes.selected, 'attributeSelected');
export const getSelectedAttributeType = state => get(state.profileTypes.selected, 'attributeSelected.type');
export const getSelectedAttributeNestedType = state => get(state.profileTypes.selected, 'attributeSelected.nestedAttribute.type');
export const getSelectedValidationRules = state => get(state.profileTypes.selected, 'attributeSelected.validationRules');
export const getProfileTypeSelectedAttributeCode = state => get(state.profileTypes.attributes.selected, 'code');

export const getProfileTypeSelectedAttributeAllowedRoleCodeList = createSelector(
  getProfileTypeSelectedAttributeAllowedRoles,
  allRoles => allRoles.map(role => role.code),
);

const getList = (type, list) => {
  switch (type) {
    case TYPE_LIST:
      return list.filter(f => !NO_ATTRIBUTE_FOR_TYPE_LIST.includes(f));
    case TYPE_MONOLIST:
    case TYPE_COMPOSITE:
      return list.filter(f => !NO_ATTRIBUTE_FOR_TYPE_MONOLIST.includes(f));
    default:
      return list;
  }
};

export const getProfileTypeAttributesIdList = createSelector(
  [getProfileTypeAttributes, getSelectedAttributeType],
  (attributes, attributeSelectedType) => {
    const {
      list,
      selected: { code },
    } = attributes;
    if (isUndefined(attributeSelectedType)) {
      return getList(code, list);
    }
    return getList(attributeSelectedType, list);
  },
);

export const getProfileTypeSelectedAttributeAssignedRolesList = attributeCode => (
  createSelector(
    [getProfileTypeSelectedAttributeAssignedRoles],
    assignedRoles => Object.keys(assignedRoles)
      .filter(roleCode => assignedRoles[roleCode] === attributeCode),
  )
);

export const getProfileTypeSelectedAttributeUnownedRoles = createSelector(
  [
    getProfileTypeSelectedAttributeAllowedRoleCodeList,
    getProfileTypeSelectedAttributeAssignedRoles,
  ],
  (allRoles, assignedRoles) => difference(
    allRoles,
    Object.keys(assignedRoles),
  ),
);

export const getProfileTypeSelectedAttributeDeletedValues = (
  attributeCode,
  roleValues,
) => createSelector(
  getProfileTypeSelectedAttributeAssignedRolesList(attributeCode),
  allRoles => xor(allRoles, roleValues),
);

export const getProfileTypeSelectedAttributeRoleChoices = (
  attributeCode,
  roleValues,
) => createSelector(
  [
    getProfileTypeSelectedAttributeAllowedRoles,
    getProfileTypeSelectedAttributeUnownedRoles,
    getProfileTypeSelectedAttributeDeletedValues(attributeCode, roleValues),
  ],
  (allRoles, noOwnerRoles, deletedRoles) => {
    const roleChoices = union(noOwnerRoles, deletedRoles);
    return allRoles.filter(roleInfo => roleChoices.includes(roleInfo.code));
  },
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
