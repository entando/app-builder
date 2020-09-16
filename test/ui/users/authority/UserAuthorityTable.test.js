/* eslint-disable max-len */
import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { fireEvent, render, screen } from '@testing-library/react';
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
  groupRolesCombo: GROUP_ROLES_COMBO,
  onCloseModal: jest.fn(),
  onAddNewClicked: jest.fn(),
};

jest.unmock('react-redux');
jest.unmock('redux-form');

describe('UserListTable', () => {
  describe('empty data', () => {
    it('renders without crashing, and display all elements', () => {
      const { getByText } = render(mockRenderWithIntlAndStore(<UserAuthorityTable {...props} groupRolesCombo={[]} />, state));

      expect(getByText('No authorizations yet')).toBeInTheDocument();
      expect(getByText('Add new Authorization')).toBeInTheDocument();
      expect(getByText('Cancel')).toBeInTheDocument();
      expect(getByText('Add')).toBeInTheDocument();
    });
  });
  describe('with data', () => {
    it('renders without crashing, and display all elements', () => {
      const { getByText } = render(mockRenderWithIntlAndStore(<UserAuthorityTable {...props} />, state));

      expect(getByText('New authorizations')).toBeInTheDocument();
      expect(getByText('Add new Authorization')).toBeInTheDocument();
      expect(getByText('Cancel')).toBeInTheDocument();
      expect(getByText('Add')).toBeInTheDocument();
    });

    it('depending on values selected call push() or not', async () => {
      render(mockRenderWithIntlAndStore(<UserAuthorityTable {...props} />, state));

      fireEvent.click(screen.getByText('Add new Authorization'));

      fireEvent.change(screen.getByTestId('groups'), { target: { value: 'group1' } });
      fireEvent.change(screen.getByTestId('roles'), { target: { value: 'role1' } });

      fireEvent.click(screen.getByText('Add'));

      expect(FIELDS.push).not.toHaveBeenCalled();
    });
  });
});
