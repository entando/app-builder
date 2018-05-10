import { createSelector } from 'reselect';

const getDatabaseList = state => state.database.list;
const getDatabaseMap = state => state.database.map;

export const getDatabaseInit = state => state.database.init;
// eslint-disable-next-line
export const getDatabaseDumpList = createSelector(
  getDatabaseList, getDatabaseMap,
  (list, map) => list.map(id => (map[id])),
);
