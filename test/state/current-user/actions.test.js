import { setUser } from 'state/current-user/actions';
import { SET_USER } from 'state/current-user/types';

describe('current-user actions', () => {
  describe('setUser', () => {
    it('test setUser action sets the correct type', () => {
      const action = setUser({});
      expect(action).toHaveProperty('type', SET_USER);
    });

    it('test setUser action sets the correct payload', () => {
      const action = setUser({ test: true });
      expect(action).toHaveProperty('payload', { user: { test: true } });
    });
  });
});
