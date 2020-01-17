import React from 'react';
import { mount } from 'enzyme';
import { DropdownButton } from 'patternfly-react';


import RenderSearchFormInput from 'ui/common/form/RenderSearchFormInput';
import ContentModelSearchForm from 'ui/widgets/config/forms/ContentModelSearchForm';

import { mockRenderWithIntl, configEnzymeAdapter } from './help';

configEnzymeAdapter();

/* removing this has errors of imported intl functions to be undefined */
jest.unmock('react-intl');

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

describe('ui/content-model/ContentModelSearchForm', () => {
  const component = mount(mockRenderWithIntl(<ContentModelSearchForm {...PROPS} />));

  it('renders without crashing and called onDidMount', () => {
    expect(component.exists()).toEqual(true);
    expect(PROPS.onDidMount).toHaveBeenCalled();
  });

  it('contains the dropdown field', () => {
    const element = component.find(DropdownButton);
    expect(element.exists()).toBe(true);
    expect(element.hasClass('ContentModelList__filter-searchby-dropdown')).toBe(true);
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
    expect(element.hasClass('SearchForm__button')).toBe(true);
  });
});
