import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { screen, render } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import { getPermissionsList } from 'state/permissions/selectors';
import { getLoading } from 'state/loading/selectors';
import { getSelectedRole } from 'state/roles/selectors';

import EditFormContainer from 'ui/roles/edit/EditFormContainer';

const mockDispatch = jest.fn();
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(fn => fn()),
  useDispatch: () => mockDispatch,
}));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useRouteMatch: () => ({ params: { roleCode: 'test' } }),
}));

jest.mock('state/permissions/selectors');
jest.mock('state/loading/selectors');
jest.mock('state/roles/selectors');

jest.mock('state/roles/actions', () => ({
  sendPutRole: jest.fn().mockReturnValue('sendPostRole_result'),
  fetchRole: jest.fn().mockReturnValue('fetchRole_result'),
}));

jest.mock('state/permissions/actions', () => ({
  fetchPermissions: jest.fn().mockReturnValue('fetchPermissions_result'),
}));

jest.mock('state/loading/actions', () => ({
  toggleLoading: jest.fn(),
}));


const props = {

};

describe('EditFormContainer', () => {
  const renderForm = (initialValues = props.initialValues, addProps = {}) => {
    const formProps = { ...props, ...addProps, initialValues };
    return render(<IntlProvider locale="en" onError={() => {}}><EditFormContainer {...formProps} /></IntlProvider>);
  };

  beforeEach(() => {
    getPermissionsList.mockReturnValue([]);
    getSelectedRole.mockReturnValue('test');
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

  it('code input should be disabled', () => {
    const { container } = renderForm();
    expect(container.querySelector('input[name=code')).toBeDisabled();
  });
});
