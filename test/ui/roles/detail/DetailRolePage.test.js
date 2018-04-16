import React from 'react';

import 'test/enzyme-init';
import { shallow } from 'enzyme';
import DetailRolePage from 'ui/roles/detail/DetailRolePage';

describe('DetailRolePage', () => {
  let component;
  beforeEach(() => {
    component = shallow(<DetailRolePage />);
  });
  it('renders without crashing', () => {
    expect(component.exists()).toBe(true);
  });

  it('verify if exist InternalPage with class DetailRolePage', () => {
    expect(component.find('InternalPage').hasClass('DetailRolePage')).toBe(true);
  });

  it('verify if has a breadcrumb', () => {
    expect(component.find('Breadcrumb').exists()).toBe(true);
  });

  it('verify if has a page title', () => {
    expect(component.find('PageTitle').exists()).toBe(true);
  });
});
