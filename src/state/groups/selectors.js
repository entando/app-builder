import { createSelector } from 'reselect';

export const getGroups = state => state.groups;

export const getGroupsIdList = state => state.groups.list;

export const getGroupsMap = state => state.groups.map;

export const getSelectedGroup = state => state.groups.selected;

export const getSelectedGroupPageReferences =

  createSelector(getSelectedGroup, s => s.pageReferences);
export const getSelectedGroupUserReferences = state => state.groups.selected.userReferences;

export const getSelectedGroupWidgetTypeReferences = state =>

  state.groups.selected.widgetTypeReferences;
export const getSelectedGroupContentReferences = state => state.groups.selected.contentReferences;

export const getSelectedGroupResourceReferences = state =>
  state.groups.selected.resourceReferences;

export const getGroupsList = createSelector(
  [getGroupsMap, getGroupsIdList],
  (groupsMap, idList) => idList.map(id => (groupsMap[id])),
);
