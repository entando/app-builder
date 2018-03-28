import React from 'react';
import 'test/enzyme-init';

import { shallow } from 'enzyme';

import DetailGroupPage from 'ui/groups/detail/DetailGroupPage';

describe('DetailGroupPage', () => {
  let component;
  beforeEach(() => {
    component = shallow(<DetailGroupPage />);
  });

  it('renders without crashing', () => {
    expect(component.exists()).toBe(true);
  });

  it('verify if InternalPage component has class DetailGroupPage', () => {
    expect(component.find('InternalPage').hasClass('DetailGroupPage')).toBe(true);
  });

  it('verify if has a breadcrumb', () => {
    expect(component.find('Breadcrumb').exists());
  });

  it('verify if has a page title', () => {
    expect(component.find('PageTitle').exists());
  });
});
