import { createSelector } from 'reselect';
import { getLocale } from 'state/locale/selectors';

export const getGroups = state => state.groups;

export const getGroupsIdList = state => state.groups.list;

export const getGroupsMap = state => state.groups.map;

export const getSelectedGroup = state => state.groups.selected;

export const getGroupsTotal = state => state.groups.total;

export const getSelectedGroupPageReferences = state => state.groups.selected.pageReferences;

export const getPageReferences =
  createSelector(
    getSelectedGroupPageReferences, getLocale,
    (pages, locale) => (pages ? pages.map(page => ({
      code: page.code,
      name: page.fullTitles[locale],
    })) : []),
  );

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
