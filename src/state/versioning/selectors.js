import { createSelector } from 'reselect';

export const getVersionings = state => state.versioning;
export const getVersioningsIdList = state => state.versioning.list;
export const getVersioningsMap = state => state.versioning.map;
export const getResourceVersioningsIdList = state => state.versioning.resourceList;
export const getResourceVersioningsMap = state => state.versioning.resourceMap;

export const getSelectedVersioningType = state => state.versioning.selected;
export const getDetailedContentVersion = state => state.versioning.contentVersionDetails;

export const getVersioningList = createSelector(
  [getVersioningsMap, getVersioningsIdList],
  (VersioningsMap, idList) => idList.map(id => (VersioningsMap[id])),
);

export const getResourceVersioningList = createSelector(
  [getResourceVersioningsMap, getResourceVersioningsIdList],
  (VersioningsMap, idList) => idList.map(id => (VersioningsMap[id])),
);
