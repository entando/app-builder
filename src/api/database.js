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

export const deleteDatabaseBackup = code => (
  makeRequest({
    uri: `/api/database/report/${code}`,
    method: METHODS.DELETE,
    mockResponse: { code },
    useAuthentication: true,
  })
);

export const postStartBackup = () => (
  makeRequest({
    uri: '/api/database/startBackup',
    method: METHODS.POST,
    body: {},
    mockResponse: { status: 1 },
    useAuthentication: true,
  })
);

export const getStatusBackup = () => (
  makeRequest({
    uri: '/api/database/status',
    method: METHODS.GET,
    mockResponse: { status: 0 },
    useAuthentication: true,
  })
);

export const getReportBackup = dumpCode => (
  makeRequest({
    uri: `/api/database/report/${dumpCode}`,
    method: METHODS.GET,
    mockResponse: [],
    useAuthentication: true,
  })
);

export const getDatabaseTableDump = (dumpCode, datasource, tableName) => (
  makeRequest({
    uri: `/api/database/report/${dumpCode}/dump/${datasource}/${tableName}`,
    method: METHODS.GET,
    mockResponse: { base64: '' },
    useAuthentication: true,
  })
);
