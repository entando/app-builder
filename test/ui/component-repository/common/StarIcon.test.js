import React from 'react';
import 'test/enzyme-init';
import { shallow } from 'enzyme';
import StarIcon from 'ui/component-repository/common/StarIcon';

describe('StarIcon', () => {
  let component;
  beforeEach(() => {
    component = shallow(<StarIcon />);
  });

  it('renders without crashing', () => {
    expect(component.exists()).toEqual(true);
  });

  it('should render filled UI state', () => {
    component = shallow(<StarIcon filled />);
    expect(component.hasClass('StarIcon--filled'));
  });

  it('should not be filled by default', () => {
    component = shallow(<StarIcon />);
    expect(component.hasClass('StarIcon--filled')).toEqual(false);
  });
});
