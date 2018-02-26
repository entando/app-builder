import React from 'react';

import 'test/enzyme-init';
import { shallow } from 'enzyme';
import PageTreePage from 'ui/page-tree-page/PageTreePage';


describe('ui/page-tree-page/PageTreePage', () => {
  beforeEach(jest.clearAllMocks);

  let component;
  beforeEach(() => {
    component = shallow(<PageTreePage />);
  });

  it('renders without crashing', () => {
    expect(component.exists()).toBe(true);
  });

  it('is an InternalPage', () => {
    expect(component.is('InternalPage')).toBe(true);
  });

  it('has the PageTreePage class', () => {
    expect(component.hasClass('PageTreePage')).toBe(true);
  });
});
