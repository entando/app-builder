import React from 'react';
import { configEnzymeAdapter } from 'test/legacyTestUtils';
import { mount } from 'enzyme';
import AceEditor from 'react-ace';

import RenderContentTemplateInput from 'ui/common/form/RenderContentTemplateInput';

configEnzymeAdapter();

describe('ui/common/form/RenderContentTemplateInput', () => {
  const props = {
    input: {
      name: 'model',
      value: 'hello',
      onChange: jest.fn(),
      onFocus: jest.fn(),
    },
    id: 'model',
    dictionary: [{
      caption: 'echos',
      value: 'chos',
      score: 10000,
      meta: 'chos Object',
    }],
  };

  const component = mount(<RenderContentTemplateInput {...props} />);

  it('renders without crashing', () => {
    expect(component.exists()).toEqual(true);
  });

  it('AceEditor will not exist until dictionary comes in', () => {
    const el = component.find(AceEditor);
    expect(el.exists()).toEqual(false);
  });
});
