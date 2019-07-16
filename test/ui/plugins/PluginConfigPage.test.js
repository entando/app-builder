import React from 'react';
import { shallow } from 'enzyme';
import 'test/enzyme-init';
import PluginConfigPage from 'ui/plugins/PluginConfigPage';
import { PLUGIN_OK } from 'test/mocks/plugins';

describe('PluginConfigPage', () => {
  let component;
  let plugin;
  let fetchSelectedPluginIfNotCached;
  let savePluginConfig;

  beforeEach(() => {
    fetchSelectedPluginIfNotCached = jest.fn();
    savePluginConfig = jest.fn();
    plugin = PLUGIN_OK;
    const props = { plugin, fetchSelectedPluginIfNotCached, savePluginConfig };
    component = shallow(<PluginConfigPage {...props} />);
  });

  it('should render without crashing', () => {
    expect(component.exists()).toEqual(true);
  });
});
