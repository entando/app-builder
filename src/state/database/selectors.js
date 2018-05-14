import { createSelector } from 'reselect';

const getDatabaseList = state => state.database.list;
const getDatabaseMap = state => state.database.map;

export const getDatabaseInit = state => state.database.init;
export const getDatabaseStatusBackup = state => state.database.status;
export const getDatabaseReportBackup = state => state.database.report;
export const getDatabaseReportBackupCode = state => state.database.report.code;
export const getDataSourceDump = state => state.database.dump.datasource;
export const getTableDump = state => state.database.dump.tableName;
export const getTableDumpData = state => state.database.dump.data;

export const getDatabaseDumpList = createSelector(
  getDatabaseList, getDatabaseMap,
  (list, map) => list.map(id => (map[id])),
);
