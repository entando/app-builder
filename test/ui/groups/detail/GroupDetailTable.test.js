import React from 'react';
import 'test/enzyme-init';

import { shallow } from 'enzyme';

import GroupDetailTable from 'ui/groups/detail/GroupDetailTable';

describe('DetailGroupPage', () => {
  let component;
  beforeEach(() => {
    component = shallow(<GroupDetailTable />);
  });

  it('renders without crashing', () => {
    expect(component.exists()).toBe(true);
  });
});
