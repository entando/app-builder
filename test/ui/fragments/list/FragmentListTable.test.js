import React from 'react';
import 'test/enzyme-init';
import { shallowWithIntl } from 'test/testUtils';
import FragmentListTable from 'ui/fragments/list/FragmentListTable';

const fragments = [
  {
    code: 'myCode',
    isLocked: false,
    widgetType: {
      code: 'widgetcode',
      title: 'Widget Title',
    },
    pluginCode: 'pluginCode',
  },
  {
    code: 'myCode2',
    isLocked: false,
    widgetType: {
      code: 'widgetcode',
      title: 'Widget Title',
    },
    pluginCode: 'pluginCode',
  },
];

describe('FragmentListTable', () => {
  let component;
  beforeEach(() => {
    component = shallowWithIntl(<FragmentListTable page={1} pageSize={1} totalItems={1} />).dive();
  });

  it('renders without crashing', () => {
    expect(component.exists()).toEqual(true);
  });

  it('errors without a page', () => {
    const consoleError = jest.spyOn(console, 'error').mockImplementation(() => {});
    shallowWithIntl(<FragmentListTable pageSize={1} totalItems={1} />).dive();
    expect(consoleError).toHaveBeenCalled();
    consoleError.mockReset();
    consoleError.mockRestore();
  });

  it('errors without a pageSize', () => {
    const consoleError = jest.spyOn(console, 'error').mockImplementation(() => {});
    shallowWithIntl(<FragmentListTable page={1} totalItems={1} />).dive();
    expect(consoleError).toHaveBeenCalled();
    consoleError.mockReset();
    consoleError.mockRestore();
  });

  it('errors without totalItems', () => {
    const consoleError = jest.spyOn(console, 'error').mockImplementation(() => {});
    shallowWithIntl(<FragmentListTable pageSize={1} page={1} />).dive();
    expect(consoleError).toHaveBeenCalled();
    consoleError.mockReset();
    consoleError.mockRestore();
  });

  it('has a table', () => {
    expect(component.find('table')).toHaveLength(1);
  });

  it('has a table header', () => {
    const thead = component.find('thead');
    expect(thead).toHaveLength(1);
    expect(thead.find('th')).toHaveLength(4);
  });

  it('has no rows', () => {
    const tbody = component.find('tbody');
    expect(tbody).toHaveLength(1);
    expect(tbody.find('tr')).toHaveLength(0);
  });

  describe('with fragments', () => {
    beforeEach(() => {
      component.setProps({ fragments });
    });

    it('has two rows if there are two fragments', () => {
      const tbody = component.find('tbody');
      expect(tbody).toHaveLength(1);
      expect(tbody.find('tr')).toHaveLength(2);
      expect(tbody.find('FragmentListMenuActions')).toHaveLength(2);
    });

    it('has a menu in the action column of each row', () => {
      component.find('tbody tr').forEach((tr) => {
        expect(tr.find('FragmentListMenuActions')).toHaveLength(1);
      });
    });
  });

  it('has a paginator', () => {
    expect(component.find('Paginator')).toHaveLength(1);
  });
});
