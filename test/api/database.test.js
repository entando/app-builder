import 'test/enzyme-init';
import { getDatabaseDumpReportList } from 'api/database';
import { makeRequest, METHODS } from '@entando/apimanager';
import { DATABASE_DUMP_REPORT_LIST } from 'test/mocks/database';

jest.unmock('api/database');
jest.mock('@entando/apimanager', () => ({
  makeRequest: jest.fn(() => new Promise(resolve => resolve({}))),
  METHODS: require.requireActual('@entando/apimanager').METHODS,
}));

describe('api/database', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  describe('getDatabaseDumpReportList', () => {
    it('return a promise ', () => {
      expect(getDatabaseDumpReportList()).toBeInstanceOf(Promise);
    });

    it('makes the correct request', () => {
      getDatabaseDumpReportList({ page: 1, pageSize: 10 }, '?param=true');
      expect(makeRequest).toHaveBeenCalledWith({
        uri: '/api/database?param=true',
        method: METHODS.GET,
        mockResponse: DATABASE_DUMP_REPORT_LIST,
        useAuthentication: true,
      }, {
        page: 1,
        pageSize: 10,
      });
    });
  });
});
