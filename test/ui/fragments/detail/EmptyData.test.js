import React from 'react';

import 'test/enzyme-init';
import { shallow } from 'enzyme';
import EmptyData from 'ui/fragments/detail/EmptyData';


describe('EmptyData', () => {
  let component;
  beforeEach(() => {
    component = shallow(<EmptyData messageId="test" />);
  });

  it('renders without crashing', () => {
    expect(component.exists()).toEqual(true);
  });
});
