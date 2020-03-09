import React from 'react';
import { shallow } from 'enzyme';
import 'test/enzyme-init';
import PluginListEmptyState from 'ui/plugins/PluginListEmptyState';

describe('PluginListEmptyState', () => {
  let component;

  beforeEach(() => {
    component = shallow(<PluginListEmptyState />);
  });

  it('should render without crashing', () => {
    expect(component.exists()).toEqual(true);
    expect(component.exists('.PluginListEmptyState')).toEqual(true);
  });
});
