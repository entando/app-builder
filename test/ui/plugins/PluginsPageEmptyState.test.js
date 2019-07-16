import React from 'react';
import { shallow } from 'enzyme';
import 'test/enzyme-init';
import PluginsPageEmptyState from 'ui/plugins/PluginsPageEmptyState';

describe('PluginsPageEmptyState', () => {
  let component;

  beforeEach(() => {
    component = shallow(<PluginsPageEmptyState />);
  });

  it('should render without crashing', () => {
    expect(component.exists()).toEqual(true);
    expect(component.exists('.PluginsPageEmptyState')).toEqual(true);
  });
});
