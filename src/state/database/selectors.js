import { createSelector } from 'reselect';

const getDatabaseRoot = state => state.database;
const getDatabaseList = createSelector(getDatabaseRoot, db => db.list);
const getDatabaseMap = createSelector(getDatabaseRoot, db => db.map);

export const getDatabaseInit = createSelector(getDatabaseRoot, db => db.init);
export const getDatabaseStatusBackup = createSelector(getDatabaseRoot, db => db.status);
export const getDatabaseReportBackup = createSelector(getDatabaseRoot, db => db.report);
export const getDatabaseReportBackupCode = createSelector(getDatabaseRoot, db => db.report.code);
export const getDataSourceDump = createSelector(getDatabaseRoot, db => db.dump.datasource);
export const getTableDump = createSelector(getDatabaseRoot, db => db.dump.tableName);
export const getTableDumpData = createSelector(getDatabaseRoot, db => db.dump.data);

export const getDatabaseDumpList = createSelector(
  getDatabaseList, getDatabaseMap,
  (list, map) => list.map(id => (map[id])),
);
