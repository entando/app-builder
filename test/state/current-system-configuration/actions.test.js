import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import { ADD_TOAST, TOAST_ERROR } from '@entando/messages';

import { setCurrentSystemConfiguration, fetchCurrentSystemConfiguration } from 'state/current-system-configuration/actions';
import { getCurrentSystemConfiguration } from 'api/currentSystemConfiguration';
import { mockApi } from 'test/testUtils';

jest.mock('api/currentSystemConfiguration', () => ({
  getCurrentSystemConfiguration: jest.fn(),
}));

const middlewares = [thunk];
const createMockStore = configureMockStore(middlewares);

const MOCK_ERROR_MESSAGE = 'Test error message';
const MOCK_ADD_TOAST_ERROR_ACTION = {
  type: ADD_TOAST,
  payload: { message: MOCK_ERROR_MESSAGE, type: TOAST_ERROR },
};

describe('state/current-system-configuration/actions', () => {
  const testCurrConfig = { testKey: 'testVal' };

  let store;

  const dispatch = action => store.dispatch(action);

  const getActions = () => store.getActions();

  beforeEach(() => {
    store = createMockStore({});
  });

  describe('setCurrentSystemConfiguration', () => {
    it('should create the correct action object', () => {
      expect(setCurrentSystemConfiguration(testCurrConfig)).toEqual({
        type: 'current-system-configuration/SET_CURRENT_SYSTEM_CONFIGURATION',
        payload: testCurrConfig,
      });
    });
  });

  describe('fetchCurrentSystemConfiguration', () => {
    it('should set current systen config on success', (done) => {
      getCurrentSystemConfiguration.mockImplementationOnce(mockApi({ payload: testCurrConfig }));

      const expectedActions = [
        { type: 'current-system-configuration/SET_CURRENT_SYSTEM_CONFIGURATION', payload: testCurrConfig },
      ];

      dispatch(fetchCurrentSystemConfiguration()).then(() => {
        const actions = getActions();
        expect(actions).toEqual(expectedActions);
        done();
      }).catch(done.fail);
    });

    it('should dispatch the correct actions on error', (done) => {
      getCurrentSystemConfiguration.mockImplementationOnce(mockApi({
        errors: [{ message: MOCK_ERROR_MESSAGE }],
      }));

      const expectedActions = [MOCK_ADD_TOAST_ERROR_ACTION];

      dispatch(fetchCurrentSystemConfiguration()).then(() => {
        const actions = getActions();
        expect(actions).toEqual(expectedActions);
        done();
      }).catch(done.fail);
    });
  });
});
