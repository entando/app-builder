import React from 'react';

import { configEnzymeAdapter } from 'test/legacyTestUtils';
import { shallow } from 'enzyme';
import AttributesNumber from 'ui/common/contenttype-attributes/AttributesNumber';

configEnzymeAdapter();

describe('AttributesNumber', () => {
  it('renders without crashing', () => {
    const component = shallow(<AttributesNumber />);
    expect(component.exists()).toEqual(true);
  });
});
