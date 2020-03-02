import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';

import {
  setLoginErrorMessage, performLogin, ERROR_LOGIN_MESSAGE,
  generateLoginErrorMessage, apiUnreacheableId, incorrectCredentialsId,
} from 'state/login-form/actions';
import { config, loginUser, getDomain } from '@entando/apimanager';
import { SET_LOGIN_ERROR_MESSAGE } from 'state/login-form/types';

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
      expect(actions[0]).toHaveProperty('payload.message', { defaultMessage: 'error: username or password is invalid', id: 'fcc.login.errorMessage' });
      done();
    }).catch(done.fail);
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
      expect(actions[1]).toHaveProperty('payload.message', { defaultMessage: 'error: username or password is invalid', id: 'fcc.login.errorMessage' });
      done();
    }).catch(done.fail);
  });

  it('can login with the correct credentials', (done) => {
    const result = store.dispatch(performLogin('admin', 'adminadmin'));
    expect(result).toBeInstanceOf(Promise);
    result.then(() => {
      const actions = store.getActions();
      expect(actions).toHaveLength(2);
      expect(actions[0]).toHaveProperty('type', SET_LOGIN_ERROR_MESSAGE);
      expect(actions[0]).toHaveProperty('payload.message', '');
      expect(loginUser).toHaveBeenCalledWith('admin', expect.any(String));
      done();
    }).catch(done.fail);
  });

  it('tests generateLoginErrorMessage function when core is unreachable', (done) => {
    store.dispatch(generateLoginErrorMessage({ message: apiUnreacheableId }));
    const actions = store.getActions();
    expect(actions).toHaveLength(1);
    expect(actions[0]).toHaveProperty('type', SET_LOGIN_ERROR_MESSAGE);
    expect(actions[0]).toHaveProperty('payload.message', { id: apiUnreacheableId, values: { domain: 'getDomain_result' } });
    done();
  });

  it('tests generateLoginErrorMessage function when credentials are incorrect', (done) => {
    jest.mock('@entando/apimanager', () => ({
      getDomain: () => 'getDomain_result',
    }));
    getDomain.mockImplementation(() => 'getDomain_result');
    store.dispatch(generateLoginErrorMessage({ message: 'something random' }));
    const actions = store.getActions();
    expect(actions).toHaveLength(1);
    expect(actions[0]).toHaveProperty('type', SET_LOGIN_ERROR_MESSAGE);
    expect(actions[0]).toHaveProperty('payload.message', { id: incorrectCredentialsId, defaultMessage: ERROR_LOGIN_MESSAGE });
    done();
  });
});
