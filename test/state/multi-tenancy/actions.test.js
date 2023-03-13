import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';

import { setCurrentTenant, fetchCurrentTenant } from 'state/multi-tenancy/actions';
import { getCurrentTenant } from 'api/multiTenancy';
import { SET_CURRENT_TENANT } from 'state/multi-tenancy/types';
import { GET_CURRENT_TENANT_RESPONSE_OK_NON_PRIMARY } from 'test/mocks/multiTenancy';
import { mockApi } from 'test/testUtils';

jest.mock('api/multiTenancy', () => ({
  getCurrentTenant: jest.fn(),
}));

const middlewares = [thunk];
const createMockStore = configureMockStore(middlewares);

const MOCK_ERROR_MESSAGE = 'Test error message';

describe('state/system/actions', () => {
  const testTenant = { testKey: 'testVal' };

  let store;

  const dispatch = action => store.dispatch(action);

  const getActions = () => store.getActions();

  beforeEach(() => {
    store = createMockStore({});
  });

  describe('setCurrentTenant', () => {
    it('should create the correct action object', () => {
      expect(setCurrentTenant(testTenant)).toEqual({
        type: SET_CURRENT_TENANT,
        payload: testTenant,
      });
    });
  });

  describe('fetchCurrentTenant', () => {
    it('should set current tenant on success', (done) => {
      getCurrentTenant
        .mockImplementationOnce(mockApi({ payload: GET_CURRENT_TENANT_RESPONSE_OK_NON_PRIMARY }));

      const expectedActions = [
        { type: SET_CURRENT_TENANT, payload: GET_CURRENT_TENANT_RESPONSE_OK_NON_PRIMARY },
      ];

      dispatch(fetchCurrentTenant()).then(() => {
        const actions = getActions();
        expect(actions).toEqual(expectedActions);
        done();
      }).catch(done.fail);
    });

    it('should not dispatch any action on error', (done) => {
      getCurrentTenant.mockImplementationOnce(mockApi({
        errors: [{ message: MOCK_ERROR_MESSAGE }],
      }));

      const expectedActions = [];

      dispatch(fetchCurrentTenant()).then(() => {
        const actions = getActions();
        expect(actions).toEqual(expectedActions);
        done();
      }).catch(done.fail);
    });
  });
});
