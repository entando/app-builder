import { isFSA } from 'flux-standard-action';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import { gotoRoute } from '@entando/router';

import { SET_PAGE } from 'state/pagination/types';
import { ADD_ERRORS } from 'state/errors/types';
import { TOGGLE_LOADING } from 'state/loading/types';
import { getDatabaseStatusBackup } from 'state/database/selectors';

import {
  DATABASE_DUMP_REPORT_LIST,
  DATABASE_INIT_BACKUP,
} from 'test/mocks/database';
import {
  getDatabaseInitBackup,
  getDatabaseDumpReportList,
  deleteDatabaseBackup,
  postStartBackup,
  getStatusBackup,
} from 'api/database';
import {
  SET_DATABASE_DUMPS,
  SET_DATABASE_INIT_BACKUP,
  SET_DATABASE_STATUS_BACKUP,
} from 'state/database/types';
import {
  setStatusBackup,
  setDatabaseDumps,
  setDatabaseInitBackup,
  fetchDatabaseDumpReport,
  fetchDatabaseInitBackup,
  sendDeleteDatabaseBackup,
  sendPostDatabaseStartBackup,
  fetchDatabaseStatusBackup,
} from 'state/database/actions';

import { ROUTE_DATABASE_LIST } from 'app-init/router';

import { mockApi } from 'test/testUtils';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

jest.mock('state/database/selectors', () => ({
  getDatabaseStatusBackup: jest.fn(),
}));

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
  });
  describe('thunk', () => {
    describe('fetchDatabaseStatusBackup', () => {
      it('calls fetchDatabaseStatusBackup and calls SET_DATABASE_STATUS_BACKUP', (done) => {
        store.dispatch(fetchDatabaseStatusBackup()).then(() => {
          expect(getStatusBackup).toHaveBeenCalled();
          const actions = store.getActions();
          expect(actions).toHaveLength(1);
          expect(actions[0]).toHaveProperty('type', SET_DATABASE_STATUS_BACKUP);
          done();
        }).catch(done.fail);
      });

      it('if the response is not ok, dispatch add errors', (done) => {
        wrapErrorTest(done)(fetchDatabaseStatusBackup, getStatusBackup)();
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
        getDatabaseStatusBackup.mockReturnValue(0);
        store.dispatch(fetchDatabaseDumpReport()).then(() => {
          expect(getDatabaseDumpReportList).toHaveBeenCalled();
          const actions = store.getActions();
          expect(actions).toHaveLength(4);
          expect(actions[0]).toHaveProperty('type', TOGGLE_LOADING);
          expect(actions[1]).toHaveProperty('type', SET_DATABASE_DUMPS);
          expect(actions[1]).toHaveProperty(
            'payload.database',
            expect.objectContaining(DATABASE_DUMP_REPORT_LIST),
          );
          expect(actions[2]).toHaveProperty('type', SET_PAGE);
          expect(actions[3]).toHaveProperty('type', TOGGLE_LOADING);
          done();
        }).catch(done.fail);
      });

      it('if the response is not ok, dispatch add errors', (done) => {
        getDatabaseDumpReportList.mockImplementationOnce(mockApi({ errors: true }));
        store.dispatch(fetchDatabaseDumpReport()).then(() => {
          expect(getDatabaseDumpReportList).toHaveBeenCalled();
          const actions = store.getActions();
          expect(actions).toHaveLength(3);
          expect(actions[0]).toHaveProperty('type', TOGGLE_LOADING);
          expect(actions[1]).toHaveProperty('type', ADD_ERRORS);
          expect(actions[2]).toHaveProperty('type', TOGGLE_LOADING);
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
      it('calls sendPostDatabaseStartBackup and call gotoRoute', (done) => {
        store.dispatch(sendPostDatabaseStartBackup()).then(() => {
          expect(postStartBackup).toHaveBeenCalled();
          expect(gotoRoute).toHaveBeenCalledWith(ROUTE_DATABASE_LIST);
          done();
        }).catch(done.fail);
      });

      it('if the response is not ok, dispatch add errors', (done) => {
        wrapErrorTest(done)(sendPostDatabaseStartBackup, postStartBackup)();
      });
    });
  });
});
