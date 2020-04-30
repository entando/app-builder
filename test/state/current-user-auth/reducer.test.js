import reducer from 'state/current-user-auth/reducer';
import { setCurrentUserAuth, clearCurrentUserAuth } from 'state/current-user-auth/actions';
import { AUTHORITIES } from 'test/mocks/users';

describe('state/current-user-auth/reducer', () => {
  let state = reducer();
  it('should return an array', () => {
    expect(typeof state).toBe('object');
    expect(state).toHaveProperty('length', 0);
  });

  it('after action SET_CURRENT_USER_AUTH', () => {
    state = reducer(state, setCurrentUserAuth(AUTHORITIES));
    expect(state).toHaveLength(AUTHORITIES.length);
    expect(state[0]).toHaveProperty('group', 'free');
  });

  it('after action CLEAR_CURRENT_USER_AUTH', () => {
    state = reducer(state, clearCurrentUserAuth());
    expect(state).toHaveLength(0);
  });
});
