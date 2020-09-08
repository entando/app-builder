import React from 'react';
import 'test/enzyme-init';
import { shallow, mount } from 'enzyme';
import UserAuthorityTable from 'ui/users/authority/UserAuthorityTable';
import { mockRenderWithIntlAndStore } from 'test/testUtils';

const state = {
  modal: {
    visibleModal: 'AddAuthorityModal',
  },
};

const FIELDS = {
  push: jest.fn(),
  remove: jest.fn(),
};

const GROUPS_MOCKS = [
  { code: 'group1', name: 'group 1' },
  { code: 'group2', name: 'group 2' },
];
const ROLES_MOCKS = [
  { code: 'role1', name: 'role 1' },
  { code: 'role2', name: 'role 2' },
];

const GROUP_ROLES_COMBO = [
  {
    group: GROUPS_MOCKS[0],
    role: ROLES_MOCKS[0],
  },
];

const props = {
  groups: ROLES_MOCKS,
  roles: GROUPS_MOCKS,
  fields: FIELDS,
  groupRolesCombo: [],
  onAddNewClicked: jest.fn(),
};

jest.unmock('react-redux');
jest.unmock('redux-form');

describe('UserListTable', () => {
  let component;

  describe('empty data', () => {
    beforeEach(() => {
      component = shallow(mockRenderWithIntlAndStore(<UserAuthorityTable {...props} />));
    });

    it('renders without crashing', () => {
      expect(component.exists()).toBe(true);
    });

    it('renders with a BUTTON', () => {
      expect(component.find('BUTTON').exists()).toBeDefined();
    });
    it('renders with a table', () => {
      expect(component.find('table').exists()).toBeDefined();
    });

    it('is empty Alert', () => {
      expect(component.find('Altert').exists()).toBeDefined();
    });
  });
  describe('with data', () => {
    beforeEach(() => {
      component = mount(mockRenderWithIntlAndStore(<UserAuthorityTable
        {...props}
        groupRolesCombo={GROUP_ROLES_COMBO}
        onCloseModal={jest.fn()}
      />, state));
    });

    it('has table component', () => {
      expect(component.find('table').exists()).toBe(true);
    });

    it('depending on values selected call push() or not', () => {
      component.instance().group = { value: 'nenno' };
      component.find('#UserAuthorityTable__add').first().simulate('click');
      expect(FIELDS.push).not.toHaveBeenCalled();
    });
  });
});
