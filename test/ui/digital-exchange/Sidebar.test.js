import React from 'react';
import 'test/enzyme-init';
import { shallow } from 'enzyme';

import Sidebar from 'ui/digital-exchange/Sidebar';

describe('Sidebar', () => {
  let component;
  beforeEach(() => {
    component = shallow(<Sidebar />);
  });

  it('renders without crashing', () => {
    expect(component.exists()).toEqual(true);
  });
});
