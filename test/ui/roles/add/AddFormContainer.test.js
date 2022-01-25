import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { screen, render } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import { getPermissionsList } from 'state/permissions/selectors';
import { getLoading } from 'state/loading/selectors';

import AddFormContainer from 'ui/roles/add/AddFormContainer';

const mockDispatch = jest.fn();
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(fn => fn()),
  useDispatch: () => mockDispatch,
}));

jest.mock('state/permissions/selectors');
jest.mock('state/loading/selectors');

jest.mock('state/roles/actions', () => ({
  sendPostRole: jest.fn().mockReturnValue('sendPostRole_result'),
}));

jest.mock('state/permissions/actions', () => ({
  fetchPermissions: jest.fn().mockReturnValue('fetchPermissions_result'),
}));

jest.mock('state/loading/actions', () => ({
  toggleLoading: jest.fn(),
}));


const props = {};

describe('AddFormContainer', () => {
  const renderForm = (initialValues = props.initialValues, addProps = {}) => {
    const formProps = { ...props, ...addProps, initialValues };
    return render(<IntlProvider locale="en" onError={() => {}}><AddFormContainer {...formProps} /></IntlProvider>);
  };

  beforeEach(() => {
    getPermissionsList.mockReturnValue([]);
    getLoading.mockReturnValue({ permissions: false });
  });

  it('should render container without errors', () => {
    renderForm();
    expect(screen.getByText('app.name')).toBeInTheDocument();
    expect(screen.getByText('app.code')).toBeInTheDocument();
    expect(screen.getByText('permission.listEmpty')).toBeInTheDocument();
  });

  it('should render container with permissions', () => {
    const mockPermissions = [
      { code: 'editContents', descr: 'Content Editing' },
      { code: 'editUserProfile', descr: 'User Profile Editing' },
      { code: 'editUsers', descr: 'User Management' },
    ];
    getPermissionsList.mockReturnValue(mockPermissions);
    renderForm();

    expect(screen.getByText(mockPermissions[0].descr)).toBeInTheDocument();
    expect(screen.getByText(mockPermissions[1].descr)).toBeInTheDocument();
    expect(screen.getByText(mockPermissions[2].descr)).toBeInTheDocument();
  });

  it('code input should be enabled', () => {
    const { container } = renderForm();
    expect(container.querySelector('input[name=code')).toBeEnabled();
  });
});
