import React from 'react';

import 'test/enzyme-init';
import { shallow } from 'enzyme';
import { PageTemplateClonePageBody } from 'ui/page-templates/clone/PageTemplateClonePage';


describe('PageTemplateClonePage', () => {
  beforeEach(jest.clearAllMocks);

  let component;
  beforeEach(() => {
    component = shallow(<PageTemplateClonePageBody />);
  });

  it('renders without crashing', () => {
    expect(component.exists()).toBe(true);
  });

  it('is an InternalPage', () => {
    expect(component.first().is('InternalPage')).toBe(true);
  });

  it('has the PageTemplateClonePage class', () => {
    expect(component.first().hasClass('PageTemplateClonePage')).toBe(true);
  });
});
