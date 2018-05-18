import 'test/enzyme-init';
import {
  getDatabaseDumpReportList,
  getDatabaseInitBackup,
  deleteDatabaseBackup,
  postStartBackup,
  getStatusBackup,
  getReportBackup,
  getDatabaseTableDump,
} from 'api/database';
import { makeRequest, METHODS } from '@entando/apimanager';
import { DATABASE_DUMP_REPORT_LIST, DATABASE_INIT_BACKUP } from 'test/mocks/database';

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
      getDatabaseDumpReportList({ page: 1, pageSize: 10 });
      expect(makeRequest).toHaveBeenCalledWith({
        uri: '/api/database',
        method: METHODS.GET,
        mockResponse: DATABASE_DUMP_REPORT_LIST,
        useAuthentication: true,
      }, {
        page: 1,
        pageSize: 10,
      });
    });
  });

  describe('getDatabaseInitBackup', () => {
    it('return a promise ', () => {
      expect(getDatabaseInitBackup()).toBeInstanceOf(Promise);
    });

    it('makes the correct request', () => {
      getDatabaseInitBackup();
      expect(makeRequest).toHaveBeenCalledWith({
        uri: '/api/database/initBackup',
        method: METHODS.GET,
        mockResponse: DATABASE_INIT_BACKUP,
        useAuthentication: true,
      });
    });
  });
  describe('deleteDatabaseBackup', () => {
    it('return a promise ', () => {
      expect(deleteDatabaseBackup('develop')).toBeInstanceOf(Promise);
    });

    it('makes the correct request', () => {
      deleteDatabaseBackup('develop');
      expect(makeRequest).toHaveBeenCalledWith({
        uri: '/api/database/report/develop',
        method: METHODS.DELETE,
        mockResponse: { code: 'develop' },
        useAuthentication: true,
      });
    });
  });
  describe('postStartBackup', () => {
    it('return a promise ', () => {
      expect(postStartBackup()).toBeInstanceOf(Promise);
    });

    it('makes the correct request', () => {
      postStartBackup();
      expect(makeRequest).toHaveBeenCalledWith({
        uri: '/api/database/startBackup',
        method: METHODS.POST,
        body: {},
        mockResponse: { status: 1 },
        useAuthentication: true,
      });
    });
  });
  describe('getStatusBackup', () => {
    it('return a promise ', () => {
      expect(getStatusBackup()).toBeInstanceOf(Promise);
    });

    it('makes the correct request', () => {
      getStatusBackup();
      expect(makeRequest).toHaveBeenCalledWith({
        uri: '/api/database/status',
        method: METHODS.GET,
        mockResponse: { status: 0 },
        useAuthentication: true,
      });
    });
  });

  describe('getReportBackup', () => {
    it('return a promise ', () => {
      expect(getReportBackup()).toBeInstanceOf(Promise);
    });

    it('makes the correct request', () => {
      getReportBackup('code');
      expect(makeRequest).toHaveBeenCalledWith({
        uri: '/api/database/report/code',
        method: METHODS.GET,
        mockResponse: [],
        useAuthentication: true,
      });
    });
  });

  describe('getDatabaseTableDump', () => {
    it('return a promise ', () => {
      expect(getDatabaseTableDump()).toBeInstanceOf(Promise);
    });

    it('makes the correct request', () => {
      getDatabaseTableDump('code', 'servDataSource', 'sysconfig');
      expect(makeRequest).toHaveBeenCalledWith({
        uri: '/api/database/report/code/dump/servDataSource/sysconfig',
        method: METHODS.GET,
        mockResponse: { base64: '' },
        useAuthentication: true,
      });
    });
  });
});
