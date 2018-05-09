import { createSelector } from 'reselect';

const getDatabaseList = state => state.database.list;
const getDatabaseMap = state => state.database.map;

// eslint-disable-next-line
export const getDatabaseDumpList = createSelector(
  getDatabaseList, getDatabaseMap,
  (list, map) => list.map(id => (map[id])),
);
