import React from 'react';
import { shallow } from 'enzyme';
import 'test/enzyme-init';
import PluginListPage from 'ui/plugins/PluginListPage';
import { PLUGINS_OK } from 'test/mocks/plugins';

describe('PluginConfigPage', () => {
  let component;

  beforeEach(() => {
    const props = { plugins: PLUGINS_OK };
    component = shallow(<PluginListPage {...props} />);
  });

  it('should render without crashing', () => {
    expect(component.exists()).toEqual(true);
  });

  it('should render plugins', () => {
    expect(component.find('.PluginListPage').children()).toHaveLength(1);
    expect(component.find('.PluginListPageEmptyState')).toHaveLength(0);
  });

  it('should render empty state when no plugins 1', () => {
    component = shallow(<PluginListPage plugins={[]} />);
    expect(component.exists('.PluginListPageEmptyState')).toEqual(true);
  });

  it('should render empty state when no plugins 2', () => {
    component = shallow(<PluginListPage plugins={null} />);
    expect(component.exists('.PluginListPageEmptyState')).toEqual(true);
  });
});
