import React from 'react';
import { mount } from 'enzyme';
import {
  CONTENT_SETTINGS_OK_MAPPED as metadata,
  CONTENT_SETTINGS_OK_FORMED as initialValues,
} from 'test/mocks/contentSettings';
import { configEnzymeAdapter, mockRenderWithIntlAndStore } from 'test/legacyTestUtils';

import RenderTextInput from 'ui/common/form/RenderTextInput';
import ContentSettingsMetadataList from 'ui/content-settings/metadata/ContentSettingsMetadataList';

configEnzymeAdapter();
jest.unmock('react-redux');
jest.unmock('react-intl');
jest.unmock('redux-form');

const PROPS = {
  metadata,
  loadings: {
    legend: '',
    alt: '',
    description: '',
    title: '',
  },
  initialValues,
  handleSubmit: jest.fn(),
  onPromptDelete: jest.fn(),
};

const STATE = {
  modal: { visibleModal: '', info: { key: 'yo' } },
};

describe('content-settings/metadata/ContentSettingsMetadataList', () => {
  const component = mount(mockRenderWithIntlAndStore(<ContentSettingsMetadataList {...PROPS} />, STATE));

  it('renders without crashing', () => {
    expect(component.exists()).toEqual(true);
  });

  it('contains the meta textfields', () => {
    const field1 = component.find('Field[name="legend"]');
    const props1 = field1.at(0).props();

    const field2 = component.find('Field[name="alt"]');
    const props2 = field2.at(0).props();

    const field3 = component.find('Field[name="description"]');
    const props3 = field3.at(0).props();

    const field4 = component.find('Field[name="title"]');
    const props4 = field4.at(0).props();

    expect(field1.exists()).toBe(true);
    expect(props1).toHaveProperty('component', RenderTextInput);
    expect(field2.exists()).toBe(true);
    expect(props2).toHaveProperty('component', RenderTextInput);
    expect(field3.exists()).toBe(true);
    expect(props3).toHaveProperty('component', RenderTextInput);
    expect(field4.exists()).toBe(true);
    expect(props4).toHaveProperty('component', RenderTextInput);
  });
});
