import React from 'react';
import { screen, within, waitFor, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';

import RestrictionsForm from 'ui/users/restrictions/RestrictionsForm';
import { renderWithIntl } from 'test/testUtils';

const setupRestrictionsForm = (initialValues = {
  enableGravatarIntegration: false,
  passwordAlwaysActive: false,
  maxMonthsPasswordValid: '',
  lastAccessPasswordExpirationMonths: '',
}) => {
  const mockHandleMount = jest.fn();
  const mockHandleSubmit = jest.fn();
  const utils = renderWithIntl((
    <RestrictionsForm
      initialValues={initialValues}
      onMount={mockHandleMount}
      onSubmit={mockHandleSubmit}
    />
  ));
  const formView = within(screen.getByRole('form'));

  const getMaxMonthsPasswordValidInput = () => formView.getByRole('textbox', { name: /last access/i });
  const getLastAccessPasswordExpirationMonthsInput = () => formView.getByRole('textbox', { name: /months the password is valid\.$/i });
  const getSaveButton = () => formView.getByRole('button', { name: /save/i });
  const getErrorMessage = () => formView.getByRole('alert');

  const typeMaxMonthsPasswordValid =
    value => userEvent.type(getMaxMonthsPasswordValidInput(), value);
  const typeLastAccessPasswordExpirationMonths =
    value => userEvent.type(getLastAccessPasswordExpirationMonthsInput(), value);

  const clickSave = () => userEvent.click(getSaveButton());

  return {
    ...utils,
    mockHandleMount,
    mockHandleSubmit,
    getMaxMonthsPasswordValidInput,
    getLastAccessPasswordExpirationMonthsInput,
    getSaveButton,
    getErrorMessage,
    typeMaxMonthsPasswordValid,
    typeLastAccessPasswordExpirationMonths,
    clickSave,
  };
};

const setupRestrictionsFormAndFillValues = ({
  maxMonthsPasswordValid, lastAccessPasswordExpirationMonths,
}) => {
  const utils = setupRestrictionsForm();
  utils.typeMaxMonthsPasswordValid(maxMonthsPasswordValid);
  utils.typeLastAccessPasswordExpirationMonths(lastAccessPasswordExpirationMonths);

  fireEvent.blur(utils.getLastAccessPasswordExpirationMonthsInput());

  return utils;
};

describe('RestrictionsForm', () => {
  const userRestrictions = {
    maxMonthsPasswordValid: '12',
    lastAccessPasswordExpirationMonths: '6',
    enableGravatarIntegration: false,
    passwordAlwaysActive: false,
  };

  it('calls onMount when form has been rendered', () => {
    const { mockHandleMount } = setupRestrictionsForm();

    expect(mockHandleMount).toHaveBeenCalledTimes(1);
  });

  it('calls onSubmit with all the fields when save is clicked', async () => {
    const { mockHandleSubmit, clickSave } = setupRestrictionsFormAndFillValues(userRestrictions);

    clickSave();

    await waitFor(() => {
      expect(mockHandleSubmit).toHaveBeenCalledTimes(1);
      expect(mockHandleSubmit).toHaveBeenCalledWith(userRestrictions);
    });
  });

  it('disables save button and shows an error message when last access password expiration is more than max months password is valid', async () => {
    const { getSaveButton, getErrorMessage } = setupRestrictionsFormAndFillValues({
      ...userRestrictions,
      maxMonthsPasswordValid: '12',
      lastAccessPasswordExpirationMonths: '13',
    });

    await waitFor(() => {
      expect(getSaveButton()).toHaveAttribute('disabled');
      expect(getErrorMessage()).toHaveTextContent(/value must be equal to or less than the previous field/i);
    });
  });

  it('disables last access password expiration and max months password is valid fields when password always active is enabled', () => {
    const {
      getMaxMonthsPasswordValidInput, getLastAccessPasswordExpirationMonthsInput,
    } = setupRestrictionsForm({
      ...userRestrictions,
      passwordAlwaysActive: true,
    });

    expect(getMaxMonthsPasswordValidInput()).toHaveAttribute('disabled');
    expect(getLastAccessPasswordExpirationMonthsInput()).toHaveAttribute('disabled');
  });
});
