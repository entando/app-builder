import { isFSA } from 'flux-standard-action';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { SET_PAGE } from 'state/pagination/types';
import { ADD_ERRORS } from 'state/errors/types';

import { DATABASE_DUMP_REPORT_LIST } from 'test/mocks/database';
import { getDatabaseDumpReportList } from 'api/database';
import { SET_DATABASE_DUMPS } from 'state/database/types';
import { setDatabaseDumps, fetchDatabaseDumpReport } from 'state/database/actions';

import { mockApi } from 'test/testUtils';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const INITIAL_STATE = {
  categories: {
    list: [],
    map: {},
  },
};

const wrapErrorTest = store => (actionCall, apiCall) => (...args) => {
  apiCall.mockImplementationOnce(mockApi({ errors: true }));
  return store.dispatch(actionCall(...args)).catch((e) => {
    expect(apiCall).toHaveBeenCalled();
    const actions = store.getActions();
    expect(actions).toHaveLength(1);
    expect(actions[0]).toHaveProperty('type', ADD_ERRORS);
    expect(e).toHaveProperty('errors');
    e.errors.forEach((error, index) => {
      expect(error.message).toEqual(actions[0].payload.errors[index]);
    });
  });
};

describe('state/database/actions', () => {
  let store;
  let action;
  beforeEach(() => {
    store = mockStore(INITIAL_STATE);
  });

  describe('actions', () => {
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
    describe('fetchDatabaseDumpReport', () => {
      it('calls getDatabaseDumpReportList and calls SET_DATABASE_DUMPS and setPage', (done) => {
        store.dispatch(fetchDatabaseDumpReport()).then(() => {
          expect(getDatabaseDumpReportList).toHaveBeenCalled();
          const actions = store.getActions();
          expect(actions).toHaveLength(2);
          expect(actions[0].type).toEqual(SET_DATABASE_DUMPS);
          expect(actions[0].payload.database).toEqual(DATABASE_DUMP_REPORT_LIST);
          expect(actions[1].type).toEqual(SET_PAGE);
          done();
        }).catch(done.fail);
      });

      it('if the response is not ok, dispatch add errors', async () => {
        wrapErrorTest(store)(fetchDatabaseDumpReport, getDatabaseDumpReportList)();
      });
    });
  });
});
