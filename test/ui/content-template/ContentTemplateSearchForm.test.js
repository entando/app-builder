import React from 'react';
import { mount } from 'enzyme';
import { DropdownButton } from 'patternfly-react';
import { configEnzymeAdapter, mockRenderWithIntlAndStore } from 'test/legacyTestUtils';

import RenderSearchFormInput from 'ui/common/form/RenderSearchFormInput';
import ContentTemplateSearchForm from 'ui/content-template/ContentTemplateSearchForm';

configEnzymeAdapter();

jest.unmock('react-redux');
jest.unmock('redux-form');

const PROPS = {
  onDidMount: jest.fn(),
  handleSubmit: jest.fn(),
  selectOptions: [{
    label: 'Yo',
    value: 'yo',
  }],
  selectedAttribute: {
    label: 'Yo',
    value: 'yo',
  },
  onChangeSearchType: () => {},
};

describe('ui/content-template/ContentTemplateSearchForm', () => {
  const component = mount(mockRenderWithIntlAndStore(<ContentTemplateSearchForm {...PROPS} />));

  it('renders without crashing and called onDidMount', () => {
    expect(component.exists()).toEqual(true);
    expect(PROPS.onDidMount).toHaveBeenCalled();
  });

  it('contains the dropdown field', () => {
    const element = component.find(DropdownButton);
    expect(element.exists()).toBe(true);
    expect(element.hasClass('ContentTemplateList__filter-searchby-dropdown')).toBe(true);
  });

  it('contains the keyword field', () => {
    const element = component.find('Field[name="keyword"]');
    expect(element.exists()).toBe(true);
    const props = element.at(0).props();
    expect(props).toHaveProperty('component', RenderSearchFormInput);
  });

  it('contains the submit button', () => {
    const element = component.find('Button[type="submit"]');
    expect(element.exists()).toBe(true);
    expect(element.hasClass('ContentTemplateList__searchform--button')).toBe(true);
  });
});
