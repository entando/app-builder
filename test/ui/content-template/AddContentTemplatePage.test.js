import React from 'react';
import { shallow } from 'enzyme';

import { configEnzymeAdapter } from 'test/legacyTestUtils';

import AddContentTemplatePage from 'ui/content-template/AddContentTemplatePage';
import AddContentTemplateFormContainer from 'ui/content-template/AddContentTemplateFormContainer';

configEnzymeAdapter();

let component;

describe('ui/content-template/AddContentTemplatePage', () => {
  beforeEach(() => {
    component = shallow(<AddContentTemplatePage />);
  });

  it('renders without crashing', () => {
    expect(component.exists()).toBe(true);
  });

  it('is an InternalPage', () => {
    expect(component.is('InternalPage')).toBe(true);
  });

  it('contains AddContentTemplateFormContainer', () => {
    expect(component.find(AddContentTemplateFormContainer).exists()).toBe(true);
  });
});
