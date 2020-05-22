import reducer from 'state/current-user-auth/reducer';
import { setCurrentUserAuth, clearCurrentUserAuth } from 'state/current-user-auth/actions';
import { AUTHORITIES } from 'test/mocks/users';

const payloadUserAuth = {
  result: AUTHORITIES,
  allPermissions: ['editor', 'supervisor', 'superuser'],
};

describe('state/current-user-auth/reducer', () => {
  let state = reducer();
  it('should return an array', () => {
    expect(typeof state).toBe('object');
    expect(state).toHaveProperty('auth');
    expect(state.auth).toHaveLength(0);
    expect(state).toHaveProperty('roles');
    expect(state.roles).toHaveLength(0);
  });

  it('after action SET_CURRENT_USER_AUTH', () => {
    state = reducer(state, setCurrentUserAuth(payloadUserAuth));
    expect(state.auth).toHaveLength(payloadUserAuth.result.length);
    expect(state.roles).toEqual(AUTHORITIES.map(auth => auth.role));
  });

  it('after action CLEAR_CURRENT_USER_AUTH', () => {
    state = reducer(state, clearCurrentUserAuth());
    expect(state.auth).toHaveLength(0);
    expect(state.roles).toHaveLength(0);
  });
});
