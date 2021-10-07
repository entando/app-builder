import React from 'react';
import { configEnzymeAdapter, addReduxForm, mockRenderWithIntlAndStore } from 'test/legacyTestUtils';
import { mount } from 'enzyme';
import AttributeEnumMapSettings, {
  elements as elementValidation,
} from 'ui/common/contenttype-attributes/AttributeEnumMapSettings';
import RenderTextInput from 'ui/common/form/RenderTextInput';
import { required } from '@entando/utils';

const DATA = { code: 'code', descr: 'descr' };

configEnzymeAdapter();
jest.unmock('react-redux');

describe('AttributeEnumMapSettings', () => {
  let component;
  beforeEach(() => {
    component = mount(
      mockRenderWithIntlAndStore(<AttributeEnumMapSettings enumeratorMapExtractorBeans={[DATA]} />),
    );
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
