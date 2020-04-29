import React from 'react';

import 'test/enzyme-init';
import { shallow } from 'enzyme';
import PageTemplateEditPage from 'ui/page-templates/edit/PageTemplateEditPage';


describe('PageTemplateEditPage', () => {
  beforeEach(jest.clearAllMocks);

  let component;
  beforeEach(() => {
    component = shallow(<PageTemplateEditPage />);
  });

  it('renders without crashing', () => {
    expect(component.exists()).toBe(true);
  });

  it('is an InternalPage', () => {
    expect(component.first().is('InternalPage')).toBe(true);
  });

  it('has the PageTemplateEditPage class', () => {
    expect(component.first().hasClass('PageTemplateEditPage')).toBe(true);
  });
});
