import React from 'react';
import 'test/enzyme-init';

import { shallow } from 'enzyme';

import GroupDetailTabs from 'ui/groups/detail/GroupDetailTabs';


global.console.error = jest.fn();

describe('GroupDetailTabs', () => {
  let component;
  beforeEach(() => {
    component = shallow(<GroupDetailTabs />);
  });

  it('renders without crashing', () => {
    expect(component.exists()).toBe(true);
  });
});
