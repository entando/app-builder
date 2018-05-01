import React from 'react';

import 'test/enzyme-init';
import { shallow } from 'enzyme';
import AttributesNumber from 'ui/common/attributes/AttributesNumber';

describe('AttributesNumber', () => {
  it('renders without crashing', () => {
    const component = shallow(<AttributesNumber />);
    expect(component.exists()).toEqual(true);
  });
});
