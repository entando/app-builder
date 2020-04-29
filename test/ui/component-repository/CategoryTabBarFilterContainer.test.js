import React from 'react';
import 'test/enzyme-init';
import { shallow } from 'enzyme';

import TabBarFilter from 'ui/component-repository/common/TabBarFilter';
import { mapDispatchToProps, mapStateToProps } from 'ui/component-repository/CategoryTabBarFilterContainer';
import { LIST_ECR_CATEGORIES_OK } from 'test/mocks/component-repository/categories';
import { ALL_CATEGORIES_CATEGORY, COMPONENT_REPOSITORY_CATEGORIES } from 'state/component-repository/categories/const';

import { navigateECRCategory } from 'state/component-repository/actions';
import { getSelectedECRCategory } from 'state/component-repository/categories/selectors';


const TEST_STATE = {
  componentRepositories: {
    list: [],
  },
  componentRepositoryCategories: {
    list: LIST_ECR_CATEGORIES_OK,
    selected: 'pageTemplate',
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

jest.mock('state/loading/selectors', () => ({
  getLoading: jest.fn(),
}));

jest.mock('state/component-repository/actions', () => ({
  navigateECRCategory: jest.fn(),
}));

const dispatchMock = jest.fn();


const filterTabs = [ALL_CATEGORIES_CATEGORY, ...COMPONENT_REPOSITORY_CATEGORIES].map(filterTab => ({
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
      expect(props.onSelect).toBeDefined();
    });

    it('should dispatch an action if filter is checked', () => {
      const category = ['category'];
      props.onSelect(category);
      expect(dispatchMock).toHaveBeenCalled();
      expect(navigateECRCategory).toHaveBeenCalledWith(category);
    });
  });
});
