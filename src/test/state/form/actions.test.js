
import { setLoginErrorMessage, performLogin } from 'state/form/actions';
import { SET_LOGIN_ERROR_MESSAGE } from 'state/form/types';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const SET_LOGIN_ERROR_MESSAGE_MOCK = {
  type: SET_LOGIN_ERROR_MESSAGE,
  payload: {
    message: 'ERROR: USERNAME OR PASSWORD IS INVALID',
  },
};

const SET_LOGIN_ERROR_MESSAGE_INITIAL_STATE = {
  type: SET_LOGIN_ERROR_MESSAGE,
  payload: {
    message: '',
  },
};

it('test setLoginErrorMessage action', () => {
  expect(setLoginErrorMessage('ERROR: USERNAME OR PASSWORD IS INVALID')).toEqual(SET_LOGIN_ERROR_MESSAGE_MOCK);
});

it('test performLogin on error', () => {
  const store = mockStore(SET_LOGIN_ERROR_MESSAGE_INITIAL_STATE);
  store.dispatch(performLogin('', ''));
  const actions = store.getActions();
  expect(actions[0].payload.message).toBeDefined();
});

it('test performLogin on success', () => {
  const store = mockStore(SET_LOGIN_ERROR_MESSAGE_INITIAL_STATE);
  store.dispatch(performLogin('gianni', 'moi'));
  const actions = store.getActions();
  expect(actions[0].payload.message).toBeDefined();
});
