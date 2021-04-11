import { createSelector } from 'reselect';
import { getLocale } from 'state/locale/selectors';
import { ROLE_SUPERUSER } from 'state/permissions/const';
import {
  USER_REFERENCE_KEY,
  CONTENT_REFERENCE_KEY,
  RESOURCE_REFERENCE_KEY,
  WIDGET_TYPE_REFERENCE_KEY,
  PAGE_REFERENCE_KEY,
} from 'ui/common/references/const';
import { FREE_ACCESS_GROUP } from './const';

export const getGroups = state => state.groups;

export const getGroupsIdList =
  createSelector(
    getGroups,
    groups => (groups.list || []),
  );

export const getGroupsMap =
  createSelector(
    getGroups,
    groups => (groups.map || {}),
  );

export const getGroupsTotal =
  createSelector(
    getGroups,
    groups => (groups.total || 0),
  );

export const getSelectedGroup =
  createSelector(
    getGroups,
    groups => (groups.selected || {}),
  );

export const getGroupsList = createSelector(
  [getGroupsMap, getGroupsIdList],
  (groupsMap, idList) => idList.map(id => (groupsMap[id])),
);

export const getSelectedRefs =
  createSelector(
    getSelectedGroup,
    selected => (selected.references || {}),
  );

export const getReferenceKeyList =
  createSelector(
    getSelectedGroup,
    selected => (selected.referenceKeyList || []),
  );

export const getReferenceMap =
  createSelector(
    getSelectedGroup,
    selected => (selected.referenceMap || {}),
  );

export const getSelectedGroupResourceReferences =
  createSelector(
    getReferenceMap,
    refMap => (refMap[RESOURCE_REFERENCE_KEY] || []),
  );

export const getSelectedGroupContentReferences =
    createSelector(
      getReferenceMap,
      refMap => (refMap[CONTENT_REFERENCE_KEY] || []),
    );

export const getSelectedGroupUserReferences =
  createSelector(
    getReferenceMap,
    refMap => (refMap[USER_REFERENCE_KEY] || []),
  );

export const getSelectedGroupWidgetTypeReferences =
  createSelector(
    getReferenceMap,
    refMap => (refMap[WIDGET_TYPE_REFERENCE_KEY] || []),
  );

export const getWidgetTypeReferences =
    createSelector(
      getSelectedGroupWidgetTypeReferences, getLocale,
      (widgets, locale) => (widgets ? widgets.map(widget => ({
        code: widget.code,
        title: widget.titles[locale],
      })) : []),
    );

export const getSelectedGroupPageReferences =
  createSelector(
    getReferenceMap,
    refMap => (refMap[PAGE_REFERENCE_KEY] || []),
  );

export const getPageReferences =
  createSelector(
    getSelectedGroupPageReferences, getLocale,
    (pages, locale) => (pages ? pages.map(page => ({
      code: page.code,
      name: page.fullTitles[locale],
    })) : []),
  );

export const getCurrentUserGroups = createSelector(
  getGroups,
  groups => groups.currentUserGroups,
);

export const currentUserGroupsPermissionsFilter = permissions =>
  createSelector(
    getCurrentUserGroups,
    getGroupsList,
    (currentUserGroups, allGroups) => {
      const isAdmin = currentUserGroups.some(group => group.permissions
        && group.permissions.includes(ROLE_SUPERUSER));
      if (isAdmin) {
        return allGroups;
      }
      return currentUserGroups.filter(group => (
        group.code === FREE_ACCESS_GROUP.code
        || group.permissions.includes(ROLE_SUPERUSER)
        || permissions.every(permission => group.permissions.includes(permission))
      ));
    },
  );
