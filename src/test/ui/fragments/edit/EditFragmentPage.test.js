import React from 'react';

import 'test/enzyme-init';
import { shallow } from 'enzyme';
import EditFragmentPage from 'ui/fragments/edit/EditFragmentPage';

describe('EditFragmentPage', () => {
  let component;
  beforeEach(() => {
    component = shallow(<EditFragmentPage />);
  });
  it('renders without crashing', () => {
    expect(component.exists()).toEqual(true);
  });

  it('verify if exist InternalPage with class EditFragmentPage', () => {
    expect(component.find('InternalPage').hasClass('EditFragmentPage')).toEqual(true);
  });
});
