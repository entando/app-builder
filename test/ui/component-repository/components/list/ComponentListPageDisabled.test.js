import React from 'react';
import 'test/enzyme-init';
import { shallow } from 'enzyme';

import ComponentListPageDisabled from 'ui/component-repository/components/list/ComponentListPageDisabled';

describe('ComponentListPageDisabled', () => {
  let component;
  beforeEach(() => {
    component = shallow(<ComponentListPageDisabled />);
  });

  it('renders without crashing', () => {
    expect(component.exists()).toEqual(true);
  });

  it('verify if the InternalPage has class ComponentListPageDisabled', () => {
    expect(component.find('InternalPage').hasClass('ComponentListPageDisabled')).toEqual(true);
  });

  it('has a page title', () => {
    expect(component.find('PageTitle')).toHaveLength(1);
  });
});
