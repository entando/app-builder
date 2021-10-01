import React from 'react';
import { mount } from 'enzyme';

import {
  configEnzymeAdapter,
  mockRenderWithIntl,
  mockRenderWithRouter,
  createMockHistory,
} from 'testutils/helpers';

import ContentSettingsPage from 'ui/content-settings/ContentSettingsPage';
import ContentSettingsGeneralContainer from 'ui/content-settings/ContentSettingsGeneralContainer';
import ContentSettingsCropRatiosContainer from 'ui/content-settings/ContentSettingsCropRatiosContainer';
import AddContentSettingsMetadataContainer from 'ui/content-settings/metadata/AddContentSettingsMetadataContainer';
import ContentSettingsMetadataListContainer from 'ui/content-settings/metadata/ContentSettingsMetadataListContainer';

configEnzymeAdapter();

const initState = {
  loading: {},
  modal: { visibleModal: '', info: {} },
  messages: {
    errors: [],
  },
  apps: {
    cms: {
      contentSettings: {
        cropRatios: [],
      },
    },
  },
};

let component;

describe('content-settings/ContentSettingsPage', () => {
  beforeEach(() => {
    component = mount(
      mockRenderWithRouter(
        mockRenderWithIntl(<ContentSettingsPage />, initState),
        createMockHistory(),
      ),
    );
  });

  it('renders without crashing', () => {
    expect(component.exists()).toBe(true);
  });

  it('has CardGrid', () => {
    expect(component.find('CardGrid').exists()).toBe(true);
  });

  it('contains ContentSettingsGeneralContainer', () => {
    expect(component.find(ContentSettingsGeneralContainer).exists()).toBe(true);
  });

  it('contains ContentSettingsCropRatiosContainer', () => {
    expect(component.find(ContentSettingsCropRatiosContainer).exists()).toBe(true);
  });

  it('contains AddContentSettingsMetadataContainer', () => {
    expect(component.find(AddContentSettingsMetadataContainer).exists()).toBe(true);
  });

  it('contains ContentSettingsMetadataListContainer', () => {
    expect(component.find(ContentSettingsMetadataListContainer).exists()).toBe(true);
  });
});
