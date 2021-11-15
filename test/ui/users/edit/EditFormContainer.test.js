import React from 'react';
import * as reactRedux from 'react-redux';

import { renderWithIntlRouterState } from 'test/testUtils';
import EditFormContainer from 'ui/users/edit/EditFormContainer';
import UserForm from 'ui/users/common/UserForm';

jest.unmock('react-redux');

const useDispatchSpy = jest.spyOn(reactRedux, 'useDispatch');
const mockDispatch = jest.fn();
useDispatchSpy.mockReturnValue(mockDispatch);

const mockHistoryPush = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}));

jest.mock('state/users/actions', () => ({
  sendPutUser: jest.fn(payload => ({ type: 'sendPutUser_test', payload })),
  fetchCurrentPageUserDetail: jest.fn(payload => ({ type: 'fetchCurrentPageUserDetail_test', payload })),
}));

jest.mock('state/profile-types/actions', () => ({
  fetchProfileTypes: jest.fn(() => ({ type: 'fetchProfileTypes_test' })),
}));

jest.mock('state/modal/actions', () => ({
  setVisibleModal: jest.fn(payload => ({ type: 'setVisibleModal_test', payload })),
}));

jest.mock('ui/users/common/UserForm', () => jest.fn(mockProps => (
  <div>
    <button onClick={mockProps.onMount}>onMount</button>
    <button onClick={() => mockProps.onSubmit({})}>onSubmit</button>
    <button onClick={mockProps.onCancel}>onCancel</button>
    <button onClick={mockProps.onDiscard}>onDiscard</button>
    <button onClick={mockProps.onModalSave}>onModalSave</button>
  </div>
)));

const setupEditFormContainer = () => {
  const state = {
    users: {
      selected: {},
    },
  };
  const utils = renderWithIntlRouterState(<EditFormContainer />, {
    state, initialRoute: '/user/edit/testuser', path: '/user/edit/:username',
  });
  const simulateMount = () => utils.getByText('onMount').click();
  const simulateSubmit = () => utils.getByText('onSubmit').click();
  const simulateCancel = () => utils.getByText('onCancel').click();
  const simulateDiscard = () => utils.getByText('onDiscard').click();
  const simulateModalSave = () => utils.getByText('onModalSave').click();

  return {
    ...utils,
    simulateMount,
    simulateSubmit,
    simulateCancel,
    simulateDiscard,
    simulateModalSave,
  };
};

describe('AddFormContainer', () => {
  afterEach(() => {
    mockDispatch.mockClear();
  });

  it('passes initialValues to UserForm with the correct values', () => {
    setupEditFormContainer();

    expect(UserForm).toHaveBeenCalledWith(expect.objectContaining({
      initialValues: {
        username: 'testuser', password: '', passwordConfirm: '', reset: false,
      },
    }), {});
  });

  it('fetches user data when UserForm mounts', () => {
    const { simulateMount } = setupEditFormContainer();

    simulateMount();

    expect(mockDispatch).toHaveBeenCalledTimes(1);
    expect(mockDispatch).toHaveBeenCalledWith({ type: 'fetchCurrentPageUserDetail_test', payload: 'testuser' });
  });

  it('calls the correct user action when UserForm is submitted', () => {
    const { simulateSubmit } = setupEditFormContainer();

    simulateSubmit();

    expect(mockDispatch).toHaveBeenCalledTimes(1);
    expect(mockDispatch).toHaveBeenCalledWith({ type: 'sendPutUser_test', payload: expect.any(Object) });
  });

  it('calls the correct modal action when UserForm is cancelled', () => {
    const { simulateCancel } = setupEditFormContainer();

    simulateCancel();

    expect(mockDispatch).toHaveBeenCalledTimes(1);
    expect(mockDispatch).toHaveBeenCalledWith({ type: 'setVisibleModal_test', payload: 'ConfirmCancelModal' });
  });

  it('calls the correct modal and history actions when UserForm is discarded', () => {
    const { simulateDiscard } = setupEditFormContainer();

    simulateDiscard();

    expect(mockDispatch).toHaveBeenCalledTimes(1);
    expect(mockDispatch).toHaveBeenCalledWith({ type: 'setVisibleModal_test', payload: '' });
    expect(mockHistoryPush).toHaveBeenCalledWith('/user');
  });

  it('calls the correct modal action when UserForm modal is saved', () => {
    const { simulateModalSave } = setupEditFormContainer();

    simulateModalSave();

    expect(mockDispatch).toHaveBeenCalledTimes(1);
    expect(mockDispatch).toHaveBeenCalledWith({ type: 'setVisibleModal_test', payload: '' });
  });
});
