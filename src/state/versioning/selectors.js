import { createSelector } from 'reselect';

export const getVersionings = state => state.apps.cms.versioning;
export const getVersioningsIdList = state => state.apps.cms.versioning.list;
export const getVersioningsMap = state => state.apps.cms.versioning.map;
export const getResourceVersioningsIdList = state => state.apps.cms.versioning.resourceList;
export const getResourceVersioningsMap = state => state.apps.cms.versioning.resourceMap;

export const getSelectedVersioningType = state => state.apps.cms.versioning.selected;
export const getDetailedContentVersion = state => state.apps.cms.versioning.contentVersionDetails;

export const getVersioningList = createSelector(
  [getVersioningsMap, getVersioningsIdList],
  (VersioningsMap, idList) => idList.map(id => (VersioningsMap[id])),
);

export const getResourceVersioningList = createSelector(
  [getResourceVersioningsMap, getResourceVersioningsIdList],
  (VersioningsMap, idList) => idList.map(id => (VersioningsMap[id])),
);
