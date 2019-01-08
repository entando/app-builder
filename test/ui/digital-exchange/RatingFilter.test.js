import React from 'react';
import 'test/enzyme-init';
import { shallow } from 'enzyme';

import RatingFilter from 'ui/digital-exchange/RatingFilter';
import { mapDispatchToProps } from 'ui/digital-exchange/RatingFilterContainer';
import { fetchDEComponents } from 'state/digital-exchange/components/actions';
import { filterByRating } from 'state/digital-exchange/actions';

jest.mock('state/digital-exchange/actions', () => ({
  filterByRating: jest.fn(),
}));

jest.mock('state/loading/selectors', () => ({
  getLoading: jest.fn(),
}));

const dispatchMock = jest.fn();


describe('RatingFilter', () => {
  let component;
  let onSelect;
  beforeEach(() => {
    onSelect = jest.fn();
    component = shallow(<RatingFilter onSelect={onSelect} />);
  });

  it('should render without crashing', () => {
    expect(component.exists()).toEqual(true);
  });

  it('should select a filter item', () => {
    component.instance().toggleRatingFilter(3);
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
