import { createSelector } from 'reselect';


export const getLabels = state => state.labels;
export const getLabelsMap = state => state.labels.map;
export const getLabelsIdList = state => state.labels.list;
export const getLabelFilters = state => state.labels.filters;

export const getActiveTab = createSelector(
  getLabels,
  labels => (labels.activeTab),
);

export const getLabelsList = createSelector(
  [getLabelsMap, getLabelsIdList],
  (map, idList) => idList.map(id => (map[id])),
);
