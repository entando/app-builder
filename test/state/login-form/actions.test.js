import thunk from 'redux-thunk';

import { setLoginErrorMessage, performLogin } from 'state/login-form/actions';
import { SET_LOGIN_ERROR_MESSAGE } from 'state/login-form/types';
import { SET_USER } from 'state/current-user/types';
import configureMockStore from 'redux-mock-store';
import { config } from 'api/apiManager';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

jest.unmock('api/login');

config(mockStore({ api: { useMocks: true } }));

const SET_LOGIN_ERROR_MESSAGE_MOCK = {
  type: SET_LOGIN_ERROR_MESSAGE,
  payload: {
    message: 'ERROR: USERNAME OR PASSWORD IS INVALID',
  },
};

let store;

describe('api-form actions', () => {
  beforeEach(() => {
    store = mockStore();
  });

  it('test setLoginErrorMessage action', () => {
    expect(setLoginErrorMessage('ERROR: USERNAME OR PASSWORD IS INVALID')).toEqual(SET_LOGIN_ERROR_MESSAGE_MOCK);
  });

  it('cannot login without user and password', (done) => {
    const result = store.dispatch(performLogin());
    expect(result).toBeInstanceOf(Promise);
    result.then(() => {
      const actions = store.getActions();
      expect(actions).toHaveLength(1);
      expect(actions[0]).toHaveProperty('type', SET_LOGIN_ERROR_MESSAGE);
      expect(actions[0]).toHaveProperty('payload.message', 'fcc.login.errorMessage');
      done();
    });
  });

  it('cannot login with bad user and password', (done) => {
    const result = store.dispatch(performLogin('gianni', 'moi'));
    expect(result).toBeInstanceOf(Promise);
    result.then(() => {
      const actions = store.getActions();
      expect(actions).toHaveLength(2);
      expect(actions[0]).toHaveProperty('type', SET_LOGIN_ERROR_MESSAGE);
      expect(actions[0]).toHaveProperty('payload.message', '');
      expect(actions[1]).toHaveProperty('type', SET_LOGIN_ERROR_MESSAGE);
      expect(actions[1]).toHaveProperty('payload.message', 'fcc.login.errorMessage');
      done();
    });
  });

  it('can login with the correct credentials', (done) => {
    const result = store.dispatch(performLogin('admin', 'adminadmin'));
    expect(result).toBeInstanceOf(Promise);
    result.then(() => {
      const actions = store.getActions();
      expect(actions).toHaveLength(2);
      expect(actions[0]).toHaveProperty('type', SET_LOGIN_ERROR_MESSAGE);
      expect(actions[0]).toHaveProperty('payload.message', '');
      expect(actions[1]).toHaveProperty('type', SET_USER);
      expect(actions[1]).toHaveProperty(
        'payload.user',
        { username: 'admin', token: expect.any(String) },
      );
      done();
    });
  });
});
