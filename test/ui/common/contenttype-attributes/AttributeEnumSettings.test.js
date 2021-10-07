import React from 'react';
import { configEnzymeAdapter, mockRenderWithIntlAndStore } from 'test/legacyTestUtils';
import { mount } from 'enzyme';
import AttributeEnumSettings, { element as elementValidation } from 'ui/common/contenttype-attributes/AttributeEnumSettings';
import RenderTextInput from 'ui/common/form/RenderTextInput';
import { required } from '@entando/utils';

configEnzymeAdapter();
jest.unmock('react-redux');

describe('AttributeEnumSettings', () => {
  let component;
  beforeEach(() => {
    component = mount(mockRenderWithIntlAndStore(<AttributeEnumSettings />));
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

  it('has a enumeratorStaticItemsSeparator text field', () => {
    const element = component.find('Field[name="enumeratorStaticItemsSeparator"]');
    expect(element.exists()).toBe(true);
    const props = element.props();
    expect(props).toHaveProperty('component', RenderTextInput);
  });
});
