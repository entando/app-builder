import React from 'react';
import 'test/enzyme-init';
import { shallow } from 'enzyme';

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
    component = shallow(<FragmentListTable />);
  });

  it('renders without crashing', () => {
    expect(component.exists()).toEqual(true);
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
});
