import React from 'react';
import 'test/enzyme-init';
import { shallow } from 'enzyme';

import DataModelListTable from 'ui/data-models/list/DataModelListTable';

describe('inner table errors', () => {
  let consoleError;
  beforeEach(() => {
    consoleError = jest.spyOn(console, 'error').mockImplementation(() => {});
  });
  afterEach(() => {
    consoleError.mockReset();
    consoleError.mockRestore();
  });

  it('errors without a page', () => {
    shallow(<DataModelListTable pageSize={1} totalItems={1} />);
    expect(consoleError).toHaveBeenCalled();
    consoleError.mockReset();
    consoleError.mockRestore();
  });
  it('errors without a pageSize', () => {
    shallow(<DataModelListTable page={1} totalItems={1} />);
    expect(consoleError).toHaveBeenCalled();
    consoleError.mockReset();
    consoleError.mockRestore();
  });
  it('errors without a totalItems', () => {
    shallow(<DataModelListTable page={1} pageSize={1} />);
    expect(consoleError).toHaveBeenCalled();
    consoleError.mockReset();
    consoleError.mockRestore();
  });
});

describe('DataModelListTable', () => {
  let component;
  beforeEach(() => {
    component = shallow(<DataModelListTable page={1} pageSize={1} totalItems={1} />);
  });
  it('renders component without crashing', () => {
    expect(component.exists()).toEqual(true);
  });
  it('root component has class DataModelListTable', () => {
    expect(component.hasClass('DataModelListTable')).toEqual(true);
  });
  describe('inner table', () => {
    it('renders table header with 4 cols', () => {
      expect(component.find('table thead tr th')).toHaveLength(4);
    });
    it('renders table with correct structure', () => {
      component = shallow(<DataModelListTable pageSize={1} page={1} totalItems={1} />);
      expect(component.find('table thead tr').exists()).toEqual(true);
      expect(component.find('table thead tr th').exists()).toEqual(true);
    });
    it('has a table header', () => {
      const thead = component.find('thead');
      expect(thead).toHaveLength(1);
      expect(thead.find('th')).toHaveLength(4);
    });
    it('has a paginator', () => {
      expect(component.find('Paginator')).toHaveLength(1);
    });
  });
  it('has a menu in the action column of each row', () => {
    component.find('tbody tr').forEach((tr) => {
      expect(tr.find('FragmentListMenuActions')).toHaveLength(1);
    });
  });
});
