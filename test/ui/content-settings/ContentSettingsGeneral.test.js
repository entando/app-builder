import React from 'react';
import { mount } from 'enzyme';

import { configEnzymeAdapter, mockRenderWithIntl } from 'testutils/helpers';

import { Button } from 'patternfly-react';
import RadioInput from 'ui/common/form/RenderRadioInput';
import ContentSettingsGeneral from 'ui/content-settings/ContentSettingsGeneral';

configEnzymeAdapter();

const PROPS = {
  indexesLastReloadDate: '11/11/2018 11:11',
  indexesLastReloadResult: true,
  indexesStatus: 0,
  referencesStatus: 0,
  editorSettings: {
    label: 'CKEditor',
    key: 'fckeditor',
  },
  onDidMount: jest.fn(),
  onReloadReferences: () => {},
  onReloadIndexes: () => {},
  onEditorChange: () => {},
};

describe('ui/content-settings/ContentSettingsGeneral', () => {
  const component = mount(mockRenderWithIntl(<ContentSettingsGeneral {...PROPS} />));

  it('renders without crashing and calls onDidMount', () => {
    expect(component.exists()).toEqual(true);
    expect(PROPS.onDidMount).toHaveBeenCalled();
  });

  it('contains the Button and RadioInput field', () => {
    const element = component.find(Button);
    expect(element.exists()).toBe(true);
    const element2 = component.find(RadioInput);
    expect(element2.exists()).toBe(true);
  });
});
