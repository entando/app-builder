import React from 'react';
import 'test/enzyme-init';
import { shallow } from 'enzyme';
import MarketplaceFilterContainer from 'ui/digital-exchange/MarketplaceFilterContainer';
import RatingFilterContainer from 'ui/digital-exchange/RatingFilterContainer';
import CategoryFilterContainer from 'ui/digital-exchange/CategoryFilterContainer';

import Sidebar from 'ui/digital-exchange/Sidebar';

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
      <MarketplaceFilterContainer />,
      <RatingFilterContainer />,
      <CategoryFilterContainer />,
    ]));
  });
});
