import React from 'react';
import 'test/enzyme-init';
import { shallow } from 'enzyme';

import ComponentListPage from 'ui/digital-exchange/components/list/ComponentListPage';

describe('ComponentListPage', () => {
  let component;
  beforeEach(() => {
    component = shallow(<ComponentListPage />);
  });

  it('renders without crashing', () => {
    expect(component.exists()).toEqual(true);
  });

  it('verify if the InternalPage has class ComponentListPage', () => {
    expect(component.find('InternalPage').hasClass('ComponentListPage')).toEqual(true);
  });

  it('has a page title', () => {
    expect(component.find('PageTitle')).toHaveLength(1);
  });

  it('has a ComponentListContent as default', () => {
    expect(component.find('ComponentListContent').exists()).toBe(true);
  });
});
