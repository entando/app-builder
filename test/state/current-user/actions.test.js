import { setUser, unsetUser } from 'state/current-user/actions';
import { SET_USER, UNSET_USER } from 'state/current-user/types';

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

  describe('unsetUser', () => {
    it('test unsetUser action sets the correct type', () => {
      const action = unsetUser({});
      expect(action).toHaveProperty('type', UNSET_USER);
    });

    it('test unsetUser action sets the correct payload', () => {
      const action = unsetUser({ test: true });
      expect(action).toHaveProperty('payload', expect.any(Object));
      expect(action).toHaveProperty('payload.user', expect.any(Object));
      expect(action).toHaveProperty('payload.user.username', null);
      expect(action).toHaveProperty('payload.user.token', null);
    });
  });
});
