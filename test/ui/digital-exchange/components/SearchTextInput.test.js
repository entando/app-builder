import React from 'react';
import 'test/enzyme-init';
import { shallow } from 'enzyme';

import SearchTextInput from 'ui/digital-exchange/components/SearchTextInput';

describe('SearchTextInput', () => {
  let component;
  beforeEach(() => {
    component = shallow(<SearchTextInput filled={false} />);
  });

  it('renders without crashing', () => {
    expect(component.exists()).toEqual(true);
  });
});
