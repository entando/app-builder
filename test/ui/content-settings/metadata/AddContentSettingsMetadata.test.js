import React from 'react';
import { mount } from 'enzyme';
import { configEnzymeAdapter, mockRenderWithIntl } from 'testutils/helpers';

import RenderTextInput from 'ui/common/form/RenderTextInput';
import AddContentSettingsMetadata from 'ui/content-settings/metadata/AddContentSettingsMetadata';

configEnzymeAdapter();

const PROPS = {
  handleSubmit: () => {},
};

const STATE = {
  messages: { errors: [] },
};

describe('content-settings/metadata/AddContentSettingsMetadata', () => {
  const component = mount(mockRenderWithIntl(<AddContentSettingsMetadata {...PROPS} />, STATE));

  it('renders without crashing', () => {
    expect(component.exists()).toEqual(true);
  });

  it('contains the key and mapping field', () => {
    const field1 = component.find('Field[name="key"]');
    const props1 = field1.at(0).props();

    const field2 = component.find('Field[name="mapping"]');
    const props2 = field2.at(0).props();

    expect(field1.exists()).toBe(true);
    expect(props1).toHaveProperty('component', RenderTextInput);
    expect(field2.exists()).toBe(true);
    expect(props2).toHaveProperty('component', RenderTextInput);
  });
});
