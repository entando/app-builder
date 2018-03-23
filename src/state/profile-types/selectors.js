import { createSelector } from 'reselect';

export const getProfileTypes = state => state.profileTypes;
export const getProfileTypesIdList = state => state.profileTypes.list;
export const getProfileTypesMap = state => state.profileTypes.map;

export const getProfileTypesList = createSelector(
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
