import React from 'react';
import 'test/enzyme-init';
import { shallow } from 'enzyme';
import AttributeListTable from 'ui/common/attributes/AttributeListTable';
import { DATA_TYPES } from 'test/mocks/dataTypes';

const { attributes } = DATA_TYPES;
const props = {
  routeToEdit: '',
  code: 'code',
  datatypeCode: '',
};

jest.mock('state/users/selectors', () => ({
  getAttributeList: jest.fn(),
}));

describe('AttributeListTable', () => {
  let component;
  beforeEach(() => {
    component = shallow(<AttributeListTable {...props} />);
  });

  it('renders without crashing', () => {
    expect(component.exists()).toBe(true);
  });

  describe('test table component', () => {
    it('has an table header', () => {
      expect(component.find('thead th')).toHaveLength(6);
    });

    describe('with attributes', () => {
      beforeEach(() => {
        component.setProps({ attributes });
      });

      it('has four rows if there are two users', () => {
        const tbody = component.find('tbody');
        expect(tbody).toHaveLength(1);
        expect(tbody.find('tr')).toHaveLength(attributes.length);
      });

      it('has a menu in the action column of each row', () => {
        component.find('tbody tr').forEach((tr) => {
          expect(tr.find('AttributeListMenuActions')).toHaveLength(1);
        });
      });
    });
  });
});
