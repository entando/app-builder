import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { fireEvent, render } from '@testing-library/react';
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
  it('renders without crashing, and display all elements', () => {
    // eslint-disable-next-line max-len
    const { getByText } = render(mockRenderWithIntlAndStore(<AddAuthorityModal {...props} />, state));
    expect(getByText('User Group')).toBeInTheDocument();
    expect(getByText('User Role')).toBeInTheDocument();
    expect(getByText('New authorizations')).toBeInTheDocument();
    expect(getByText('Add')).toBeInTheDocument();
    expect(getByText('Cancel')).toBeInTheDocument();
  });

  it('add button to call onClickAdd', () => {
    // eslint-disable-next-line max-len
    const { getByText } = render(mockRenderWithIntlAndStore(<AddAuthorityModal {...props} />, state));
    fireEvent.click(getByText('Add'));
    expect(props.onClickAdd).toHaveBeenCalled();
  });
});
