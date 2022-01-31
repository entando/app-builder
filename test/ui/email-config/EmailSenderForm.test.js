import React from 'react';
import { screen, within, waitFor, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';

import EmailSenderForm from 'ui/email-config/EmailSenderForm';
import { renderWithIntl } from 'test/testUtils';

const setupEmailSenderForm = (initialValues = { code: '', email: '' }, editing = false) => {
  const mockHandleSubmit = jest.fn();
  const utils = renderWithIntl((
    <EmailSenderForm
      initialValues={initialValues}
      onSubmit={mockHandleSubmit}
      editing={editing}
      titleId="emailConfig.senderMgmt.new"
    />
  ));
  const formView = within(screen.getByRole('form'));

  const getCodeInput = () => formView.getByRole('textbox', { name: /code/i });
  const getEmailInput = () => formView.getByRole('textbox', { name: /email/i });
  const getSaveButton = () => formView.getByRole('button', { name: /save/i });
  const getErrorMessage = () => formView.getByRole('alert');

  const typeCode = value => userEvent.type(getCodeInput(), value);
  const typeEmail = value => userEvent.type(getEmailInput(), value);

  const clickSave = () => userEvent.click(getSaveButton());

  return {
    ...utils,
    mockHandleSubmit,
    getCodeInput,
    getEmailInput,
    getSaveButton,
    getErrorMessage,
    typeCode,
    typeEmail,
    clickSave,
  };
};

const setupEmailSenderFormAndFillValues = ({ code, email }) => {
  const utils = setupEmailSenderForm();
  utils.typeCode(code);
  utils.typeEmail(email);

  fireEvent.blur(utils.getEmailInput());

  return utils;
};

describe('EmailSenderForm', () => {
  const emailSender = {
    code: 'testcode',
    email: 'test@test.com',
  };

  it('calls onSubmit with all the fields when save is clicked', async () => {
    const { mockHandleSubmit, clickSave } = setupEmailSenderFormAndFillValues(emailSender);

    clickSave();

    await waitFor(() => {
      expect(mockHandleSubmit).toHaveBeenCalledTimes(1);
      expect(mockHandleSubmit).toHaveBeenCalledWith(emailSender);
    });
  });

  it('disables save button and shows an error message when code is empty', async () => {
    const { getSaveButton, getErrorMessage } = setupEmailSenderFormAndFillValues({ ...emailSender, code: '' });

    await waitFor(() => {
      expect(getSaveButton()).toHaveAttribute('disabled');
      expect(getErrorMessage()).toHaveTextContent(/field required/i);
    });
  });

  it('disables save button and shows an error message when email is empty', async () => {
    const { getSaveButton, getErrorMessage } = setupEmailSenderFormAndFillValues({ ...emailSender, email: '' });

    await waitFor(() => {
      expect(getSaveButton()).toHaveAttribute('disabled');
      expect(getErrorMessage()).toHaveTextContent(/field required/i);
    });
  });

  it('disables code input when on editing mode', () => {
    const { getCodeInput } = setupEmailSenderForm(emailSender, true);

    expect(getCodeInput()).toHaveAttribute('disabled');
  });
});
