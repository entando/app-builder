import React from 'react';
import 'test/enzyme-init';
import { shallow } from 'enzyme';
import AttributeListTable from 'ui/common/attributes/AttributeListTable';

const FIELDS = {
  remove: jest.fn(),
  move: jest.fn(),
};

const DELETE = jest.fn();
const MVUP = jest.fn();
const MVDWN = jest.fn();

const props = {
  onClickDelete: DELETE,
  attributes: [],
  routeToEdit: '',
  entityCode: '',
  onMoveUp: MVUP,
  onMoveDown: MVDWN,
  code: 'code',
  datatypeCode: 'THX',
  fields: FIELDS,
};


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
      expect(component.find('thead th')).toHaveLength(0);
    });

    describe('with attributes', () => {
      beforeEach(() => {
        component = shallow(<AttributeListTable {...props} />);
      });

      it('has a menu in the action column of each row', () => {
        component.find('tbody tr').forEach((tr) => {
          expect(tr.find('AttributeListTableActions')).toHaveLength(1);
        });
      });
    });
  });
});
