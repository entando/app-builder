import React from 'react';
import 'test/enzyme-init';

import { shallow } from 'enzyme';

import GroupDetailTabResources from 'ui/groups/detail/GroupDetailTabResources';
import { RESOURCE_REFERENCES } from 'test/mocks/groups';

global.console.error = jest.fn();

describe('GroupDetailTabResources', () => {
  let component;
  beforeEach(() => {
    component = shallow(<GroupDetailTabResources page={1} pageSize={1} totalItems={1} />);
  });

  it('renders without crashing', () => {
    expect(component.exists()).toBe(true);
  });

  it('errors without a page', () => {
    shallow(<GroupDetailTabResources pageSize={1} totalItems={1} />);
    expect(console.error).toHaveBeenCalled();
  });

  it('errors without a pageSize', () => {
    shallow(<GroupDetailTabResources page={1} totalItems={1} />);
    expect(console.error).toHaveBeenCalled();
  });

  it('errors without totalItems', () => {
    shallow(<GroupDetailTabResources pageSize={1} page={1} />);
    expect(console.error).toHaveBeenCalled();
  });

  describe('test table component', () => {
    beforeEach(() => {
      component = shallow(<GroupDetailTabResources
        page={1}
        pageSize={1}
        totalItems={1}
      />);
    });

    it('has an Alert', () => {
      expect(component.find('Alert')).toHaveLength(1);
    });

    describe('with pageReferences', () => {
      beforeEach(() => {
        component.setProps({ resourceReferences: RESOURCE_REFERENCES });
      });

      it('has 1 rows', () => {
        const tbody = component.find('tbody');
        expect(tbody).toHaveLength(1);
        expect(tbody.find('tr')).toHaveLength(1);
      });

      it('has a paginator', () => {
        const paginator = component.find('Paginator');
        expect(paginator).toHaveLength(1);
      });
    });
  });
});
