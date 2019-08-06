import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { config } from '@entando/apimanager';

import { mockApi } from 'test/testUtils';
import { PLUGIN_OK, PLUGINS_OK } from 'test/mocks/plugins';

import { fetchPlugins, getOrFetchPlugin, savePluginConfig } from 'state/plugins/thunks';

import { getPlugins, getPlugin, putPluginConfig } from 'api/plugins';
import { SET_PLUGINS, SET_SELECTED_PLUGIN } from 'state/plugins/types';

import { TOGGLE_LOADING } from 'state/loading/types';
import { ADD_ERRORS, ADD_TOAST, TOAST_SUCCESS } from '@entando/messages';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

config(mockStore({ api: { useMocks: true }, currentUser: { token: 'asdf' } }));

const INITIAL_STATE = {
  plugins: {
    list: [],
    map: {},
    selected: {},
  },
};

jest.mock('api/plugins');

describe('state/plugins/thunks', () => {
  let store;

  beforeEach(() => {
    store = mockStore(INITIAL_STATE);
    jest.clearAllMocks();
    store.clearActions();
  });

  describe('fetchPlugins', () => {
    it('calls proper actions on success', (done) => {
      getPlugins.mockImplementation(mockApi({ payload: PLUGINS_OK }));

      store.dispatch(fetchPlugins()).then(() => {
        const actions = store.getActions();
        expect(actions).toHaveLength(3);
        expect(actions[0]).toHaveProperty('type', TOGGLE_LOADING);
        expect(actions[1]).toHaveProperty('type', SET_PLUGINS);
        expect(actions[2]).toHaveProperty('type', TOGGLE_LOADING);
        done();
      }).catch(done.fail);
    });

    it('calls proper actions on error', (done) => {
      getPlugins.mockImplementation(mockApi({ errors: true }));

      store.dispatch(fetchPlugins()).then(() => {
        const actions = store.getActions();
        expect(actions).toHaveLength(3);
        expect(actions[0]).toHaveProperty('type', TOGGLE_LOADING);
        expect(actions[1]).toHaveProperty('type', ADD_ERRORS);
        expect(actions[2]).toHaveProperty('type', TOGGLE_LOADING);
        done();
      }).catch(done.fail);
    });
  });

  describe('getOrFetchPlugin', () => {
    it('calls proper actions on success when plugin is not cached', (done) => {
      getPlugin.mockImplementation(mockApi({ payload: PLUGIN_OK }));

      store.dispatch(getOrFetchPlugin(PLUGIN_OK.id)).then(() => {
        const actions = store.getActions();
        expect(actions).toHaveLength(1);
        expect(actions[0]).toHaveProperty('type', SET_SELECTED_PLUGIN);
        done();
      }).catch(done.fail);
    });

    it('calls proper actions on error when plugin is not cached', (done) => {
      getPlugin.mockImplementation(mockApi({ errors: true }));

      store.dispatch(getOrFetchPlugin(PLUGIN_OK.id)).then(() => {
        const actions = store.getActions();
        expect(actions).toHaveLength(1);
        expect(actions[0]).toHaveProperty('type', ADD_ERRORS);
        done();
      }).catch(done.fail);
    });

    it('calls proper actions when plugin is cached', (done) => {
      const stateWithCachedPlugin = {
        ...INITIAL_STATE,
        plugins: {
          list: PLUGINS_OK,
          map: {
            [PLUGIN_OK.id]: PLUGIN_OK,
          },
          selected: {},
        },
      };
      store = mockStore(stateWithCachedPlugin);

      store.dispatch(getOrFetchPlugin(PLUGIN_OK.id)).then(() => {
        const actions = store.getActions();
        expect(actions).toHaveLength(1);
        expect(actions[0]).toHaveProperty('type', SET_SELECTED_PLUGIN);
        done();
      }).catch(done.fail);
    });
  });

  describe('savePluginConfig', () => {
    it('calls proper actions on success', (done) => {
      putPluginConfig.mockImplementation(mockApi({ payload: PLUGIN_OK }));

      store.dispatch(savePluginConfig()).then(() => {
        const actions = store.getActions();
        expect(actions).toHaveLength(1);
        expect(actions[0]).toHaveProperty('type', ADD_TOAST);
        expect(actions[0]).toHaveProperty('payload');
        expect(actions[0]).toHaveProperty('payload.type', TOAST_SUCCESS);
        done();
      }).catch(done.fail);
    });

    it('calls proper actions on error', (done) => {
      putPluginConfig.mockImplementation(mockApi({ errors: true }));

      store.dispatch(savePluginConfig()).then(() => {
        const actions = store.getActions();
        expect(actions).toHaveLength(1);
        expect(actions[0]).toHaveProperty('type', ADD_ERRORS);
        done();
      }).catch(done.fail);
    });
  });
});

