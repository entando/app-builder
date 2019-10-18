import React from 'react';
import 'test/enzyme-init';
import { shallow } from 'enzyme';

import DigitalExchangeFilter from 'ui/digital-exchange/DigitalExchangeFilter';
import {
  mapStateToProps,
  mapDispatchToProps,
} from 'ui/digital-exchange/DigitalExchangeFilterContainer';
import { LIST_DIGITAL_EXCHANGES_OK } from 'test/mocks/digital-exchange/digitalExchanges';
import { fetchDigitalExchanges } from 'state/digital-exchange/digital-exchanges/actions';
import { filterByDigitalExchanges } from 'state/digital-exchange/actions';

const TEST_STATE = {
  digitalExchanges: {
    list: LIST_DIGITAL_EXCHANGES_OK,
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

jest.mock('state/digital-exchange/digital-exchanges/actions', () => ({
  fetchDigitalExchanges: jest.fn(),
}));

jest.mock('state/loading/selectors', () => ({
  getLoading: jest.fn(),
}));

jest.mock('state/digital-exchange/actions', () => ({
  filterByDigitalExchanges: jest.fn(),
}));

const dispatchMock = jest.fn();

describe('DigitalExchangeFilter', () => {
  let component;
  beforeEach(() => {
    component = shallow(<DigitalExchangeFilter />);
  });

  it('renders without crashing', () => {
    expect(component.exists()).toEqual(true);
  });

  it('maps digitalExchanges property state in DigitalExchangeFilter', () => {
    expect(mapStateToProps(TEST_STATE)).toEqual({
      digitalExchanges: TEST_STATE.digitalExchanges.list,
      initialValues: { digitalExchanges: [] },
    });
  });

  describe('mapDispatchToProps', () => {
    let props;
    beforeEach(() => {
      props = mapDispatchToProps(dispatchMock);
    });

    it('should map the correct function properties', () => {
      expect(props.onDidMount).toBeDefined();
      expect(props.onChange).toBeDefined();
    });

    it('should dispatch an action if onWillMount is called', () => {
      props.onDidMount({});
      expect(dispatchMock).toHaveBeenCalled();
      expect(fetchDigitalExchanges).toHaveBeenCalled();
    });

    it('should dispatch an action if filter is checked', () => {
      const digitalExchanges = ['Entando'];
      props.onChange({ digitalExchanges });
      expect(dispatchMock).toHaveBeenCalled();
      expect(filterByDigitalExchanges).toHaveBeenCalledWith(digitalExchanges);
    });
  });
});
