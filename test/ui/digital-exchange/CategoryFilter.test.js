import React from 'react';
import 'test/enzyme-init';
import { shallow } from 'enzyme';

import CategoryFilter from 'ui/digital-exchange/CategoryFilter';
import { mapStateToProps, mapDispatchToProps } from 'ui/digital-exchange/CategoryFilterContainer';
import { LIST_DE_CATEGORIES_OK } from 'test/mocks/digital-exchange/categories';
import { fetchDECategories } from 'state/digital-exchange/categories/actions';
import { filterByDECategories } from 'state/digital-exchange/actions';

const TEST_STATE = {
  digitalExchangeMarketplaces: {
    list: [],
  },
  digitalExchangeCategories: {
    list: LIST_DE_CATEGORIES_OK,
    selected: {},
  },
  digitalExchangeComponents: {
    list: [],
    selected: {},
    componentListViewMode: '',
    filters: {},
  },
};

jest.mock('state/digital-exchange/actions', () => ({
  filterByDECategories: jest.fn(),
}));

jest.mock('state/digital-exchange/categories/actions', () => ({
  fetchDECategories: jest.fn(),
}));

jest.mock('state/loading/selectors', () => ({
  getLoading: jest.fn(),
}));

const dispatchMock = jest.fn();


describe('CategoryFilter', () => {
  let component;
  beforeEach(() => {
    component = shallow(<CategoryFilter />);
  });

  it('renders without crashing', () => {
    expect(component.exists()).toEqual(true);
  });

  it('maps digitalExchangeCategories property state', () => {
    expect(mapStateToProps(TEST_STATE)).toEqual({
      digitalExchangeCategories: TEST_STATE.digitalExchangeCategories.list,
      initialValues: { categories: [] },
    });
  });

  describe('mapDispatchToProps', () => {
    let props;
    beforeEach(() => {
      props = mapDispatchToProps(dispatchMock);
    });

    it('should map the correct function properties', () => {
      expect(props.onWillMount).toBeDefined();
      expect(props.onChange).toBeDefined();
    });

    it('should dispatch an action if onWillMount is called', () => {
      props.onWillMount({});
      expect(dispatchMock).toHaveBeenCalled();
      expect(fetchDECategories).toHaveBeenCalled();
    });

    it('should dispatch an action if filter is checked', () => {
      const categories = ['category'];
      props.onChange({ categories });
      expect(dispatchMock).toHaveBeenCalled();
      expect(filterByDECategories).toHaveBeenCalledWith(categories);
    });
  });
});
