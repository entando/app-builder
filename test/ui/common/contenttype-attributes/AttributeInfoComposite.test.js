import React from 'react';

import { configEnzymeAdapter } from 'testutils/helpers';
import { shallow } from 'enzyme';
import AttributeInfoComposite from 'ui/common/contenttype-attributes/AttributeInfoComposite';

configEnzymeAdapter();

describe('AttributeInfoComposite', () => {
  it('renders without crashing', () => {
    const component = shallow(<AttributeInfoComposite />);
    expect(component.exists()).toEqual(true);
  });
});
