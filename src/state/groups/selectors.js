import { createSelector } from 'reselect';

export const getGroups = state => state.groups;
export const getGroupsIdList = state => state.groups.list;
export const getGroupsMap = state => state.groups.map;
export const getSelectedGroup = state => state.group;

export const getGroupsList = createSelector(
  [getGroupsMap, getGroupsIdList],
  (groupsMap, idList) => idList.map(id => (groupsMap[id])),
);
