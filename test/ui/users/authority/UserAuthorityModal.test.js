import React from 'react';
import 'test/enzyme-init';
import { mount } from 'enzyme';
import AddAuthorityModal from 'ui/users/common/AddAuthorityModal';
import { mockRenderWithIntlAndStore } from 'test/testUtils';

const state = {
  modal: {
    visibleModal: 'AddAuthorityModal',
  },
};

const GROUPS_MOCKS = [
  { code: 'group1', name: 'group 1' },
  { code: 'group2', name: 'group 2' },
];
const ROLES_MOCKS = [
  { code: 'role1', name: 'role 1' },
  { code: 'role2', name: 'role 2' },
];

const props = {
  groupOptions: GROUPS_MOCKS.map(gr => (<option key={gr.name} value={gr.code}>{gr.name}</option>)),
  rolesOptions: ROLES_MOCKS.map(gr => (<option key={gr.name} value={gr.code}>{gr.name}</option>)),
  onClickAdd: jest.fn(),
  setGroupRef: jest.fn(),
  setRoleRef: jest.fn(),
};

jest.unmock('react-redux');
jest.unmock('redux-form');

describe('AddAuthorityModal', () => {
  let component;

  describe('empty data', () => {
    beforeEach(() => {
      component = mount(mockRenderWithIntlAndStore(<AddAuthorityModal {...props} />, state));
    });

    it('renders without crashing', () => {
      expect(component.exists()).toBe(true);
    });

    it('renders with a BUTTON', () => {
      expect(component.find('BUTTON').exists()).toBeDefined();
    });

    it('renders with two selects', () => {
      expect(component.find('select').length).toBe(2);
    });
  });
});
