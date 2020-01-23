import React from 'react';
import 'test/enzyme-init';

import { shallowWithIntl } from 'test/testUtils';

import GroupDetailTabPages from 'ui/groups/detail/GroupDetailTabPages';
import { PAGE_REFERENCES } from 'test/mocks/groups';

global.console.error = jest.fn();

describe('GroupDetailTabPages', () => {
  let component;
  beforeEach(() => {
    component = shallowWithIntl(<GroupDetailTabPages page={1} pageSize={1} totalItems={1} />);
  });

  it('renders without crashing', () => {
    expect(component.exists()).toBe(true);
  });

  it('errors without a page', () => {
    shallowWithIntl(<GroupDetailTabPages pageSize={1} totalItems={1} />);
    expect(console.error).toHaveBeenCalled();
  });

  it('errors without a pageSize', () => {
    shallowWithIntl(<GroupDetailTabPages page={1} totalItems={1} />);
    expect(console.error).toHaveBeenCalled();
  });

  it('errors without totalItems', () => {
    shallowWithIntl(<GroupDetailTabPages pageSize={1} page={1} />);
    expect(console.error).toHaveBeenCalled();
  });

  describe('test table component', () => {
    beforeEach(() => {
      component = shallowWithIntl(<GroupDetailTabPages
        page={1}
        pageSize={1}
        totalItems={1}
      />).dive();
    });

    it('has an Alert', () => {
      expect(component.find('Alert')).toHaveLength(1);
    });
  });

  describe('with pageReferences', () => {
    beforeEach(() => {
      component = shallowWithIntl(<GroupDetailTabPages
        pageReferences={PAGE_REFERENCES}
        page={1}
        pageSize={1}
        totalItems={1}
      />).dive();
    });

    it('has 3 rows references page', () => {
      const tbody = component.find('tbody');
      expect(tbody).toHaveLength(1);
      expect(tbody.find('tr')).toHaveLength(3);
      expect(tbody.find('DropdownKebab')).toHaveLength(3);
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
