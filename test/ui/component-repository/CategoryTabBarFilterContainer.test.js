import React from 'react';
import 'test/enzyme-init';
import { shallow } from 'enzyme';

import TabBarFilter from 'ui/component-repository/common/TabBarFilter';
import { mapDispatchToProps, mapStateToProps } from 'ui/component-repository/CategoryTabBarFilterContainer';
import { LIST_ECR_CATEGORIES_OK } from 'test/mocks/component-repository/categories';
import { ALL_CATEGORIES_CATEGORY } from 'state/component-repository/categories/const';

import { fetchECRCategories } from 'state/component-repository/categories/actions';
import { navigateECRCategory } from 'state/component-repository/actions';
import { getSelectedECRCategory } from 'state/component-repository/categories/selectors';


const TEST_STATE = {
  componentRepositories: {
    list: [],
  },
  componentRepositoryCategories: {
    list: LIST_ECR_CATEGORIES_OK,
    selected: 'pageModel',
  },
  componentRepositoryComponents: {
    list: [],
    selected: {},
    componentListViewMode: '',
    filters: {},
  },
};


jest.mock('state/component-repository/actions', () => ({
  filterByECRCategories: jest.fn(),
}));

jest.mock('state/component-repository/categories/actions', () => ({
  fetchECRCategories: jest.fn(),
}));

jest.mock('state/loading/selectors', () => ({
  getLoading: jest.fn(),
}));

jest.mock('state/component-repository/actions', () => ({
  navigateECRCategory: jest.fn(),
}));

const dispatchMock = jest.fn();


const filterTabs = [ALL_CATEGORIES_CATEGORY, ...LIST_ECR_CATEGORIES_OK].map(filterTab => ({
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
        componentId: 'ecr-category-tabs',
      }}
      onSelect={() => { }}
    />);
  });

  it('renders without crashing', () => {
    expect(component.exists()).toEqual(true);
  });

  it('maps componentRepositoryCategories property state', () => {
    expect(mapStateToProps(TEST_STATE, {
      intl: {
        formatMessage: () => {},
      },
    })).toEqual({
      filterTabs,
      selectedFilterTab: getSelectedECRCategory(TEST_STATE) || ALL_CATEGORIES_CATEGORY,
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

    it('should dispatch an action if filter is checked', () => {
      const category = ['category'];
      props.onSelect(category);
      expect(dispatchMock).toHaveBeenCalled();
      expect(navigateECRCategory).toHaveBeenCalledWith(category);
    });
  });
});
