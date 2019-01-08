import React from 'react';
import 'test/enzyme-init';
import { shallow } from 'enzyme';

import CategoryTabs from 'ui/digital-exchange/CategoryTabs';
import { mapStateToProps, mapDispatchToProps } from 'ui/digital-exchange/CategoryTabsContainer';
import { ALL_CATEGORIES_CATEGORY } from 'state/digital-exchange/categories/const';
import { LIST_DE_CATEGORIES_OK } from 'test/mocks/digital-exchange/categories';
import { fetchDECategories } from 'state/digital-exchange/categories/actions';
import { navigateDECategory } from 'state/digital-exchange/actions';


const TEST_STATE = {
  digitalExchangeMarketplaces: {
    list: [],
  },
  digitalExchangeCategories: {
    list: LIST_DE_CATEGORIES_OK,
    selected: { ALL_CATEGORIES_CATEGORY },
  },
  digitalExchangeComponents: {
    list: [],
    selected: {},
    componentListViewMode: '',
    filters: {},
  },
};

jest.mock('state/digital-exchange/actions', () => ({
  navigateDECategory: jest.fn(),
}));

jest.mock('state/digital-exchange/categories/actions', () => ({
  fetchDECategories: jest.fn(),
}));

jest.mock('state/loading/selectors', () => ({
  getLoading: jest.fn(),
}));

const dispatchMock = jest.fn();


describe('CategoryTabs', () => {
  let component;
  let noop;

  beforeEach(() => {
    noop = jest.fn();
    component = shallow(<CategoryTabs
      onSelect={noop}
      onWillMount={noop}
      digitalExchangeCategories={['category']}
      selectedDECategory="category"
    />);
  });

  it('renders without crashing', () => {
    expect(component.exists()).toEqual(true);
  });

  it('maps digitalExchangeCategories property state', () => {
    expect(mapStateToProps(TEST_STATE)).toEqual({
      digitalExchangeCategories: [
        ALL_CATEGORIES_CATEGORY,
        ...TEST_STATE.digitalExchangeCategories.list,
      ],
      selectedDECategory: { ALL_CATEGORIES_CATEGORY },
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

    it('should dispatch an action if tab is selected', () => {
      const category = 'category';
      props.onSelect(category);
      expect(dispatchMock).toHaveBeenCalled();
      expect(navigateDECategory).toHaveBeenCalledWith(category);
    });
  });
});
