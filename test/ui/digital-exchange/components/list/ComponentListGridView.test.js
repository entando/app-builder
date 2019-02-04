import React from 'react';
import 'test/enzyme-init';
import { shallow } from 'enzyme';
import { LIST_DE_COMPONENTS_OK } from 'test/mocks/digital-exchange/components';
import ComponentListGridView from 'ui/digital-exchange/components/list/ComponentListGridView';


describe('ComponentListGridView', () => {
  let component;
  beforeEach(() => {
    component = shallow(<ComponentListGridView components={LIST_DE_COMPONENTS_OK} />);
  });

  it('renders without crashing', () => {
    expect(component.exists()).toEqual(true);
  });
});
