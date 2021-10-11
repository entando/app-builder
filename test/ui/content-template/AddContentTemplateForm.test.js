import React from 'react';
import { mount, shallow } from 'enzyme';
import { configEnzymeAdapter, mockRenderWithIntlAndStore } from 'test/legacyTestUtils';
import { injectIntl } from 'react-intl';

import RenderTextInput from 'ui/common/form/RenderTextInput';
import RenderDropdownTypeaheadInput from 'ui/common/form/RenderDropdownTypeaheadInput';
import RenderContentTemplateInput from 'ui/common/form/RenderContentTemplateInput';
import AddContentTemplateForm from 'ui/content-template/AddContentTemplateForm';

configEnzymeAdapter();

jest.unmock('react-redux');
jest.unmock('redux-form');

const PROPS = {
  onDidMount: jest.fn(),
  handleSubmit: jest.fn(),
  onDidUnmount: () => {},
  contentTypes: [
    { code: 'Hello' },
    { code: 'World' },
  ],
  dictionary: [{
    caption: 'echos',
    value: 'chos',
    score: 10000,
    meta: 'chos Object',
  }],
};

const STATE = {
  modal: { visibleModal: '', info: { key: 'yo' } },
};

describe('content-template/AddContentTemplateForm', () => {
  const InjectedAddContentTemplateForm = injectIntl(AddContentTemplateForm);
  const component = mount(mockRenderWithIntlAndStore(<InjectedAddContentTemplateForm {...PROPS} />, STATE));

  it('renders without crashing', () => {
    expect(component.exists()).toEqual(true);
  });

  it('called onDidMount', () => {
    expect(PROPS.onDidMount).toHaveBeenCalled();
  });

  it('contains the modal', () => {
    const element = component.find('Modal');
    expect(element.exists()).toBe(true);
    const openModalBtn = component.find('.AddContentTemplateForm__editassistbtn').at(0);
    expect(openModalBtn.exists()).toBe(true);
  });

  it('contains the id, descr, contentType, and stylesheet field', () => {
    const field1 = component.find('Field[name="id"]');
    const props1 = field1.at(0).props();

    const field2 = component.find('Field[name="descr"]');
    const props2 = field2.at(0).props();

    const field3 = component.find('Field[name="contentType"]');
    const props3 = field3.at(0).props();

    const field4 = component.find('Field[name="stylesheet"]');
    const props4 = field4.at(0).props();

    expect(field1.exists()).toBe(true);
    expect(props1).toHaveProperty('component', RenderTextInput);
    expect(field2.exists()).toBe(true);
    expect(props2).toHaveProperty('component', RenderTextInput);
    expect(field3.exists()).toBe(true);
    expect(props3).toHaveProperty('component', RenderDropdownTypeaheadInput);
    expect(field4.exists()).toBe(true);
    expect(props4).toHaveProperty('component', RenderTextInput);
  });

  it('contains the model field', () => {
    const element = component.find('Field[name="contentShape"]');
    expect(element.exists()).toBe(true);
    const props = element.at(0).props();
    expect(props).toHaveProperty('component', RenderContentTemplateInput);
  });
});
