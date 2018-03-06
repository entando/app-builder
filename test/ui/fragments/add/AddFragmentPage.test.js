import React from 'react';

import 'test/enzyme-init';
import { shallow } from 'enzyme';
import AddFragmentPage from 'ui/fragments/add/AddFragmentPage';

describe('AddFragmentPage', () => {
  let component;
  beforeEach(() => {
    component = shallow(<AddFragmentPage />);
  });
  it('renders without crashing', () => {
    expect(component.exists()).toEqual(true);
  });

  it('verify if exist InternalPage with class AddFragmentPage', () => {
    expect(component.find('InternalPage').hasClass('AddFragmentPage')).toEqual(true);
  });
});
