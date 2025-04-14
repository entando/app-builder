import React from 'react';
import * as reactRedux from 'react-redux';

import { renderWithIntlRouterState } from 'test/testUtils';
import AddFormContainer from 'ui/users/add/AddFormContainer';
import UserForm from 'ui/users/common/UserForm';
import { PROFILE_TYPES_NORMALIZED, PROFILE_TYPES_OPTIONS } from 'test/mocks/profileTypes';

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
  sendPostUser: jest.fn(payload => ({ type: 'sendPostUser_test', payload })),
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
    <button onClick={() => mockProps.onSubmit('testValue')}>onSubmit</button>
    <button onClick={mockProps.onCancel}>onCancel</button>
    <button onClick={mockProps.onDiscard}>onDiscard</button>
    <button onClick={mockProps.onModalSave}>onModalSave</button>
  </div>
)));

const setupAddFormContainer = () => {
  const state = {
    ...PROFILE_TYPES_NORMALIZED,
  };
  const utils = renderWithIntlRouterState(<AddFormContainer />, { state });
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

  it('passes profileTypes to UserForm with the correct value', () => {
    setupAddFormContainer();

    expect(UserForm)
      .toHaveBeenCalledWith(expect.objectContaining({ profileTypes: PROFILE_TYPES_OPTIONS }), {});
  });

  it('fetches relevant data when UserForm mounts', () => {
    const { simulateMount } = setupAddFormContainer();

    simulateMount();

    expect(mockDispatch).toHaveBeenCalledTimes(1);
    expect(mockDispatch).toHaveBeenCalledWith({ type: 'fetchProfileTypes_test' });
  });

  it('calls the correct user action when UserForm is submitted', () => {
    const { simulateSubmit } = setupAddFormContainer();

    simulateSubmit();

    expect(mockDispatch).toHaveBeenCalledTimes(1);
    expect(mockDispatch).toHaveBeenCalledWith({ type: 'sendPostUser_test', payload: 'testValue' });
  });

  it('calls the correct modal action when UserForm is cancelled', () => {
    const { simulateCancel } = setupAddFormContainer();

    simulateCancel();

    expect(mockDispatch).toHaveBeenCalledTimes(1);
    expect(mockDispatch).toHaveBeenCalledWith({ type: 'setVisibleModal_test', payload: 'ConfirmCancelModal' });
  });

  it('calls the correct modal and history actions when UserForm is discarded', () => {
    const { simulateDiscard } = setupAddFormContainer();

    simulateDiscard();

    expect(mockDispatch).toHaveBeenCalledTimes(1);
    expect(mockDispatch).toHaveBeenCalledWith({ type: 'setVisibleModal_test', payload: '' });
    expect(mockHistoryPush).toHaveBeenCalledWith('/user');
  });

  it('calls the correct modal action when UserForm modal is saved', () => {
    const { simulateModalSave } = setupAddFormContainer();

    simulateModalSave();

    expect(mockDispatch).toHaveBeenCalledTimes(1);
    expect(mockDispatch).toHaveBeenCalledWith({ type: 'setVisibleModal_test', payload: '' });
  });
});
