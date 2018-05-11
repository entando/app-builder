import React from 'react';

import 'test/enzyme-init';
import { shallow } from 'enzyme';
import AttributeHypeLongMonoTextSettings from 'ui/common/attributes/AttributeHypeLongMonoTextSettings';

describe('AttributeInfo', () => {
  it('renders without crashing', () => {
    const component = shallow(<AttributeHypeLongMonoTextSettings />);
    expect(component.exists()).toEqual(true);
  });
});
