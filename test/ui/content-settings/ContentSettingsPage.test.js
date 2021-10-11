import React from 'react';
import { shallow } from 'enzyme';
import { configEnzymeAdapter } from 'test/legacyTestUtils';

import ContentSettingsPage from 'ui/content-settings/ContentSettingsPage';
import ContentSettingsGeneralContainer from 'ui/content-settings/ContentSettingsGeneralContainer';
import ContentSettingsCropRatiosContainer from 'ui/content-settings/ContentSettingsCropRatiosContainer';
import AddContentSettingsMetadataContainer from 'ui/content-settings/metadata/AddContentSettingsMetadataContainer';
import ContentSettingsMetadataListContainer from 'ui/content-settings/metadata/ContentSettingsMetadataListContainer';

configEnzymeAdapter();

let component;

describe('content-settings/ContentSettingsPage', () => {
  beforeEach(() => {
    component = shallow(<ContentSettingsPage />);
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
