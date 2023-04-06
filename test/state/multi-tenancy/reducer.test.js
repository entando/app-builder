import reducer from 'state/multi-tenancy/reducer';
import { SET_CURRENT_TENANT } from 'state/multi-tenancy/types';

describe('state/multi-tenancy/reducer', () => {
  const initialState = {
    currentTenant: {},
  };

  it('should return the correct state when action is SET_CURRENT_TENANT', () => {
    const testTenant = { testKey: 'testVal' };
    const state = reducer(initialState, {
      type: SET_CURRENT_TENANT, payload: testTenant,
    });
    expect(state).toEqual({
      ...initialState,
      currentTenant: testTenant,
    });
  });
});
