import React from 'react';
import 'test/enzyme-init';
import { shallow } from 'enzyme';
import ComponentImage from 'ui/digital-exchange/components/common/ComponentImage';

import { GET_DE_COMPONENT_OK } from 'test/mocks/digital-exchange/components';


describe('ComponentImage', () => {
  let component;
  beforeEach(() => {
    component = shallow(<ComponentImage component={GET_DE_COMPONENT_OK} />);
  });

  it('renders without crashing', () => {
    expect(component.exists()).toEqual(true);
  });

  it('renders image-unavailable when there is no image', () => {
    GET_DE_COMPONENT_OK.image = null;
    component = shallow(<ComponentImage component={GET_DE_COMPONENT_OK} />);
    expect(component.prop('src')).toEqual('images/image-unavailable.png');
  });
});
