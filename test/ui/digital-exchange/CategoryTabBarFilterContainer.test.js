import React from 'react';
import 'test/enzyme-init';
import { shallow } from 'enzyme';

import TabBarFilter from 'ui/digital-exchange/common/TabBarFilter';
import { mapDispatchToProps, mapStateToProps } from 'ui/digital-exchange/CategoryTabBarFilterContainer';
import { LIST_DE_CATEGORIES_OK } from 'test/mocks/digital-exchange/categories';
import { ALL_CATEGORIES_CATEGORY } from 'state/digital-exchange/categories/const';

import { fetchDECategories } from 'state/digital-exchange/categories/actions';
import { navigateDECategory } from 'state/digital-exchange/actions';
import { getSelectedDECategory } from 'state/digital-exchange/categories/selectors';


import { formattedText } from '@entando/utils';


const TEST_STATE = {
  digitalExchanges: {
    list: [],
  },
  digitalExchangeCategories: {
    list: LIST_DE_CATEGORIES_OK,
    selected: 'pageModel',
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

jest.mock('state/digital-exchange/actions', () => ({
  navigateDECategory: jest.fn(),
}));

const dispatchMock = jest.fn();


const filterTabs = [ALL_CATEGORIES_CATEGORY, ...LIST_DE_CATEGORIES_OK].map(filterTab => ({
  label: formattedText(`digitalExchange.filterTabs.${filterTab}`, filterTab),
  value: filterTab,
}));


describe('TabBarFilter', () => {
  let component;
  beforeEach(() => {
    component = shallow(<TabBarFilter
      filterTabs={filterTabs}
      selectedFilterTab={ALL_CATEGORIES_CATEGORY}
      attributes={{
        componentClass: 'CategoryTabs',
        componentId: 'de-category-tabs',
      }}
      onSelect={() => { }}
    />);
  });

  it('renders without crashing', () => {
    expect(component.exists()).toEqual(true);
  });

  it('maps digitalExchangeCategories property state', () => {
    expect(mapStateToProps(TEST_STATE)).toEqual({
      filterTabs,
      selectedFilterTab: getSelectedDECategory(TEST_STATE) || ALL_CATEGORIES_CATEGORY,
      attributes: {
        componentClass: 'CategoryTabs',
        componentId: 'de-category-tabs',
      },
    });
  });


  describe('mapDispatchToProps', () => {
    let props;
    beforeEach(() => {
      props = mapDispatchToProps(dispatchMock);
    });

    it('should map the correct function properties', () => {
      expect(props.onWillMount).toBeDefined();
      expect(props.onSelect).toBeDefined();
    });

    it('should dispatch an action if onWillMount is called', () => {
      props.onWillMount({});
      expect(dispatchMock).toHaveBeenCalled();
      expect(fetchDECategories).toHaveBeenCalled();
    });

    it('should dispatch an action if filter is checked', () => {
      const category = ['category'];
      props.onSelect(category);
      expect(dispatchMock).toHaveBeenCalled();
      expect(navigateDECategory).toHaveBeenCalledWith(category);
    });
  });
});
