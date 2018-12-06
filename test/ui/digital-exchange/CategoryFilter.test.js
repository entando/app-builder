import React from 'react';
import 'test/enzyme-init';
import { shallow } from 'enzyme';

import CategoryFilter from 'ui/digital-exchange/CategoryFilter';
import { mapStateToProps, mapDispatchToProps } from 'ui/digital-exchange/CategoryFilterContainer';
import { LIST_DE_CATEGORIES_OK } from 'test/mocks/digital-exchange/categories';
import { fetchDECategories } from 'state/digital-exchange/categories/actions';
import { fetchDEComponents } from 'state/digital-exchange/components/actions';
import { convertToQueryString, FILTER_OPERATORS } from '@entando/utils';

const TEST_STATE = {
  digitalExchangeCategories: { list: LIST_DE_CATEGORIES_OK },
};

jest.mock('state/digital-exchange/components/actions', () => ({
  fetchDEComponents: jest.fn(),
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

  it('maps digitalExchangeCategories property state in CategoryFilter', () => {
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
      expect(props.onChange).toBeDefined();
    });

    it('should dispatch an action if onWillMount is called', () => {
      props.onWillMount({});
      expect(dispatchMock).toHaveBeenCalled();
      expect(fetchDECategories).toHaveBeenCalled();
    });

    it('should dispatch an action if filter is checked', () => {
      const FIELD_OPERATORS = { category: FILTER_OPERATORS.LIKE };
      const categories = ['Page Models'];
      const filters = {
        formValues: { category: categories },
        operators: FIELD_OPERATORS,
      };

      props.onChange({ categories });
      expect(dispatchMock).toHaveBeenCalled();
      expect(fetchDEComponents)
        .toHaveBeenCalledWith({ page: 1, pageSize: 10 }, convertToQueryString(filters));
    });
  });
});
