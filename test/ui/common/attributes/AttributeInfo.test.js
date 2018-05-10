import React from 'react';

import 'test/enzyme-init';
import { shallow } from 'enzyme';
import AttributeInfo from 'ui/common/attributes/AttributeInfo';

describe('AttributeInfo', () => {
  it('renders without crashing', () => {
    const component = shallow(<AttributeInfo />);
    expect(component.exists()).toEqual(true);
  });
});
