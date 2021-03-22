import React from 'react';
import 'test/enzyme-init';
import { mount } from 'enzyme';

import RatingFilter from 'ui/component-repository/RatingFilter';
import { mapDispatchToProps } from 'ui/component-repository/RatingFilterContainer';
import { filterByRating } from 'state/component-repository/actions';
import { mockRenderWithIntlAndStore } from 'test/legacyTestUtils';

jest.mock('state/component-repository/actions', () => ({
  filterByRating: jest.fn(),
}));

jest.mock('state/loading/selectors', () => ({
  getLoading: jest.fn(),
}));

const dispatchMock = jest.fn();

jest.unmock('react-redux');

describe('RatingFilter', () => {
  let component;
  let onSelect;
  beforeEach(() => {
    onSelect = jest.fn();
    component = mount(mockRenderWithIntlAndStore(<RatingFilter onSelect={onSelect} />));
  });

  it('should render without crashing', () => {
    expect(component.exists()).toEqual(true);
  });

  it('should render by default 5 rating filter items', () => {
    expect(component.find('RatingFilterItem')).toHaveLength(5);
  });

  it('should select a filter item', () => {
    component.find(RatingFilter).childAt(0).instance().toggleRatingFilter(3);
    expect(onSelect).toHaveBeenCalledWith(3);
  });

  describe('mapDispatchToProps', () => {
    let props;
    beforeEach(() => {
      props = mapDispatchToProps(dispatchMock);
    });

    it('should map the correct function properties', () => {
      expect(props.onSelect).toBeDefined();
    });

    it('should dispatch an action if a star filter is selected', () => {
      const rating = 4;
      props.onSelect(rating);
      expect(dispatchMock).toHaveBeenCalled();
      expect(filterByRating).toHaveBeenCalledWith(rating);
    });
  });
});
