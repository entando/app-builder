import React from 'react';

import 'test/enzyme-init';
import { shallow } from 'enzyme';
import DetailFragmentPage from 'ui/fragments/detail/DetailFragmentPage';


describe('DetailFragmentPage', () => {
  let component;
  beforeEach(() => {
    component = shallow(<DetailFragmentPage />);
  });
  it('renders without crashing', () => {
    expect(component.exists()).toEqual(true);
  });

  it('verify if exist InternalPage with class DetailFragmentPage', () => {
    expect(component.find('InternalPage').hasClass('DetailFragmentPage')).toEqual(true);
  });

  describe('functions', () => {
    it('body', () => {
      const result = component.instance().body();
      console.log(result);
    });
  });
});
