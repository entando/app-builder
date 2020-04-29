import React from 'react';
import 'test/enzyme-init';
import { shallow } from 'enzyme';
import StarRating from 'ui/component-repository/common/StarRating';

describe('StarRating', () => {
  let component;
  beforeEach(() => {
    component = shallow(<StarRating rating={4} />);
  });

  it('renders without crashing', () => {
    expect(component.exists()).toEqual(true);
  });
});
