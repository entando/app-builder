import React from 'react';
import 'test/enzyme-init';
import { shallowWithIntl } from 'test/legacyTestUtils';
import { DATA_TYPES_OK_PAGE_1 } from 'test/mocks/dataTypes';


import DataTypeListTable from 'ui/data-types/list/DataTypeListTable';

const dataTypes = DATA_TYPES_OK_PAGE_1.payload;

jest.mock('state/data-types/selectors', () => ({
  getDataTypeList: jest.fn(),
}));

const props = {
  onClickDelete: jest.fn(),
  onClickReload: jest.fn(),
  status: '0',

};

describe('DataTypeListTable', () => {
  let component;
  beforeEach(() => {
    component = shallowWithIntl(<DataTypeListTable
      {...props}
      datatype={dataTypes}
      page={1}
      pageSize={1}
      totalItems={1}
    />);
  });

  it('renders without crashing', () => {
    expect(component.exists()).toBe(true);
  });

  it('errors without a page', () => {
    const consoleError = jest.spyOn(console, 'error').mockImplementation(() => {});
    shallowWithIntl(<DataTypeListTable
      datatype={dataTypes}
      pageSize={1}
      totalItems={1}
      {...props}
    />);
    expect(consoleError).toHaveBeenCalled();
    consoleError.mockReset();
    consoleError.mockRestore();
  });

  it('errors without a pageSize', () => {
    const consoleError = jest.spyOn(console, 'error').mockImplementation(() => {});
    shallowWithIntl(<DataTypeListTable page={1} totalItems={1} {...props} />);
    expect(consoleError).toHaveBeenCalled();
    consoleError.mockReset();
    consoleError.mockRestore();
  });

  it('errors without totalItems', () => {
    const consoleError = jest.spyOn(console, 'error').mockImplementation(() => {});
    shallowWithIntl(<DataTypeListTable pageSize={1} page={1} {...props} />);
    expect(consoleError).toHaveBeenCalled();
    consoleError.mockReset();
    consoleError.mockRestore();
  });

  describe('test table component', () => {
    beforeEach(() => {
      component = shallowWithIntl(<DataTypeListTable
        page={1}
        pageSize={1}
        totalItems={1}
        {...props}
      />).dive();
    });

    it('has an Alert', () => {
      expect(component.find('Alert')).toHaveLength(1);
    });

    describe('with dataTypes', () => {
      beforeEach(() => {
        component.setProps({ datatypes: dataTypes });
      });

      it('has two rows if there are two data types', () => {
        const tbody = component.find('tbody');
        expect(tbody).toHaveLength(1);
        expect(tbody.find('tr')).toHaveLength(2);
        expect(tbody.find('DataTypeListMenuActions')).toHaveLength(2);
      });

      it('has a menu in the action column of each row', () => {
        component.find('tbody tr').forEach((tr) => {
          expect(tr.find('DataTypeListMenuActions')).toHaveLength(1);
        });
      });

      it('has a paginator', () => {
        const paginator = component.find('Paginator');
        expect(paginator).toHaveLength(1);
      });
    });
  });
});
