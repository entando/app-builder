import React from 'react';

import 'test/enzyme-init';
import { shallow } from 'enzyme';
import { PageTemplateAddPageBody } from 'ui/page-templates/add/PageTemplateAddPage';


describe('PageTemplateAddPage', () => {
  beforeEach(jest.clearAllMocks);

  let component;
  beforeEach(() => {
    component = shallow(<PageTemplateAddPageBody />);
  });

  it('renders without crashing', () => {
    expect(component.exists()).toBe(true);
  });

  it('is an InternalPage', () => {
    expect(component.first().is('InternalPage')).toBe(true);
  });

  it('has the PageTemplateAddPage class', () => {
    expect(component.first().hasClass('PageTemplateAddPage')).toBe(true);
  });
});
