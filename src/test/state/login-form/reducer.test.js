import reducer from 'state/login-form/reducer';
import { setLoginErrorMessage } from 'state/login-form/actions';

const LOGIN_FORM_PAYLOAD = {
  message: 'Error',
};

describe('state/login-form/reducer', () => {
  it('should return an object', () => {
    const state = reducer();
    expect(typeof state).toBe('object');
  });

  describe('after action SET_LOGIN_ERROR_MESSAGE', () => {
    let state;
    beforeEach(() => {
      state = reducer({}, setLoginErrorMessage(LOGIN_FORM_PAYLOAD));
    });
    it('should define groups array', () => {
      expect(state.loginErrorMessage).toBeDefined();
      expect(state.loginErrorMessage.message).toEqual(LOGIN_FORM_PAYLOAD.message);
    });
  });
});
