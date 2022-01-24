import React from 'react';
import * as reactRedux from 'react-redux';

import { renderWithState } from 'test/testUtils';
import RestrictionsFormContainer from 'ui/users/restrictions/RestrictionsFormContainer';
import RestrictionsForm from 'ui/users/restrictions/RestrictionsForm';

jest.unmock('react-redux');

const useDispatchSpy = jest.spyOn(reactRedux, 'useDispatch');
const mockDispatch = jest.fn();
useDispatchSpy.mockReturnValue(mockDispatch);

jest.mock('state/user-settings/actions', () => ({
  fetchUserSettings: jest.fn(() => ({ type: 'fetchUserSettings_test' })),
  updateUserSettings: jest.fn(payload => ({ type: 'updateUserSettings_test', payload })),
}));

jest.mock('ui/users/restrictions/RestrictionsForm', () => jest.fn(mockProps => (
  <div>
    <button onClick={mockProps.onMount}>onMount</button>
    <button onClick={() => mockProps.onSubmit({})}>onSubmit</button>
  </div>
)));

const setupRestrictionsFormContainer = (state = { userSettings: {}, loading: {} }) => {
  const utils = renderWithState(<RestrictionsFormContainer />, { state });
  const simulateMount = () => utils.getByText('onMount').click();
  const simulateSubmit = () => utils.getByText('onSubmit').click();

  return {
    ...utils,
    simulateMount,
    simulateSubmit,
  };
};

describe('RestrictionsFormContainer', () => {
  afterEach(() => {
    mockDispatch.mockClear();
  });

  it('passes initialValues to UserForm with the correct values', () => {
    const state = {
      userSettings: {
        enableGravatarIntegration: false,
        passwordAlwaysActive: false,
        maxMonthsPasswordValid: 1,
        lastAccessPasswordExpirationMonths: 1,
      },
      loading: {},
    };
    setupRestrictionsFormContainer(state);

    expect(RestrictionsForm).toHaveBeenCalledWith(expect.objectContaining({
      initialValues: state.userSettings,
    }), {});
  });

  it('fetches user settings data when RestrictionsForm mounts', () => {
    const { simulateMount } = setupRestrictionsFormContainer();

    simulateMount();

    expect(mockDispatch).toHaveBeenCalledTimes(1);
    expect(mockDispatch).toHaveBeenCalledWith({ type: 'fetchUserSettings_test' });
  });

  it('calls the correct user settings action when RestrictionsForm is submitted', () => {
    const { simulateSubmit } = setupRestrictionsFormContainer();

    simulateSubmit();

    expect(mockDispatch).toHaveBeenCalledTimes(1);
    expect(mockDispatch).toHaveBeenCalledWith({ type: 'updateUserSettings_test', payload: expect.any(Object) });
  });
});
