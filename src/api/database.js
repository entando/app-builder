import { makeRequest, METHODS } from '@entando/apimanager';
import { DATABASE_DUMP_REPORT_LIST } from 'test/mocks/database';
// eslint-disable-next-line
export const getDatabaseDumpReportList = (page, params) => (
  makeRequest(
    {
      uri: `/api/database${params}`,
      method: METHODS.GET,
      mockResponse: DATABASE_DUMP_REPORT_LIST,
      useAuthentication: true,
    },
    page,
  )
);
