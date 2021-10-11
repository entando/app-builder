import React from 'react';

import { configEnzymeAdapter } from 'test/legacyTestUtils';
import { shallow } from 'enzyme';
import AttributeHypeLongMonoTextSettings from 'ui/common/contenttype-attributes/AttributeHypeLongMonoTextSettings';

configEnzymeAdapter();

describe('AttributeInfo', () => {
  it('renders without crashing', () => {
    const component = shallow(<AttributeHypeLongMonoTextSettings />);
    expect(component.exists()).toEqual(true);
  });
});
