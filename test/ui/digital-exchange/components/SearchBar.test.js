import React from 'react';
import 'test/enzyme-init';
import { shallow } from 'enzyme';

import SearchBar from 'ui/digital-exchange/components/SearchBar';

describe('SearchBar', () => {
  let component;
  beforeEach(() => {
    component = shallow(<SearchBar />);
  });

  it('renders without crashing', () => {
    expect(component.exists()).toEqual(true);
  });
});
