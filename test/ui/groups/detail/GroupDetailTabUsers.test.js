import React from 'react';
import 'test/enzyme-init';

import { shallowWithIntl } from 'test/legacyTestUtils';

import GroupDetailTabUsers from 'ui/groups/detail/GroupDetailTabUsers';
import { USER_REFERENCES } from 'test/mocks/groups';

global.console.error = jest.fn();

describe('GroupDetailTabUsers', () => {
  let component;
  beforeEach(() => {
    component = shallowWithIntl(<GroupDetailTabUsers
      page={1}
      pageSize={1}
      totalItems={1}
    />).dive();
  });

  it('renders without crashing', () => {
    expect(component.exists()).toBe(true);
  });

  it('errors without a page', () => {
    shallowWithIntl(<GroupDetailTabUsers pageSize={1} totalItems={1} />);
    expect(console.error).toHaveBeenCalled();
  });

  it('errors without a pageSize', () => {
    shallowWithIntl(<GroupDetailTabUsers page={1} totalItems={1} />);
    expect(console.error).toHaveBeenCalled();
  });

  it('errors without totalItems', () => {
    shallowWithIntl(<GroupDetailTabUsers pageSize={1} page={1} />);
    expect(console.error).toHaveBeenCalled();
  });

  describe('test table component', () => {
    beforeEach(() => {
      component = shallowWithIntl(<GroupDetailTabUsers
        page={1}
        pageSize={1}
        totalItems={1}
      />).dive();
    });

    it('has an Alert', () => {
      expect(component.find('Alert')).toHaveLength(1);
    });

    describe('with pageReferences', () => {
      beforeEach(() => {
        component.setProps({ userReferences: USER_REFERENCES });
      });

      it('has 1 rows if there are 1 groups', () => {
        const tbody = component.find('tbody');
        expect(tbody).toHaveLength(1);
        expect(tbody.find('tr')).toHaveLength(1);
        expect(tbody.find('DropdownKebab')).toHaveLength(1);
      });

      it('has a DropdownKebab in the action column of each row', () => {
        component.find('tbody tr').forEach((tr) => {
          expect(tr.find('DropdownKebab')).toHaveLength(1);
        });
      });

      it('has a paginator', () => {
        const paginator = component.find('Paginator');
        expect(paginator).toHaveLength(1);
      });
    });
  });
});
