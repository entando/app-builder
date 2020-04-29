import React from 'react';
import 'test/enzyme-init';
import { shallow } from 'enzyme';

import ComponentRepositoryFilter from 'ui/component-repository/ComponentRepositoryFilter';
import {
  mapStateToProps,
  mapDispatchToProps,
} from 'ui/component-repository/ComponentRepositoryFilterContainer';
import { LIST_COMPONENT_REPOSITORIES_OK } from 'test/mocks/component-repository/componentRepositories';
import { fetchComponentRepositories } from 'state/component-repository/component-repositories/actions';
import { filterByComponentRepositories } from 'state/component-repository/actions';

const TEST_STATE = {
  componentRepositories: {
    list: LIST_COMPONENT_REPOSITORIES_OK,
  },
  componentRepositoryCategories: {
    list: [],
    selected: {},
  },
  componentRepositoryComponents: {
    list: [],
    selected: {},
    componentListViewMode: '',
    filters: {},
  },
};

jest.mock('state/component-repository/component-repositories/actions', () => ({
  fetchComponentRepositories: jest.fn(),
}));

jest.mock('state/loading/selectors', () => ({
  getLoading: jest.fn(),
}));

jest.mock('state/component-repository/actions', () => ({
  filterByComponentRepositories: jest.fn(),
}));

const dispatchMock = jest.fn();

describe('ComponentRepositoryFilter', () => {
  let component;
  beforeEach(() => {
    component = shallow(<ComponentRepositoryFilter />);
  });

  it('renders without crashing', () => {
    expect(component.exists()).toEqual(true);
  });

  it('maps componentRepositories property state in ComponentRepositoryFilter', () => {
    expect(mapStateToProps(TEST_STATE)).toEqual({
      componentRepositories: TEST_STATE.componentRepositories.list,
      initialValues: { componentRepositories: [] },
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
      expect(fetchComponentRepositories).toHaveBeenCalled();
    });

    it('should dispatch an action if filter is checked', () => {
      const componentRepositories = ['Entando'];
      props.onChange({ componentRepositories });
      expect(dispatchMock).toHaveBeenCalled();
      expect(filterByComponentRepositories).toHaveBeenCalledWith(componentRepositories);
    });
  });
});
