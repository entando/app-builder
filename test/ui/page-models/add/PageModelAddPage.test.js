import React from 'react';

import 'test/enzyme-init';
import { shallow } from 'enzyme';
import PageModelAddPage from 'ui/page-models/add/PageModelAddPage';


describe('PageModelAddPage', () => {
  beforeEach(jest.clearAllMocks);

  let component;
  beforeEach(() => {
    component = shallow(<PageModelAddPage />);
  });

  it('renders without crashing', () => {
    expect(component.exists()).toBe(true);
  });

  it('is an InternalPage', () => {
    expect(component.first().is('InternalPage')).toBe(true);
  });

  it('has the PageModelAddPage class', () => {
    expect(component.first().hasClass('PageModelAddPage')).toBe(true);
  });
});
