import React from 'react';
import { screen, within, waitFor, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';

import { renderWithIntl } from 'test/testUtils';
import UserForm from 'ui/users/common/UserForm';
import ConfirmCancelModalContainer from 'ui/common/cancel-modal/ConfirmCancelModalContainer';

jest.mock('ui/common/cancel-modal/ConfirmCancelModalContainer', () => jest.fn(() => null));

const setupUserForm = (initialValues, editing = false) => {
  const mockHandleMount = jest.fn();
  const mockHandleSubmit = jest.fn();
  const mockHandleCancel = jest.fn();
  const mockHandleDiscard = jest.fn();
  const mockHandleModalSave = jest.fn();
  const profileTypes = [{ value: 'PFL', text: 'Default' }];
  const utils = renderWithIntl((
    <UserForm
      profileTypes={profileTypes}
      initialValues={initialValues}
      onMount={mockHandleMount}
      onSubmit={mockHandleSubmit}
      onCancel={mockHandleCancel}
      onDiscard={mockHandleDiscard}
      onModalSave={mockHandleModalSave}
      editing={editing}
    />
  ));
  const formView = within(screen.getByRole('form'));

  const getUsernameTextInput = () => formView.getByRole('textbox', { name: /username/i });
  const getPasswordTextInput = () => formView.getByPlaceholderText(/^password$/i);
  const getPasswordConfirmTextInput = () => formView.getByLabelText(/confirm password/i);
  const getProfileTypeSelectInput = () => formView.getByRole('combobox', { name: /profile type/i });
  const getStatusSwitchInput = () => formView.getByLabelText(/status/i).children[0];
  const getSaveButton = () => formView.getByRole('button', { name: /^save$/i });
  const getSaveAndEditProfileButton = () => formView.getByRole('button', { name: /save and edit profile/i });
  const getCancelButton = () => formView.getByRole('button', { name: /cancel/i });
  const getErrorMessage = () => formView.getByRole('alert');
  const queryProfileTypeSelectInput = () => formView.queryByRole('combobox', { name: /profile type/i });
  const queryResetSwitchInput = () => formView.queryByLabelText(/reset/i).children[0];
  const queryErrorMessage = () => formView.queryByRole('alert');
  const querySaveAndEditProfileButton = () => formView.queryByRole('button', { name: /save and edit profile/i });

  const typeUsername =
    value => userEvent.type(getUsernameTextInput(), value);
  const typePassword =
    value => userEvent.type(getPasswordTextInput(), value);
  const typePasswordConfirm =
    value => userEvent.type(getPasswordConfirmTextInput(), value);
  const selectProfileType =
    value => userEvent.selectOptions(getProfileTypeSelectInput(), value);
  const clearPassword = () => userEvent.clear(getPasswordTextInput());

  const toggleStatus = () => userEvent.click(getStatusSwitchInput());

  const clickSave = () => userEvent.click(getSaveButton());
  const clickSaveAndEditProfile = () => userEvent.click(getSaveAndEditProfileButton());
  const clickCancel = () => userEvent.click(getCancelButton());

  return {
    ...utils,
    mockHandleMount,
    mockHandleSubmit,
    mockHandleCancel,
    mockHandleDiscard,
    getUsernameTextInput,
    getPasswordTextInput,
    getPasswordConfirmTextInput,
    getProfileTypeSelectInput,
    getStatusSwitchInput,
    getSaveButton,
    getSaveAndEditProfileButton,
    getErrorMessage,
    queryProfileTypeSelectInput,
    queryResetSwitchInput,
    queryErrorMessage,
    querySaveAndEditProfileButton,
    typeUsername,
    typePassword,
    typePasswordConfirm,
    selectProfileType,
    toggleStatus,
    clearPassword,
    clickSave,
    clickSaveAndEditProfile,
    clickCancel,
  };
};

const setupUserFormAndFillValues = ({
  username, password, passwordConfirm, profileType,
}) => {
  const utils = setupUserForm();
  utils.typeUsername(username);
  utils.typePassword(password);
  utils.typePasswordConfirm(passwordConfirm);
  utils.selectProfileType(profileType);

  fireEvent.blur(utils.getProfileTypeSelectInput());

  return utils;
};

describe('UserForm', () => {
  const user = {
    username: 'testuser',
    password: 'testpass',
    passwordConfirm: 'testpass',
    profileType: 'PFL',
    status: 'inactive',
  };

  it('calls onMount when form has been rendered', () => {
    const { mockHandleMount } = setupUserForm();

    expect(mockHandleMount).toHaveBeenCalledTimes(1);
  });

  it('calls onSubmit with all the fields when save is clicked', async () => {
    const { mockHandleSubmit, clickSave } = setupUserFormAndFillValues(user);

    clickSave();

    await waitFor(() => {
      expect(mockHandleSubmit).toHaveBeenCalledTimes(1);
      expect(mockHandleSubmit).toHaveBeenCalledWith(user, 'save');
    });
  });

  it('calls onSubmit with all the fields and a saveAndEditProfile submit type when save and edit profile button is clicked', async () => {
    const { clickSaveAndEditProfile, mockHandleSubmit } = setupUserFormAndFillValues(user);

    clickSaveAndEditProfile();

    await waitFor(() => {
      expect(mockHandleSubmit).toHaveBeenCalledTimes(1);
      expect(mockHandleSubmit).toHaveBeenCalledWith(user, 'saveAndEditProfile');
    });
  });

  it('calls onDiscard when cancel is clicked and form is not dirty', async () => {
    const { mockHandleDiscard, clickCancel } = setupUserForm();

    clickCancel();

    await waitFor(() => {
      expect(mockHandleDiscard).toHaveBeenCalledTimes(1);
    });
  });

  it('calls onCancel when cancel is clicked and form is dirty', async () => {
    const { mockHandleCancel, clickCancel } = setupUserFormAndFillValues(user);

    clickCancel();

    await waitFor(() => {
      expect(mockHandleCancel).toHaveBeenCalledTimes(1);
    });
  });

  it('renders ConfirmCancelModalContainer with the correct props', () => {
    setupUserForm();

    expect(ConfirmCancelModalContainer).toHaveBeenCalledWith(expect.objectContaining({
      contentText: expect.stringMatching(/save/i),
      invalid: expect.any(Boolean),
      submitting: expect.any(Boolean),
      onSave: expect.any(Function),
      onDiscard: expect.any(Function),
      'data-testid': expect.any(String),
    }), {});
  });

  it('disables save buttons and shows an error message when username is not provided', async () => {
    const { getSaveButton, getSaveAndEditProfileButton, getErrorMessage } = setupUserFormAndFillValues({ ...user, username: '' });

    await waitFor(() => {
      expect(getSaveButton()).toHaveAttribute('disabled');
      expect(getSaveAndEditProfileButton()).toHaveAttribute('disabled');
      expect(getErrorMessage()).toHaveTextContent(/field required/i);
    });
  });

  it('disables save buttons and shows an error message when password is not provided', async () => {
    const {
      clearPassword, getPasswordTextInput, getSaveButton,
      getSaveAndEditProfileButton, getErrorMessage,
    } = setupUserForm({ ...user, passwordConfirm: '' });

    clearPassword();
    fireEvent.blur(getPasswordTextInput());

    await waitFor(() => {
      expect(getSaveButton()).toHaveAttribute('disabled');
      expect(getSaveAndEditProfileButton()).toHaveAttribute('disabled');
      expect(getErrorMessage()).toHaveTextContent(/field required/i);
    });
  });

  it('disables save buttons and shows an error message when confirm password is not provided', async () => {
    const { getSaveButton, getSaveAndEditProfileButton, getErrorMessage } = setupUserFormAndFillValues({ ...user, passwordConfirm: '' });

    await waitFor(() => {
      expect(getSaveButton()).toHaveAttribute('disabled');
      expect(getSaveAndEditProfileButton()).toHaveAttribute('disabled');
      expect(getErrorMessage()).toHaveTextContent(/field required/i);
    });
  });

  it('disables save buttons and shows an error message when profile type is not provided', async () => {
    const { getSaveButton, getSaveAndEditProfileButton, getErrorMessage } = setupUserFormAndFillValues({ ...user, profileType: '' });

    await waitFor(() => {
      expect(getSaveButton()).toHaveAttribute('disabled');
      expect(getSaveAndEditProfileButton()).toHaveAttribute('disabled');
      expect(getErrorMessage()).toHaveTextContent(/field required/i);
    });
  });

  it('disables save buttons and shows an error message when username is too short', async () => {
    const { getSaveButton, getSaveAndEditProfileButton, getErrorMessage } = setupUserFormAndFillValues({ ...user, username: 'abc' });

    await waitFor(() => {
      expect(getSaveButton()).toHaveAttribute('disabled');
      expect(getSaveAndEditProfileButton()).toHaveAttribute('disabled');
      expect(getErrorMessage()).toHaveTextContent(/must be 4 characters or more/i);
    });
  });

  it('disables save buttons and shows an error message when username is too long', async () => {
    const { getSaveButton, getSaveAndEditProfileButton, getErrorMessage } =
      setupUserFormAndFillValues({
        ...user, username: 'thisisastringthathasmorethan80characters_thisisastringthathasmorethan80characters',
      });

    await waitFor(() => {
      expect(getSaveButton()).toHaveAttribute('disabled');
      expect(getSaveAndEditProfileButton()).toHaveAttribute('disabled');
      expect(getErrorMessage()).toHaveTextContent(/must be 80 characters or less/i);
    });
  });

  it('disables save buttons and shows an error message when username contains invalid characters', async () => {
    const { getSaveButton, getSaveAndEditProfileButton, getErrorMessage } = setupUserFormAndFillValues({ ...user, username: '-invalid-' });

    await waitFor(() => {
      expect(getSaveButton()).toHaveAttribute('disabled');
      expect(getSaveAndEditProfileButton()).toHaveAttribute('disabled');
      expect(getErrorMessage()).toHaveTextContent(/contains invalid characters/i);
    });
  });

  it('disables save buttons and shows an error message when password is too short', async () => {
    const shortPassword = 'abc';
    const {
      getSaveButton, getSaveAndEditProfileButton, getErrorMessage,
    } = setupUserFormAndFillValues({
      ...user, password: shortPassword, passwordConfirm: shortPassword,
    });

    await waitFor(() => {
      expect(getSaveButton()).toHaveAttribute('disabled');
      expect(getSaveAndEditProfileButton()).toHaveAttribute('disabled');
      expect(getErrorMessage()).toHaveTextContent(/must be 8 characters or more/i);
    });
  });

  it('disables save buttons and shows an error message when password is too long', async () => {
    const longPassword = 'stringwithover20chars';
    const {
      getSaveButton, getSaveAndEditProfileButton, getErrorMessage,
    } = setupUserFormAndFillValues({
      ...user, password: longPassword, passwordConfirm: longPassword,
    });

    await waitFor(() => {
      expect(getSaveButton()).toHaveAttribute('disabled');
      expect(getSaveAndEditProfileButton()).toHaveAttribute('disabled');
      expect(getErrorMessage()).toHaveTextContent(/must be 20 characters or less/i);
    });
  });

  it('disables save buttons and shows an error message when password contains invalid characters', async () => {
    const invalidPassword = '-invalid-';
    const {
      getSaveButton, getSaveAndEditProfileButton, getErrorMessage,
    } = setupUserFormAndFillValues({
      ...user, password: invalidPassword, passwordConfirm: invalidPassword,
    });

    await waitFor(() => {
      expect(getSaveButton()).toHaveAttribute('disabled');
      expect(getSaveAndEditProfileButton()).toHaveAttribute('disabled');
      expect(getErrorMessage()).toHaveTextContent(/contains invalid characters/i);
    });
  });

  it('disables save buttons and shows an error message when password doesn\'t match confirm password', async () => {
    const { getSaveButton, getSaveAndEditProfileButton, getErrorMessage } =
      setupUserFormAndFillValues({
        ...user, password: 'password', passwordConfirm: 'differentpass',
      });

    await waitFor(() => {
      expect(getSaveButton()).toHaveAttribute('disabled');
      expect(getSaveAndEditProfileButton()).toHaveAttribute('disabled');
      expect(getErrorMessage()).toHaveTextContent(/value doesn't match with password/i);
    });
  });

  describe('When editing', () => {
    const detailedUser = {
      ...user,
      lastLogin: '2021-11-11 00:00:00',
      lastPasswordChange: '2021-11-12 00:00:00',
      registration: '2021-11-10 00:00:00',
      reset: false,
    };

    it('calls onSubmit with all the fields when save is clicked', async () => {
      const { mockHandleSubmit, clickSave } = setupUserForm(detailedUser, true);

      clickSave();

      await waitFor(() => {
        expect(mockHandleSubmit).toHaveBeenCalledTimes(1);
        expect(mockHandleSubmit).toHaveBeenCalledWith(detailedUser, 'save');
      });
    });

    it('disables username', () => {
      const { getUsernameTextInput } = setupUserForm(detailedUser, true);

      expect(getUsernameTextInput()).toHaveAttribute('disabled');
    });

    it('doesn\'t show profile type field', () => {
      const { queryProfileTypeSelectInput } = setupUserForm(detailedUser, true);

      expect(queryProfileTypeSelectInput()).not.toBeInTheDocument();
    });

    it('shows the reset switch and static fields -- registration, last login, last password change', () => {
      const { queryResetSwitchInput } = setupUserForm(detailedUser, true);

      expect(screen.getByText(detailedUser.lastLogin)).toBeInTheDocument();
      expect(screen.getByText(detailedUser.lastPasswordChange)).toBeInTheDocument();
      expect(screen.getByText(detailedUser.registration)).toBeInTheDocument();
      expect(queryResetSwitchInput()).toBeInTheDocument();
    });

    it('doesn\'t show save and edit profile button', () => {
      const { querySaveAndEditProfileButton } = setupUserForm(detailedUser, true);

      expect(querySaveAndEditProfileButton()).not.toBeInTheDocument();
    });

    it('doesn\'t disable save button and doesn\'t show an error message when password is empty', async () => {
      const {
        clearPassword, getPasswordTextInput, queryErrorMessage, getSaveButton,
      } = setupUserForm({ ...detailedUser, passwordConfirm: '' }, true);

      clearPassword('');
      fireEvent.blur(getPasswordTextInput());

      await waitFor(() => {
        expect(getSaveButton()).not.toHaveAttribute('disabled');
        expect(queryErrorMessage()).not.toBeInTheDocument();
      });
    });
  });
});
