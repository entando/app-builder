import React from 'react';
import 'test/enzyme-init';
import { shallow } from 'enzyme';
import ComponentImage from 'ui/component-repository/components/common/ComponentImage';

import { GET_ECR_COMPONENT_OK } from 'test/mocks/component-repository/components';


describe('ComponentImage', () => {
  let component;
  beforeEach(() => {
    component = shallow(<ComponentImage component={GET_ECR_COMPONENT_OK} />);
  });

  it('renders without crashing', () => {
    expect(component.exists()).toEqual(true);
  });

  it('renders image-unavailable when there is no image', () => {
    GET_ECR_COMPONENT_OK.image = null;
    component = shallow(<ComponentImage component={GET_ECR_COMPONENT_OK} />);
    expect(component.prop('src')).toEqual('images/image-unavailable.png');
  });
});
