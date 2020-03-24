import React from 'react';

import 'test/enzyme-init';
import { shallow } from 'enzyme';
import LanguageSelect from 'ui/internal-page/LanguageSelect';

const component = shallow(<LanguageSelect currentLanguage="en" onSelect={() => {}} />);

describe('LanguageSelect', () => {
  it('renders without crashing', () => {
    expect(component.exists()).toBe(true);
  });

  it('verify it contains select and options', () => {
    expect(component.find('select')).toHaveLength(1);
    expect(component.find('option')).toHaveLength(2);
  });
});
