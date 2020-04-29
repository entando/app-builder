import React from 'react';
import 'test/enzyme-init';
import { shallow } from 'enzyme';
import ComponentRepositoryFilterContainer from 'ui/component-repository/ComponentRepositoryFilterContainer';
import RatingFilterContainer from 'ui/component-repository/RatingFilterContainer';
import CategoryFilterContainer from 'ui/component-repository/CategoryFilterContainer';

import Sidebar from 'ui/component-repository/Sidebar';

describe('Sidebar', () => {
  let component;
  beforeEach(() => {
    component = shallow(<Sidebar showCategoryFilter={false} />);
  });

  it('renders without crashing', () => {
    expect(component.exists()).toEqual(true);
  });

  it('contains all filter components', () => {
    expect(component.containsAllMatchingElements([
      <ComponentRepositoryFilterContainer />,
      <RatingFilterContainer />,
      <CategoryFilterContainer />,
    ]));
  });
});
