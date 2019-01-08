import React from 'react';
import 'test/enzyme-init';
import { shallow } from 'enzyme';

import MarketplaceFilter from 'ui/digital-exchange/MarketplaceFilter';
import { mapStateToProps, mapDispatchToProps } from 'ui/digital-exchange/MarketplaceFilterContainer';
import { LIST_DE_MARKETPLACES_OK } from 'test/mocks/digital-exchange/marketplaces';
import { fetchDEMarketplaces } from 'state/digital-exchange/marketplaces/actions';
import { filterByDEMarketplaces } from 'state/digital-exchange/actions';

const TEST_STATE = {
  digitalExchangeMarketplaces: {
    list: LIST_DE_MARKETPLACES_OK,
  },
  digitalExchangeCategories: {
    list: [],
    selected: {},
  },
  digitalExchangeComponents: {
    list: [],
    selected: {},
    componentListViewMode: '',
    filters: {},
  },
};

jest.mock('state/digital-exchange/marketplaces/actions', () => ({
  fetchDEMarketplaces: jest.fn(),
}));

jest.mock('state/loading/selectors', () => ({
  getLoading: jest.fn(),
}));

jest.mock('state/digital-exchange/actions', () => ({
  filterByDEMarketplaces: jest.fn(),
}));

const dispatchMock = jest.fn();


describe('MarketplaceFilter', () => {
  let component;
  beforeEach(() => {
    component = shallow(<MarketplaceFilter />);
  });

  it('renders without crashing', () => {
    expect(component.exists()).toEqual(true);
  });

  it('maps digitalExchangeMarketplaces property state in MarketplaceFilter', () => {
    expect(mapStateToProps(TEST_STATE)).toEqual({
      digitalExchangeMarketplaces: TEST_STATE.digitalExchangeMarketplaces.list,
      initialValues: { marketplaces: [] },
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
      expect(fetchDEMarketplaces).toHaveBeenCalled();
    });

    it('should dispatch an action if filter is checked', () => {
      const marketplaces = ['Entando'];
      props.onChange({ marketplaces });
      expect(dispatchMock).toHaveBeenCalled();
      expect(filterByDEMarketplaces).toHaveBeenCalledWith(marketplaces);
    });
  });
});
