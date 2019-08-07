import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { config } from '@entando/apimanager';
import {
  setSelectedPlugin,
  setPlugins,
} from 'state/plugins/actions';
import { PLUGIN_OK, PLUGINS_OK } from 'test/mocks/plugins';
import { SET_SELECTED_PLUGIN, SET_PLUGINS } from 'state/plugins/types';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

config(mockStore({ api: { useMocks: true }, currentUser: { token: 'asdf' } }));

describe('state/plugins/actions', () => {
  describe('setSelectedPlugin', () => {
    it('builds proper action', () => {
      const action = setSelectedPlugin(PLUGIN_OK);
      expect(action).toHaveProperty('type', SET_SELECTED_PLUGIN);
      expect(action).toHaveProperty('payload');
      expect(action).toHaveProperty('payload.plugin', PLUGIN_OK);
    });
  });

  describe('setPlugins', () => {
    it('builds proper action', () => {
      const action = setPlugins(PLUGINS_OK);
      expect(action).toHaveProperty('type', SET_PLUGINS);
      expect(action).toHaveProperty('payload');
      expect(action).toHaveProperty('payload.plugins', PLUGINS_OK);
    });
  });
});
