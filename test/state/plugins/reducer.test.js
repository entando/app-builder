import reducer from 'state/plugins/reducer';
import {
  setPlugins,
  setSelectedPlugin,
} from 'state/plugins/actions';
import {
  PLUGIN_OK,
  PLUGINS_OK,
} from 'test/mocks/plugins';


describe('state/plugins/reducer', () => {
  const state = reducer();

  describe('list reducer', () => {
    it('should have an empty list', () => {
      expect(state).toHaveProperty('list', []);
    });

    it('should set plugins', () => {
      const newState = reducer(state, setPlugins(PLUGINS_OK));
      expect(newState.list).toBe(PLUGINS_OK);
    });
  });

  describe('map reducer', () => {
    it('should have an empty map', () => {
      expect(state).toHaveProperty('map', {});
    });

    it('should set plugins', () => {
      const newState = reducer(state, setPlugins(PLUGINS_OK));
      expect(newState.map).toHaveProperty(PLUGIN_OK.id, PLUGIN_OK);
    });
  });

  describe('selected reducer', () => {
    it('should have an empty selected object', () => {
      expect(state).toHaveProperty('selected', {});
    });

    it('should set plugins', () => {
      const newState = reducer({}, setSelectedPlugin(PLUGIN_OK));
      expect(newState.selected).toBe(PLUGIN_OK);
    });
  });
});
