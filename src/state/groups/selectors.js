import { createSelector } from 'reselect';
import { getLocale } from 'state/locale/selectors';

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
    refMap => (refMap.jacmsResourceManager || []),
  );

export const getSelectedGroupContentReferences =
    createSelector(
      getReferenceMap,
      refMap => (refMap.jacmsContentManager || []),
    );

export const getSelectedGroupUserReferences =
  createSelector(
    getReferenceMap,
    refMap => (refMap.UserManager || []),
  );

export const getSelectedGroupWidgetTypeReferences =
  createSelector(
    getReferenceMap,
    refMap => (refMap.WidgetTypeManager || []),
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
    refMap => (refMap.PageManager || []),
  );

export const getPageReferences =
  createSelector(
    getSelectedGroupPageReferences, getLocale,
    (pages, locale) => (pages ? pages.map(page => ({
      code: page.code,
      name: page.fullTitles[locale],
    })) : []),
  );
