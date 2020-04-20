import React from 'react';
import 'test/enzyme-init';
import { shallow } from 'enzyme';

import TabBarFilter from 'ui/component-repository/common/TabBarFilter';
import { mapStateToProps, mapDispatchToProps } from 'ui/component-repository/CategoryTabBarFilterContainer';
import { ALL_CATEGORIES_CATEGORY } from 'state/component-repository/categories/const';
import { LIST_ECR_CATEGORIES_OK } from 'test/mocks/component-repository/categories';
import { fetchECRCategories } from 'state/component-repository/categories/actions';
import { navigateECRCategory } from 'state/component-repository/actions';
import { mockRenderWithIntlAndStore } from 'test/testUtils';


const TEST_STATE = {
  componentRepositories: {
    list: [],
  },
  componentRepositoryCategories: {
    list: LIST_ECR_CATEGORIES_OK,
    selected: ALL_CATEGORIES_CATEGORY,
  },
  componentRepositoryComponents: {
    list: [],
    selected: {},
    componentListViewMode: '',
    filters: {},
  },
};

jest.mock('state/component-repository/actions', () => ({
  navigateECRCategory: jest.fn(),
}));

jest.mock('state/component-repository/categories/actions', () => ({
  fetchECRCategories: jest.fn(),
}));

jest.mock('state/loading/selectors', () => ({
  getLoading: jest.fn(),
}));

jest.unmock('react-redux');

const dispatchMock = jest.fn();


describe('TabBarFilter', () => {
  let component;
  let noop;

  beforeEach(() => {
    noop = jest.fn();
    component = shallow(mockRenderWithIntlAndStore(<TabBarFilter
      onSelect={noop}
      onWillMount={noop}
      filterTabs={[{
        label: 'category',
        value: 'category',
      }]}
      selectedFilterTab="all"
      attributes={{
        componentClass: 'CategoryTabs',
        componentId: 'ecr-category-tabs',
      }}
    />));
  });

  it('renders without crashing', () => {
    expect(component.exists()).toEqual(true);
  });

  it('maps componentRepositoryCategories property state', () => {
    const filterTabs = [
      ALL_CATEGORIES_CATEGORY,
      ...TEST_STATE.componentRepositoryCategories.list,
    ].map(filterTab => ({
      value: filterTab,
    }));
    expect(mapStateToProps(TEST_STATE, {
      intl: {
        formatMessage: () => {},
        injectIntl: ui => ui,
      },
    })).toEqual({
      filterTabs,
      selectedFilterTab: ALL_CATEGORIES_CATEGORY,
      attributes: {
        componentClass: 'CategoryTabs',
        componentId: 'ecr-category-tabs',
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
      expect(fetchECRCategories).toHaveBeenCalled();
    });

    it('should dispatch an action if tab is selected', () => {
      const category = 'category';
      props.onSelect(category);
      expect(dispatchMock).toHaveBeenCalled();
      expect(navigateECRCategory).toHaveBeenCalledWith(category);
    });
  });
});
