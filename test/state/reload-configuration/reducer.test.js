import reducer from 'state/reload-configuration/reducer';

import { setStatus } from 'state/reload-configuration/actions';
import { SUCCESS } from 'test/mocks/reloadConfiguration';

describe('state/reload-configuration/reducer', () => {
  it('should return an object', () => {
    const state = reducer();
    expect(typeof state).toBe('object');
  });

  describe('after action SET_STATUS', () => {
    let state;
    beforeEach(() => {
      state = reducer({}, setStatus(SUCCESS));
    });

    it('should define the status property', () => {
      expect(state.status).toBeDefined();
    });
  });
});
