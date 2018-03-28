import React from 'react';
import 'test/enzyme-init';

import { shallow } from 'enzyme';

import GroupDetailTabPages from 'ui/groups/detail/GroupDetailTabPages';
import { PAGE_REFERENCES } from 'test/mocks/groups';

global.console.error = jest.fn();

describe('GroupDetailTabPages', () => {
  let component;
  beforeEach(() => {
    component = shallow(<GroupDetailTabPages page={1} pageSize={1} totalItems={1} />);
  });

  it('renders without crashing', () => {
    expect(component.exists()).toBe(true);
  });

  it('errors without a page', () => {
    shallow(<GroupDetailTabPages pageSize={1} totalItems={1} />);
    expect(console.error).toHaveBeenCalled();
  });

  it('errors without a pageSize', () => {
    shallow(<GroupDetailTabPages page={1} totalItems={1} />);
    expect(console.error).toHaveBeenCalled();
  });

  it('errors without totalItems', () => {
    shallow(<GroupDetailTabPages pageSize={1} page={1} />);
    expect(console.error).toHaveBeenCalled();
  });

  describe('test table component', () => {
    beforeEach(() => {
      component = shallow(<GroupDetailTabPages
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
        component.setProps({ pageReferences: PAGE_REFERENCES.administrators.list });
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
});
