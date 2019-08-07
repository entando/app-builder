import { PLUGIN_OK } from 'test/mocks/plugins';
import {
  getPlugins, getPluginList,
  getPluginMap, getSelectedPlugin,
} from 'state/plugins/selectors';

const MOCK_STATE = {
  plugins: {
    list: [PLUGIN_OK],
    map: {
      [PLUGIN_OK.id]: PLUGIN_OK,
    },
    selected: {},
  },
};

describe('state/plugins/selectors', () => {
  it('getPlugins returns the proper state slice', () => {
    const plugins = getPlugins(MOCK_STATE);
    expect(plugins).toBe(MOCK_STATE.plugins);
  });

  it('getPluginList returns the proper state slice', () => {
    const pluginList = getPluginList(MOCK_STATE);
    expect(pluginList).toBe(MOCK_STATE.plugins.list);
  });

  it('getPluginMap returns the proper state slice', () => {
    const pluginMap = getPluginMap(MOCK_STATE);
    expect(pluginMap).toBe(MOCK_STATE.plugins.map);
  });

  it('getSelectedPlugin returns the proper state slice', () => {
    const selectedPlugin = getSelectedPlugin(MOCK_STATE);
    expect(selectedPlugin).toEqual(MOCK_STATE.plugins.selected);
  });
});
