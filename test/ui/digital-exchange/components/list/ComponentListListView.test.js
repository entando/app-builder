import React from 'react';
import 'test/enzyme-init';
import { shallow } from 'enzyme';
import { LIST_DE_COMPONENTS_OK } from 'test/mocks/digital-exchange/components';
import ComponentListListView from 'ui/digital-exchange/components/list/ComponentListListView';


describe('ComponentListListView', () => {
  let component;
  beforeEach(() => {
    component = shallow(<ComponentListListView components={LIST_DE_COMPONENTS_OK} />);
  });


  it('renders without crashing', () => {
    expect(component.exists()).toEqual(true);
  });
});
