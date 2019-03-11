import React from 'react';
import 'test/enzyme-init';
import { shallow } from 'enzyme';

import TabBarFilter from 'ui/digital-exchange/common/TabBarFilter';
import { mapDispatchToProps, mapStateToProps } from 'ui/digital-exchange/ExtraTabBarFilterContainer';

import { getSelectedDEExtraFilter } from 'state/digital-exchange/extra-filters/selectors';
import { navigateDEExtraTab } from 'state/digital-exchange/actions';
import { fetchDEExtraFilters } from 'state/digital-exchange/extra-filters/actions';
import { DE_COMPONENTS_EXTRA_FILTERS } from 'state/digital-exchange/extra-filters/const';


import { formattedText } from '@entando/utils';


const TEST_STATE = {
  digitalExchanges: {
    list: [],
  },
  digitalExchangeExtraFilters: {
    list: Object.keys(DE_COMPONENTS_EXTRA_FILTERS),
    selected: 'explore',
  },
  digitalExchangeComponents: {
    list: [],
    selected: {},
    componentListViewMode: '',
    filters: {},
  },
};


jest.mock('state/digital-exchange/extra-filters/actions', () => ({
  fetchDEExtraFilters: jest.fn(),
}));

jest.mock('state/digital-exchange/actions', () => ({
  navigateDEExtraTab: jest.fn(),
}));

const dispatchMock = jest.fn();


const filterTabs = Object.keys(DE_COMPONENTS_EXTRA_FILTERS).map(filterTab => ({
  label: formattedText(`digitalExchange.extraFilters.${filterTab}`, filterTab),
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
        componentId: 'de-extra-tab-bar-filter',
      }}
      onSelect={() => { }}
    />);
  });

  it('renders without crashing', () => {
    expect(component.exists()).toEqual(true);
  });

  it('maps digitalExchangeExtraFilters property state', () => {
    expect(mapStateToProps(TEST_STATE)).toEqual({
      filterTabs,
      selectedFilterTab: getSelectedDEExtraFilter(TEST_STATE) || 'explore',
      attributes: {
        componentClass: 'ExtraTabBarFilter',
        componentId: 'de-extra-tab-bar-filter',
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
      expect(fetchDEExtraFilters).toHaveBeenCalled();
    });

    it('should dispatch an action if filter is checked', () => {
      const extraFilter = 'explore';
      props.onSelect(extraFilter);
      expect(dispatchMock).toHaveBeenCalled();
      expect(navigateDEExtraTab).toHaveBeenCalledWith(extraFilter);
    });
  });
});
