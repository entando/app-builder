import { makeRequest, METHODS } from '@entando/apimanager';
import { DATABASE_DUMP_REPORT_LIST, DATABASE_INIT_BACKUP } from 'test/mocks/database';

export const getDatabaseDumpReportList = page => (
  makeRequest(
    {
      uri: '/api/database',
      method: METHODS.GET,
      mockResponse: DATABASE_DUMP_REPORT_LIST,
      useAuthentication: true,
    },
    page,
  )
);

export const getDatabaseInitBackup = () => (
  makeRequest({
    uri: '/api/database/initBackup',
    method: METHODS.GET,
    mockResponse: DATABASE_INIT_BACKUP,
    useAuthentication: true,
  })
);
