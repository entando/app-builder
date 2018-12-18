import React from 'react';
import 'test/enzyme-init';
import { shallow } from 'enzyme';
import ComponentInstallActions from 'ui/digital-exchange/components/common/ComponentInstallActions';

import { GET_DE_COMPONENT_OK } from 'test/mocks/digital-exchange/components';


describe('ComponentInstallActions', () => {
  let component;
  beforeEach(() => {
    component = shallow(<ComponentInstallActions component={GET_DE_COMPONENT_OK} />);
  });

  it('renders without crashing', () => {
    expect(component.exists()).toEqual(true);
  });
});
