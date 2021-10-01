import React from 'react';
import { shallow } from 'enzyme';

import { configEnzymeAdapter } from 'testutils/helpers';

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

  it('is Grid', () => {
    expect(component.is('Grid')).toBe(true);
  });

  it('contains AddContentTemplateFormContainer', () => {
    expect(component.find(AddContentTemplateFormContainer).exists()).toBe(true);
  });
});
