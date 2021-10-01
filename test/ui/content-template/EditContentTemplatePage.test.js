import React from 'react';
import { shallow } from 'enzyme';

import { configEnzymeAdapter } from 'testutils/helpers';

import EditContentTemplatePage from 'ui/content-template/EditContentTemplatePage';
import EditContentTemplateFormContainer from 'ui/content-template/EditContentTemplateFormContainer';

configEnzymeAdapter();

let component;

describe('ui/content-template/EditContentTemplatePage', () => {
  beforeEach(() => {
    component = shallow(<EditContentTemplatePage />);
  });

  it('renders without crashing', () => {
    expect(component.exists()).toBe(true);
  });

  it('is Grid', () => {
    expect(component.is('Grid')).toBe(true);
  });

  it('contains AddContentTemplateFormContainer', () => {
    expect(component.find(EditContentTemplateFormContainer).exists()).toBe(true);
  });
});
