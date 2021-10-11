import React from 'react';

import { configEnzymeAdapter } from 'test/legacyTestUtils';
import { shallow } from 'enzyme';
import AttributeInfo from 'ui/common/contenttype-attributes/AttributeInfo';

configEnzymeAdapter();

describe('AttributeInfo', () => {
  it('renders without crashing', () => {
    const component = shallow(<AttributeInfo />);
    expect(component.exists()).toEqual(true);
  });
});
