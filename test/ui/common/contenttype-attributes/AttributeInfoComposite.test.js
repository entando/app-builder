import React from 'react';

import { configEnzymeAdapter } from 'test/legacyTestUtils';
import { shallow } from 'enzyme';
import AttributeInfoComposite from 'ui/common/contenttype-attributes/AttributeInfoComposite';

configEnzymeAdapter();

describe('AttributeInfoComposite', () => {
  it('renders without crashing', () => {
    const component = shallow(<AttributeInfoComposite />);
    expect(component.exists()).toEqual(true);
  });
});
