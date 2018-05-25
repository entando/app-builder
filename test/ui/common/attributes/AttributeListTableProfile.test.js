import React from 'react';
import 'test/enzyme-init';
import { shallow } from 'enzyme';
import AttributeListTableProfile from 'ui/common/attributes/AttributeListTableProfile';
import { PROFILE_TYPES } from 'test/mocks/profileTypes';

const { attributes } = PROFILE_TYPES;
const props = {
  routeToEdit: '',
  code: 'code',
  profiletypeCode: '',
};

jest.mock('state/users/selectors', () => ({
  getAttributeList: jest.fn(),
}));

describe('AttributeListTableProfile', () => {
  let component;
  beforeEach(() => {
    component = shallow(<AttributeListTableProfile {...props} />);
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
          expect(tr.find('AttributeListMenuActionsProfile')).toHaveLength(1);
        });
      });
    });
  });
});
