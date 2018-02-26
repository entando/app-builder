import React from 'react';

import 'test/enzyme-init';
import { shallow } from 'enzyme';
import FragmentPage from 'ui/app-pages/FragmentPage';

describe('FragmentPage', () => {
  let component;
  beforeEach(() => {
    component = shallow(<FragmentPage />);
  });
  it('renders without crashing', () => {
    expect(component.exists()).toEqual(true);
  });

  it('verify if exist InternalPage with class FragmentPage', () => {
    expect(component.find('InternalPage').hasClass('FragmentPage')).toEqual(true);
  });
});
