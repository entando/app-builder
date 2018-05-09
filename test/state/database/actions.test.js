import { isFSA } from 'flux-standard-action';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';

import { SET_PAGE } from 'state/pagination/types';
import { ADD_ERRORS } from 'state/errors/types';

import {
  DATABASE_DUMP_REPORT_LIST,
  DATABASE_INIT_BACKUP,
} from 'test/mocks/database';
import {
  getDatabaseInitBackup,
  getDatabaseDumpReportList,
  deleteDatabaseBackup,

} from 'api/database';
import {
  SET_DATABASE_DUMPS,
  SET_DATABASE_INIT_BACKUP,
} from 'state/database/types';
import {
  setDatabaseDumps,
  setDatabaseInitBackup,
  fetchDatabaseDumpReport,
  fetchDatabaseInitBackup,
  sendDeleteDatabaseBackup,
} from 'state/database/actions';

import { mockApi } from 'test/testUtils';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

let store;

const wrapErrorTest = done => (actionCall, apiCall) => (...args) => {
  apiCall.mockImplementationOnce(mockApi({ errors: true }));
  store.dispatch(actionCall(...args)).then(() => {
    expect(apiCall).toHaveBeenCalled();
    const actions = store.getActions();
    expect(actions).toHaveLength(1);
    expect(actions[0]).toHaveProperty('type', ADD_ERRORS);
    done();
  }).catch(done.fail);
};

describe('state/database/actions', () => {
  let action;
  beforeEach(() => {
    store = mockStore();
  });

  describe('actions', () => {
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
  });
  describe('thunk', () => {
    describe('fetchDatabaseInitBackup', () => {
      it('calls fetchDatabaseInitBackup and calls SET_DATABASE_INIT_BACKUP', (done) => {
        store.dispatch(fetchDatabaseInitBackup()).then(() => {
          expect(getDatabaseInitBackup).toHaveBeenCalled();
          const actions = store.getActions();
          expect(actions).toHaveLength(1);
          expect(actions[0].type).toEqual(SET_DATABASE_INIT_BACKUP);
          expect(actions[0].payload.init)
            .toEqual(expect.objectContaining(DATABASE_INIT_BACKUP));
          done();
        }).catch(done.fail);
      });

      it('if the response is not ok, dispatch add errors', (done) => {
        wrapErrorTest(done)(fetchDatabaseInitBackup, getDatabaseInitBackup)();
      });
    });

    describe('fetchDatabaseDumpReport', () => {
      it('calls getDatabaseDumpReportList and calls SET_DATABASE_DUMPS and setPage', (done) => {
        store.dispatch(fetchDatabaseDumpReport()).then(() => {
          expect(getDatabaseDumpReportList).toHaveBeenCalled();
          const actions = store.getActions();
          expect(actions).toHaveLength(2);
          expect(actions[0].type).toEqual(SET_DATABASE_DUMPS);
          expect(actions[0].payload.database)
            .toEqual(expect.objectContaining(DATABASE_DUMP_REPORT_LIST));
          expect(actions[1].type).toEqual(SET_PAGE);
          done();
        }).catch(done.fail);
      });
      it('if the response is not ok, dispatch add errors', (done) => {
        wrapErrorTest(done)(fetchDatabaseDumpReport, getDatabaseDumpReportList)();
      });
    });

    describe('sendDeleteDatabaseBackup', () => {
      it('calls sendDeleteDatabaseBackup and dispatch fetchDatabaseDumpReport', (done) => {
        store.dispatch(sendDeleteDatabaseBackup('develop')).then(() => {
          expect(deleteDatabaseBackup).toHaveBeenCalled();
          store.dispatch(fetchDatabaseDumpReport()).then(() => {
            // const actions = store.getActions();
            // console.log(actions);
            done();
          }).catch(done.fail);
          done();
        }).catch(done.fail);
      });

      it('if the response is not ok, dispatch add errors', (done) => {
        wrapErrorTest(done)(sendDeleteDatabaseBackup, deleteDatabaseBackup)('develop');
      });
    });
  });
});
