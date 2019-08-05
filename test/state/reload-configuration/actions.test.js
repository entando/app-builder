import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { ADD_ERRORS } from '@entando/messages';

import {
  setStatus,
  sendReloadConf,
} from 'state/reload-configuration/actions';

import { reloadConf } from 'api/reloadConfiguration';
import { mockApi } from 'test/testUtils';

import { SET_STATUS } from 'state/reload-configuration/types';

import { history, ROUTE_RELOAD_CONFIRM } from 'app-init/router';
import { SUCCESS } from 'test/mocks/reloadConfiguration';

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

describe('state/reload-configuration/actions', () => {
  let store;

  beforeEach(() => {
    store = mockStore(INITIAL_STATE);
  });

  it('setStatus() should return a well formed action', () => {
    const action = setStatus(SUCCESS.status);
    expect(action).toHaveProperty('type', SET_STATUS);
    expect(action.payload).toHaveProperty('status', 'success');
  });

  describe('sendReloadConf()', () => {
    it('when reloadConf succeeds should call post action', (done) => {
      reloadConf.mockImplementation(mockApi({ payload: SUCCESS }));
      store.dispatch(sendReloadConf()).then(() => {
        expect(reloadConf).toHaveBeenCalled();
        expect(history.push).toHaveBeenCalledWith(ROUTE_RELOAD_CONFIRM);
        done();
      }).catch(done.fail);
    });

    it('when reloadConf get error, should dispatch addError', (done) => {
      reloadConf.mockImplementation(mockApi({ errors: true }));
      store.dispatch(sendReloadConf()).then(() => {
        expect(reloadConf).toHaveBeenCalled();
        const actions = store.getActions();
        expect(actions).toHaveLength(1);
        expect(actions[0]).toHaveProperty('type', ADD_ERRORS);
        done();
      }).catch(done.fail);
    });
  });
});
