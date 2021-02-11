import React from 'react';
import { shallow } from 'enzyme';
import 'test/enzyme-init';
import PluginsPage from 'ui/plugins/PluginsPage';
import { PLUGINS_OK } from 'test/mocks/plugins';

describe('PluginConfigPage', () => {
  let component;

  beforeEach(() => {
    const props = { plugins: PLUGINS_OK };
    component = shallow(<PluginsPage {...props} />);
  });

  it('should render without crashing', () => {
    expect(component.exists()).toEqual(true);
  });

  it('should render plugins', () => {
    expect(component.find('.PluginsPage').children()).toHaveLength(1);
    expect(component.find('.PluginsPageEmptyState')).toHaveLength(0);
  });

  it('should render empty state when no plugins 1', () => {
    component = shallow(<PluginsPage plugins={[]} />);
    expect(component.exists('PluginsPageEmptyState')).toEqual(true);
  });

  it('should render empty state when no plugins 2', () => {
    component = shallow(<PluginsPage plugins={null} />);
    expect(component.exists('PluginsPageEmptyState')).toEqual(true);
  });
});
