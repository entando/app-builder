import reducer from 'state/current-system-configuration/reducer';
import { SET_CURRENT_SYSTEM_CONFIGURATION } from 'state/current-system-configuration/types';

describe('state/system/reducer', () => {
  const initialState = {
    currentSystemConfiguration: {},
  };

  it('should return the correct state when action is SET_CURRENT_SYSTEM_CONFIGURATION', () => {
    const testConfig = { testKey: 'testVal' };
    const state = reducer(initialState, {
      type: SET_CURRENT_SYSTEM_CONFIGURATION, payload: testConfig,
    });
    expect(state).toEqual({
      ...initialState,
      currentSystemConfiguration: testConfig,
    });
  });
});
