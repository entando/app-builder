import { isFSA } from 'flux-standard-action';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import { ADD_ERRORS, ADD_TOAST } from '@entando/messages';

import { TOGGLE_LOADING } from 'state/loading/types';

import {
  DATABASE_DUMP_REPORT_LIST,
  DATABASE_INIT_BACKUP,
} from 'test/mocks/database';
import {
  getDatabaseInitBackup,
  getDatabaseDumpReportList,
  deleteDatabaseBackup,
  postStartBackup,
  getReportBackup,
  getDatabaseTableDump,
} from 'api/database';
import {
  SET_DATABASE_DUMPS,
  SET_DATABASE_INIT_BACKUP,
  SET_DATABASE_STATUS_BACKUP,
  SET_DATABASE_REPORT_BACKUP,
  SET_DATABASE_DUMP_TABLE,
  SET_DATABASE_DUMP_TABLE_DATA,
} from 'state/database/types';
import {
  setStatusBackup,
  setDatabaseDumps,
  setDatabaseInitBackup,
  setReportBackup,
  setDumpTable,
  setDumpTableData,
  fetchDatabaseDumpReport,
  fetchDatabaseInitBackup,
  sendDeleteDatabaseBackup,
  sendPostDatabaseStartBackup,
  fetchDatabaseReportBackup,
  fetchDatabaseDumpTable,

} from 'state/database/actions';

import { history, ROUTE_DATABASE_LIST } from 'app-init/router';

import { mockApi } from 'test/testUtils';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

jest.mock('state/database/selectors', () => ({
  getDatabaseStatusBackup: jest.fn(),
  getDatabaseReportBackupCode: jest.fn(),
  getDataSourceDump: jest.fn(),
  getTableDump: jest.fn(),
}));

jest.mock('app-init/router', () => ({
  history: {
    push: jest.fn(),
  },
}));

let store;

const wrapErrorTest = done => (actionCall, apiCall) => (...args) => {
  apiCall.mockImplementationOnce(mockApi({ errors: true }));
  store.dispatch(actionCall(...args)).then(() => {
    expect(apiCall).toHaveBeenCalled();
    const actions = store.getActions();
    expect(actions).toHaveLength(2);
    expect(actions[0]).toHaveProperty('type', ADD_ERRORS);
    expect(actions[1]).toHaveProperty('type', ADD_TOAST);
    done();
  }).catch(done.fail);
};

const DB_DUMP_CODE = 'dumpCode';

