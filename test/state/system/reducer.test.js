import reducer from 'state/system/reducer';
import { SET_SYSTEM_REPORT } from 'state/system/types';

describe('state/system/reducer', () => {
  const initialState = {
    report: {},
  };

  it('should return the correct state when action is SET_SYSTEM_REPORT', () => {
    const testReport = { testKey: 'testVal' };
    const state = reducer(initialState, {
      type: SET_SYSTEM_REPORT, payload: testReport,
    });
    expect(state).toEqual({
      ...initialState,
      report: testReport,
    });
  });
});
