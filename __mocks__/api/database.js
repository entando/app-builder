import { mockApi } from 'test/testUtils';
import { DATABASE_DUMP_REPORT_LIST } from 'test/mocks/database';

// eslint-disable-next-line import/prefer-default-export
export const getDatabaseDumpReportList = jest.fn(mockApi({ payload: DATABASE_DUMP_REPORT_LIST }));