describe('state/database/actions', () => {
  let action;
  beforeEach(() => {
    store = mockStore();
  });

  describe('actions', () => {
    describe('setStatusBackup', () => {
      beforeEach(() => {
        action = setStatusBackup(0);
      });
      it('is FSA compliant', () => {
        expect(isFSA(action)).toBe(true);
      });

      it('actions is correct setup ', () => {
        expect(action).toHaveProperty('type', SET_DATABASE_STATUS_BACKUP);
        expect(action).toHaveProperty('payload.status', 0);
      });
    });

    describe('setDatabaseInitBackup', () => {
      beforeEach(() => {
        action = setDatabaseInitBackup(DATABASE_INIT_BACKUP);
      });
      it('is FSA compliant', () => {
        expect(isFSA(action)).toBe(true);
      });

      it('actions is correct setup ', () => {
        expect(action).toHaveProperty('type', SET_DATABASE_INIT_BACKUP);
        expect(action).toHaveProperty('payload.init', DATABASE_INIT_BACKUP);
      });
    });

    describe('setDatabaseDumps', () => {
      beforeEach(() => {
        action = setDatabaseDumps(DATABASE_DUMP_REPORT_LIST);
      });
      it('is FSA compliant', () => {
        expect(isFSA(action)).toBe(true);
      });

      it('actions is correct setup ', () => {
        expect(action).toHaveProperty('type', SET_DATABASE_DUMPS);
        expect(action).toHaveProperty('payload.database', DATABASE_DUMP_REPORT_LIST);
      });
    });

    describe('setReportBackup', () => {
      beforeEach(() => {
        action = setReportBackup({});
      });
      it('is FSA compliant', () => {
        expect(isFSA(action)).toBe(true);
      });

      it('actions is correct setup ', () => {
        expect(action).toHaveProperty('type', SET_DATABASE_REPORT_BACKUP);
        expect(action).toHaveProperty('payload.report', {});
      });
    });

    describe('setDumpTableData', () => {
      beforeEach(() => {
        action = setDumpTableData([]);
      });
      it('is FSA compliant', () => {
        expect(isFSA(action)).toBe(true);
      });

      it('actions is correct setup ', () => {
        expect(action).toHaveProperty('type', SET_DATABASE_DUMP_TABLE_DATA);
        expect(action).toHaveProperty('payload.data');
      });
    });

    describe('setDumpTable', () => {
      beforeEach(() => {
        action = setDumpTable([]);
      });
      it('is FSA compliant', () => {
        expect(isFSA(action)).toBe(true);
      });

      it('actions is correct setup ', () => {
        expect(action).toHaveProperty('type', SET_DATABASE_DUMP_TABLE);
        expect(action).toHaveProperty('payload.dump');
      });
    });
  });
  describe('thunk', () => {
    describe('fetchDatabaseDumpTable', () => {
      it('calls fetchDatabaseDumpTable and calls SET_DATABASE_DUMP_TABLE_DATA', (done) => {
        store.dispatch(fetchDatabaseDumpTable(DB_DUMP_CODE, 'datasource', 'tableName')).then(() => {
          expect(getDatabaseTableDump).toHaveBeenCalledWith(DB_DUMP_CODE, 'datasource', 'tableName');
          const actions = store.getActions();
          expect(actions).toHaveLength(1);
          expect(actions[0]).toHaveProperty('type', SET_DATABASE_DUMP_TABLE_DATA);
          done();
        }).catch(done.fail);
      });

      it('if the response is not ok, dispatch add errors', (done) => {
        wrapErrorTest(done)(fetchDatabaseDumpTable, getDatabaseTableDump)(DB_DUMP_CODE, 'datasource', 'tableName');
      });
    });

    describe('fetchDatabaseReportBackup', () => {
      it('calls fetchDatabaseReportBackup and calls SET_DATABASE_REPORT_BACKUP', (done) => {
        store.dispatch(fetchDatabaseReportBackup(DB_DUMP_CODE)).then(() => {
          expect(getReportBackup).toHaveBeenCalledWith(DB_DUMP_CODE);
          const actions = store.getActions();
          expect(actions).toHaveLength(3);
          expect(actions[0]).toHaveProperty('type', TOGGLE_LOADING);
          expect(actions[1]).toHaveProperty('type', SET_DATABASE_REPORT_BACKUP);
          expect(actions[2]).toHaveProperty('type', TOGGLE_LOADING);
          done();
        }).catch(done.fail);
      });

      it('if the response is not ok, dispatch add errors', (done) => {
        getReportBackup.mockImplementationOnce(mockApi({ errors: true }));
        store.dispatch(fetchDatabaseReportBackup(DB_DUMP_CODE)).then(() => {
          expect(getReportBackup).toHaveBeenCalled();
          const actions = store.getActions();
          expect(actions).toHaveLength(4);
          expect(actions[0]).toHaveProperty('type', TOGGLE_LOADING);
          expect(actions[1]).toHaveProperty('type', ADD_ERRORS);
          expect(actions[2]).toHaveProperty('type', ADD_TOAST);
          expect(actions[3]).toHaveProperty('type', TOGGLE_LOADING);
          done();
        }).catch(done.fail);
      });
    });

    describe('fetchDatabaseInitBackup', () => {
      it('calls fetchDatabaseInitBackup and calls SET_DATABASE_INIT_BACKUP', (done) => {
        store.dispatch(fetchDatabaseInitBackup()).then(() => {
          expect(getDatabaseInitBackup).toHaveBeenCalled();
          const actions = store.getActions();
          expect(actions).toHaveLength(1);
          expect(actions[0]).toHaveProperty('type', SET_DATABASE_INIT_BACKUP);
          expect(actions[0]).toHaveProperty('payload.init', expect.objectContaining(DATABASE_INIT_BACKUP));
          done();
        }).catch(done.fail);
      });

      it('if the response is not ok, dispatch add errors', (done) => {
        wrapErrorTest(done)(fetchDatabaseInitBackup, getDatabaseInitBackup)();
      });
    });

    describe('fetchDatabaseDumpReport', () => {
      it('calls getDatabaseDumpReportList and calls SET_DATABASE_DUMPS and setPage', (done) => {
        jest.useFakeTimers();
        // const intervallStatusBackup = jest.fn(mockApi({ payload: [] }));
        store.dispatch(fetchDatabaseDumpReport()).then(() => {
          expect(getDatabaseDumpReportList).toHaveBeenCalled();
          const actions = store.getActions();
          jest.runTimersToTime(500);
          expect(actions).toHaveLength(2);
          // expect(intervallStatusBackup).toHaveBeenCalled();
          expect(actions[0]).toHaveProperty('type', TOGGLE_LOADING);
          expect(actions[1]).toHaveProperty('type', TOGGLE_LOADING);
          jest.clearAllTimers();
          done();
        }).catch(done.fail);
      });

      it('if the response is not ok, dispatch add errors', (done) => {
        getDatabaseDumpReportList.mockImplementationOnce(mockApi({ errors: true }));
        store.dispatch(fetchDatabaseDumpReport()).then(() => {
          expect(getDatabaseDumpReportList).toHaveBeenCalled();
          const actions = store.getActions();
          expect(actions).toHaveLength(4);
          expect(actions[0]).toHaveProperty('type', TOGGLE_LOADING);
          expect(actions[1]).toHaveProperty('type', ADD_ERRORS);
          expect(actions[2]).toHaveProperty('type', ADD_TOAST);
          expect(actions[3]).toHaveProperty('type', TOGGLE_LOADING);
          done();
        }).catch(done.fail);
      });
    });

    describe('sendDeleteDatabaseBackup', () => {
      it('calls sendDeleteDatabaseBackup and dispatch fetchDatabaseDumpReport', (done) => {
        store.dispatch(sendDeleteDatabaseBackup('develop')).then(() => {
          expect(deleteDatabaseBackup).toHaveBeenCalled();
          done();
        }).catch(done.fail);
      });

      it('if the response is not ok, dispatch add errors', (done) => {
        wrapErrorTest(done)(sendDeleteDatabaseBackup, deleteDatabaseBackup)('develop');
      });
    });

    describe('sendPostDatabaseStartBackup', () => {
      it('calls sendPostDatabaseStartBackup and navigates to database list', (done) => {
        store.dispatch(sendPostDatabaseStartBackup()).then(() => {
          expect(postStartBackup).toHaveBeenCalled();
          expect(history.push).toHaveBeenCalledWith(ROUTE_DATABASE_LIST);
          done();
        }).catch(done.fail);
      });

      it('if the response is not ok, dispatch add errors', (done) => {
        wrapErrorTest(done)(sendPostDatabaseStartBackup, postStartBackup)();
      });
    });
  });
});
