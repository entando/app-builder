import React from 'react';
import 'test/enzyme-init';
import { shallow } from 'enzyme';

import CategoryTabs from 'ui/digital-exchange/CategoryTabs';
import { mapStateToProps, mapDispatchToProps } from 'ui/digital-exchange/CategoryTabsContainer';
import { LIST_DE_CATEGORIES_OK } from 'test/mocks/digital-exchange/categories';
import { fetchDECategories } from 'state/digital-exchange/categories/actions';
import { fetchDEComponents, setDEFilters } from 'state/digital-exchange/components/actions';
import { convertToQueryString, FILTER_OPERATORS } from '@entando/utils';

const TEST_STATE = {
  digitalExchangeCategories: { list: LIST_DE_CATEGORIES_OK },
};

jest.mock('state/digital-exchange/components/actions', () => ({
  fetchDEComponents: jest.fn(),
  setDEFilters: jest.fn(),
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
    />);
  });

  it('renders without crashing', () => {
    expect(component.exists()).toEqual(true);
  });

  it('maps digitalExchangeCategories property state', () => {
    expect(mapStateToProps(TEST_STATE)).toEqual({
      digitalExchangeCategories: TEST_STATE.digitalExchangeCategories.list,
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
      const FIELD_OPERATORS = { category: FILTER_OPERATORS.LIKE };
      const category = 'category';
      const filters = {
        formValues: { type: [category] },
        operators: FIELD_OPERATORS,
      };

      props.onSelect(category);
      expect(dispatchMock).toHaveBeenCalled();
      expect(setDEFilters).toHaveBeenCalled();
      expect(fetchDEComponents)
        .toHaveBeenCalledWith({ page: 1, pageSize: 10 }, convertToQueryString(filters));
    });
  });
});
