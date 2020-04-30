import { setCurrentUserAuth, clearCurrentUserAuth } from 'state/current-user-auth/actions';
import { SET_CURRENT_USER_AUTH, CLEAR_CURRENT_USER_AUTH } from 'state/current-user-auth/types';

const MOCK_AUTHDATA = [
  { group: 'not_free', role: 'admin' },
  { group: 'free', role: 'not_admin' },
];

describe('state/current-user-auth/actions', () => {
  it('setCurrentUserAuth', () => {
    const action = setCurrentUserAuth(MOCK_AUTHDATA);
    expect(action).toHaveProperty('type', SET_CURRENT_USER_AUTH);
    expect(action).toHaveProperty('payload', MOCK_AUTHDATA);
  });
  it('clearCurrentUserAuth', () => {
    const action = clearCurrentUserAuth();
    expect(action).toHaveProperty('type', CLEAR_CURRENT_USER_AUTH);
    expect(action).not.toHaveProperty('payload');
  });
});
