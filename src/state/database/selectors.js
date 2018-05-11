import { createSelector } from 'reselect';

const getDatabaseList = state => state.database.list;
const getDatabaseMap = state => state.database.map;

export const getDatabaseInit = state => state.database.init;
export const getDatabaseStatusBackup = state => state.database.status;
export const getDatabaseReportBackup = state => state.database.report;

export const getDatabaseDumpList = createSelector(
  getDatabaseList, getDatabaseMap,
  (list, map) => list.map(id => (map[id])),
);
