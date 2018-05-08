import React from 'react';
import 'test/enzyme-init';
import { shallow } from 'enzyme';
import { LIST_ROLES_OK } from 'test/mocks/roles';


import RoleListTable from 'ui/roles/list/RoleListTable';

jest.mock('state/roles/selectors', () => ({
  getRoleList: jest.fn(),
}));

const onWillMount = jest.fn();

const TOTAL_ITEMS = 100;
const PAGE_SIZE = 10;
const PAGE = 1;

describe('RoleListTable', () => {
  let component;
  beforeEach(() => {
    component = shallow(<RoleListTable
      page={1}
      pageSize={1}
      totalItems={1}
      onWillMount={onWillMount}
    />);
  });

  it('renders without crashing', () => {
    expect(component.exists()).toEqual(true);
  });

  it('errors without a page', () => {
    const consoleError = jest.spyOn(console, 'error').mockImplementation(() => {});
    shallow(<RoleListTable pageSize={1} totalItems={1} onWillMount={onWillMount} />);
    expect(consoleError).toHaveBeenCalled();
    consoleError.mockReset();
    consoleError.mockRestore();
  });

  it('errors without a pageSize', () => {
    const consoleError = jest.spyOn(console, 'error').mockImplementation(() => {});
    shallow(<RoleListTable page={1} totalItems={1} onWillMount={onWillMount} />);
    expect(consoleError).toHaveBeenCalled();
    consoleError.mockReset();
    consoleError.mockRestore();
  });

  it('errors without totalItems', () => {
    const consoleError = jest.spyOn(console, 'error').mockImplementation(() => {});
    shallow(<RoleListTable pageSize={1} page={1} onWillMount={onWillMount} />);
    expect(consoleError).toHaveBeenCalled();
    consoleError.mockReset();
    consoleError.mockRestore();
  });

  describe('test table component', () => {
    beforeEach(() => {
      component = shallow(<RoleListTable
        page={PAGE}
        pageSize={PAGE_SIZE}
        totalItems={TOTAL_ITEMS}
        onWillMount={onWillMount}
      />);
    });

    it('has an Alert', () => {
      expect(component.find('Alert')).toHaveLength(1);
    });

    describe('with roles', () => {
      beforeEach(() => {
        component.setProps({ roles: LIST_ROLES_OK });
      });

      it('has 10 rows if there are 10 roles', () => {
        const tbody = component.find('tbody');
        expect(tbody).toHaveLength(1);
        expect(tbody.find('tr')).toHaveLength(10);
        expect(tbody.find('RoleListMenuActions')).toHaveLength(10);
      });

      it('has a menu in the action column of each row', () => {
        component.find('tbody tr').forEach((tr) => {
          expect(tr.find('RoleListMenuActions')).toHaveLength(1);
        });
      });

      it('has a paginator', () => {
        const paginator = component.find('Paginator');
        expect(paginator).toHaveLength(1);
      });

      it('on change page, it calls onWillMount with new page data', () => {
        onWillMount.mockClear();
        component.instance().changePage(3);
        expect(onWillMount).toHaveBeenCalledWith({
          page: 3,
          pageSize: PAGE_SIZE,
        });
      });

      it('on change page size, it calls onWillMount with new page data', () => {
        onWillMount.mockClear();
        component.instance().changePageSize(20);
        expect(onWillMount).toHaveBeenCalledWith({
          page: PAGE,
          pageSize: 20,
        });
      });
    });
  });
});
