import React from 'react';
import 'test/enzyme-init';
import { shallow } from 'enzyme';

import SearchForm from 'ui/common/form/SearchForm';

describe('SearchForm', () => {
  let component;
  beforeEach(() => {
    component = shallow(<SearchForm />);
  });

  it('renders without crashing', () => {
    expect(component.exists()).toEqual(true);
  });
});
