import { mockApi } from 'test/testUtils';
import {
  DATABASE_DUMP_REPORT_LIST,
  DATABASE_INIT_BACKUP,
} from 'test/mocks/database';

export const getDatabaseDumpReportList = jest.fn(mockApi({ payload: DATABASE_DUMP_REPORT_LIST }));
export const getDatabaseInitBackup = jest.fn(mockApi({ payload: DATABASE_INIT_BACKUP }));
export const deleteDatabaseBackup = jest.fn(mockApi({ payload: {} }));
export const postStartBackup = jest.fn(mockApi({ payload: { status: 1 } }));
export const getStatusBackup = jest.fn(mockApi({ payload: { status: 0 } }));
export const getDatabaseTableDump = jest.fn(mockApi({ payload: { base64: '' } }));
export const getReportBackup = jest.fn(mockApi({ payload: [] }));
