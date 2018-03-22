import React from 'react';
import 'test/enzyme-init';
import { shallow } from 'enzyme';
import { GROUPS_OK_PAGE_1 } from 'test/mocks/groups';


import GroupListTable from 'ui/groups/list/GroupListTable';

const groups = GROUPS_OK_PAGE_1.payload;

jest.mock('state/groups/selectors', () => ({
  getGroupList: jest.fn(),
}));

describe('GroupListTable', () => {
  let component;
  beforeEach(() => {
    component = shallow(<GroupListTable page={1} pageSize={1} totalItems={1} />);
  });

  it('renders without crashing', () => {
    expect(component.exists()).toEqual(true);
  });

  it('errors without a page', () => {
    const consoleError = jest.spyOn(console, 'error').mockImplementation(() => {});
    shallow(<GroupListTable pageSize={1} totalItems={1} />);
    expect(consoleError).toHaveBeenCalled();
    consoleError.mockReset();
    consoleError.mockRestore();
  });

  it('errors without a pageSize', () => {
    const consoleError = jest.spyOn(console, 'error').mockImplementation(() => {});
    shallow(<GroupListTable page={1} totalItems={1} />);
    expect(consoleError).toHaveBeenCalled();
    consoleError.mockReset();
    consoleError.mockRestore();
  });

  it('errors without totalItems', () => {
    const consoleError = jest.spyOn(console, 'error').mockImplementation(() => {});
    shallow(<GroupListTable pageSize={1} page={1} />);
    expect(consoleError).toHaveBeenCalled();
    consoleError.mockReset();
    consoleError.mockRestore();
  });

  describe('test table component', () => {
    beforeEach(() => {
      component = shallow(<GroupListTable
        page={1}
        pageSize={1}
        totalItems={1}
      />);
    });

    it('has an Alert', () => {
      expect(component.find('Alert')).toHaveLength(1);
    });

    describe('with groups', () => {
      beforeEach(() => {
        component.setProps({ groups });
      });

      it('has 5 rows if there are 5 groups', () => {
        const tbody = component.find('tbody');
        expect(tbody).toHaveLength(1);
        expect(tbody.find('tr')).toHaveLength(5);
        expect(tbody.find('GroupListMenuActions')).toHaveLength(5);
      });

      it('has a menu in the action column of each row', () => {
        component.find('tbody tr').forEach((tr) => {
          expect(tr.find('GroupListMenuActions')).toHaveLength(1);
        });
      });

      it('has a paginator', () => {
        const paginator = component.find('Paginator');
        expect(paginator).toHaveLength(1);
      });
    });
  });
});
