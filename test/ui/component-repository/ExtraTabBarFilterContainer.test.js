import React from 'react';
import 'test/enzyme-init';
import { shallow } from 'enzyme';

import TabBarFilter from 'ui/component-repository/common/TabBarFilter';
import { mapDispatchToProps, mapStateToProps } from 'ui/component-repository/ExtraTabBarFilterContainer';

import { getSelectedECRExtraFilter } from 'state/component-repository/extra-filters/selectors';
import { navigateECRExtraTab } from 'state/component-repository/actions';
import { fetchECRExtraFilters } from 'state/component-repository/extra-filters/actions';
import { ECR_COMPONENTS_EXTRA_FILTERS } from 'state/component-repository/extra-filters/const';


const TEST_STATE = {
  componentRepositories: {
    list: [],
  },
  componentRepositoryExtraFilters: {
    list: Object.keys(ECR_COMPONENTS_EXTRA_FILTERS),
    selected: 'explore',
  },
  componentRepositoryComponents: {
    list: [],
    selected: {},
    componentListViewMode: '',
    filters: {},
  },
};


jest.mock('state/component-repository/extra-filters/actions', () => ({
  fetchECRExtraFilters: jest.fn(),
}));

jest.mock('state/component-repository/actions', () => ({
  navigateECRExtraTab: jest.fn(),
}));

const dispatchMock = jest.fn();


const filterTabs = Object.keys(ECR_COMPONENTS_EXTRA_FILTERS).map(filterTab => ({
  label: undefined,
  value: filterTab,
}));


describe('TabBarFilter', () => {
  let component;
  beforeEach(() => {
    component = shallow(<TabBarFilter
      filterTabs={filterTabs}
      selectedFilterTab="explore"
      attributes={{
        componentClass: 'ExtraTabBarFilter',
        componentId: 'ecr-extra-tab-bar-filter',
      }}
      onSelect={() => { }}
    />);
  });

  it('renders without crashing', () => {
    expect(component.exists()).toEqual(true);
  });

  it('maps componentRepositoryExtraFilters property state', () => {
    expect(mapStateToProps(TEST_STATE, {
      intl: {
        formatMessage: () => {},
      },
    })).toEqual({
      filterTabs,
      selectedFilterTab: getSelectedECRExtraFilter(TEST_STATE) || 'explore',
      attributes: {
        componentClass: 'ExtraTabBarFilter',
        componentId: 'ecr-extra-tab-bar-filter',
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
      expect(fetchECRExtraFilters).toHaveBeenCalled();
    });

    it('should dispatch an action if filter is checked', () => {
      const extraFilter = 'explore';
      props.onSelect(extraFilter);
      expect(dispatchMock).toHaveBeenCalled();
      expect(navigateECRExtraTab).toHaveBeenCalledWith(extraFilter);
    });
  });
});
