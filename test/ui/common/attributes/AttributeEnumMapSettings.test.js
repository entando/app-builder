import React from 'react';

import 'test/enzyme-init';
import { mount } from 'enzyme';
import AttributeEnumMapSettings, { elements as elementValidation } from 'ui/common/attributes/AttributeEnumMapSettings';
import RenderTextInput from 'ui/common/form/RenderTextInput';
import RenderSelectInput from 'ui/common/form/RenderSelectInput';
import { required } from '@entando/utils';
import { mockRenderWithIntlAndStore } from 'test/legacyTestUtils';

const DATA = { code: 'code', descr: 'descr' };

jest.unmock('react-redux');

describe('AttributeEnumMapSettings', () => {
  let component;
  beforeEach(() => {
    component = mount(mockRenderWithIntlAndStore(<AttributeEnumMapSettings
      enumeratorMapExtractorBeans={[DATA]}
    />));
  });

  it('renders without crashing', () => {
    expect(component.exists()).toBe(true);
  });

  it('has one Row', () => {
    expect(component.find('Row').exists()).toBe(true);
    expect(component.find('Row')).toHaveLength(1);
  });

  it('has a enumeratorStaticItems text field', () => {
    const element = component.find('Field[name="enumeratorStaticItems"]');
    expect(element.exists()).toBe(true);
    const props = element.props();
    expect(props).toHaveProperty('component', RenderTextInput);
    expect(props).toHaveProperty('validate', [required, elementValidation]);
  });

  it('has a enumeratorMapExtractorBeans select field', () => {
    const element = component.find('Field[name="enumeratorMapExtractorBeans"]');
    expect(element.exists()).toBe(true);
    const props = element.props();
    expect(props).toHaveProperty('component', RenderSelectInput);
  });

  it('has a enumeratorStaticItemsSeparator text field', () => {
    const element = component.find('Field[name="enumeratorStaticItemsSeparator"]');
    expect(element.exists()).toBe(true);
    const props = element.props();
    expect(props).toHaveProperty('component', RenderTextInput);
  });
});
