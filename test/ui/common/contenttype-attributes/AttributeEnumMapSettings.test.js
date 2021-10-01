import React from 'react';

import { configEnzymeAdapter, addReduxForm, mockRenderWithIntl } from 'testutils/helpers';
import { mount } from 'enzyme';
import AttributeEnumMapSettingsBody, {
  elements as elementValidation,
} from 'ui/common/contenttype-attributes/AttributeEnumMapSettings';
import RenderTextInput from 'ui/common/form/RenderTextInput';
import { required } from '@entando/utils';

const DATA = { code: 'code', descr: 'descr' };

configEnzymeAdapter();

const AttributeEnumMapSettings = addReduxForm(AttributeEnumMapSettingsBody);

describe('AttributeEnumMapSettings', () => {
  let component;
  beforeEach(() => {
    component = mount(
      mockRenderWithIntl(<AttributeEnumMapSettings enumeratorMapExtractorBeans={[DATA]} />),
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
    const props = element.at(0).props();
    expect(props).toHaveProperty('component', RenderTextInput);
    expect(props).toHaveProperty('validate', [required, elementValidation]);
  });

  it('has a enumeratorStaticItemsSeparator text field', () => {
    const element = component.find('Field[name="enumeratorStaticItemsSeparator"]');
    expect(element.exists()).toBe(true);
    const props = element.at(0).props();
    expect(props).toHaveProperty('component', RenderTextInput);
  });
});
