import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import { ADD_TOAST, TOAST_ERROR } from '@entando/messages';

import { setSystemReport, fetchSystemReport } from 'state/system/actions';
import { getSystemReport } from 'api/system';
import { mockApi } from 'test/testUtils';

jest.mock('api/system', () => ({
  getSystemReport: jest.fn(),
}));

const middlewares = [thunk];
const createMockStore = configureMockStore(middlewares);

const MOCK_ERROR_MESSAGE = 'Test error message';
const MOCK_ADD_TOAST_ERROR_ACTION = {
  type: ADD_TOAST,
  payload: { message: MOCK_ERROR_MESSAGE, type: TOAST_ERROR },
};

describe('state/system/actions', () => {
  const testReport = { testKey: 'testVal' };

  let store;

  const dispatch = action => store.dispatch(action);

  const getActions = () => store.getActions();

  beforeEach(() => {
    store = createMockStore({});
  });

  describe('setSystemReport', () => {
    it('should create the correct action object', () => {
      expect(setSystemReport(testReport)).toEqual({
        type: 'system/set-system-report',
        payload: testReport,
      });
    });
  });

  describe('fetchSystemReport', () => {
    it('should set system report on success', (done) => {
      getSystemReport.mockImplementationOnce(mockApi({ payload: testReport }));

      const expectedActions = [
        { type: 'system/set-system-report', payload: testReport },
      ];

      dispatch(fetchSystemReport()).then(() => {
        const actions = getActions();
        expect(actions).toEqual(expectedActions);
        done();
      }).catch(done.fail);
    });

    it('should dispatch the correct actions on error', (done) => {
      getSystemReport.mockImplementationOnce(mockApi({
        errors: [{ message: MOCK_ERROR_MESSAGE }],
      }));

      const expectedActions = [MOCK_ADD_TOAST_ERROR_ACTION];

      dispatch(fetchSystemReport()).then(() => {
        const actions = getActions();
        expect(actions).toEqual(expectedActions);
        done();
      }).catch(done.fail);
    });
  });
});
