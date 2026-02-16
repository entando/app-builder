import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { ADD_TOAST, ADD_ERRORS } from '@entando/messages';

import {
  setStatus,
  sendReloadConf,
} from 'state/reload-configuration/actions';

import { reloadConf, getReloadStatus } from 'api/reloadConfiguration';
import { mockApi } from 'test/testUtils';

import { SET_STATUS, SET_LOADING, SET_RELOAD_INFO } from 'state/reload-configuration/types';

import { history, ROUTE_RELOAD_CONFIRM } from 'app-init/router';
import { SUCCESS, STATUS_SUCCESS } from 'test/mocks/reloadConfiguration';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const INITIAL_STATE = {
  configuration: {},
};

jest.mock('app-init/router', () => ({
  history: {
    push: jest.fn(),
  },
}));

jest.mock('api/reloadConfiguration', () => ({
  reloadConf: jest.fn(),
  getReloadStatus: jest.fn(),
}));

describe('state/reload-configuration/actions', () => {
  let store;

  beforeEach(() => {
    store = mockStore(INITIAL_STATE);
  });

  it('setStatus() should return a well formed action', () => {
    const action = setStatus(SUCCESS.status);
    expect(action).toHaveProperty('type', SET_STATUS);
    expect(action.payload).toHaveProperty('status', 'progress');
  });

  describe('sendReloadConf()', () => {
    it('when reloadConf succeeds should call post action', (done) => {
      reloadConf.mockImplementation(mockApi({ payload: SUCCESS }));
      getReloadStatus.mockImplementation(mockApi({ payload: STATUS_SUCCESS }));
      store.dispatch(sendReloadConf()).then(() => {
        expect(reloadConf).toHaveBeenCalled();
        expect(history.push).toHaveBeenCalledWith(ROUTE_RELOAD_CONFIRM);
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', SET_LOADING);
        expect(actions[1]).toHaveProperty('type', SET_STATUS);
        expect(actions[2]).toHaveProperty('type', SET_RELOAD_INFO);
        done();
      }).catch(done.fail);
    });

    it('when reloadConf get error, should dispatch addError', (done) => {
      reloadConf.mockImplementation(mockApi({ errors: true }));
      store.dispatch(sendReloadConf()).then(() => {
        expect(reloadConf).toHaveBeenCalled();
        const actions = store.getActions();
        expect(actions).toHaveLength(6);
        expect(actions[0]).toHaveProperty('type', SET_LOADING);
        expect(actions[1]).toHaveProperty('type', SET_STATUS);
        expect(actions[2]).toHaveProperty('type', SET_RELOAD_INFO);
        expect(actions[3]).toHaveProperty('type', ADD_ERRORS);
        expect(actions[4]).toHaveProperty('type', ADD_TOAST);
        expect(actions[5]).toHaveProperty('type', SET_LOADING);
        done();
      }).catch(done.fail);
    });
  });
});
