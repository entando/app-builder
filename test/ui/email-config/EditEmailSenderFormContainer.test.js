import React from 'react';
import { fireEvent, screen } from '@testing-library/dom';
import '@testing-library/jest-dom/extend-expect';
import * as reactRedux from 'react-redux';

import { renderWithIntlRouterState, setupForm } from 'test/testUtils';
import userEvent from '@testing-library/user-event';
import EditEmailSenderFormContainer from 'ui/email-config/EditEmailSenderFormContainer';
import { ROUTE_EMAIL_CONFIG_SENDERS_EDIT } from 'app-init/router';

jest.unmock('react-redux');
jest.unmock('redux-form');

const useDispatchSpy = jest.spyOn(reactRedux, 'useDispatch');
const mockDispatch = jest.fn();
useDispatchSpy.mockReturnValue(mockDispatch);

describe('EditEmailSenderFormContainer', () => {
  afterEach(() => {
    mockDispatch.mockClear();
  });

  const testCode = 'testcode';

  it('should fetch the relevant data on initial render', () => {
    const ROUTE_EMAIL_CONFIG_SENDERS_EDIT_TESTCODE = ROUTE_EMAIL_CONFIG_SENDERS_EDIT.replace(':code', testCode);
    renderWithIntlRouterState(<EditEmailSenderFormContainer />, {
      initialRoute: ROUTE_EMAIL_CONFIG_SENDERS_EDIT_TESTCODE,
      path: ROUTE_EMAIL_CONFIG_SENDERS_EDIT,
    });
    expect(mockDispatch).toHaveBeenCalledTimes(1);
    expect(mockDispatch).toHaveBeenCalledWith({ type: 'fetchEmailSender_test', payload: testCode });
  });

  it('should render the correct heading', () => {
    renderWithIntlRouterState(<EditEmailSenderFormContainer />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Edit Sender');
  });

  describe('form', () => {
    const setupEmailSenderForm = () => {
      const formValues = {
        code: 'testcode',
        email: 'testemail@test.com',
      };
      return setupForm('emailSender', formValues, renderWithIntlRouterState, <EditEmailSenderFormContainer />);
    };

    it('should render code and email fields', () => {
      const { formView, formValues } = setupEmailSenderForm();
      expect(formView.getByRole('textbox', { name: 'Code' })).toHaveDisplayValue(formValues.code);
      expect(formView.getByRole('textbox', { name: 'Email' })).toHaveDisplayValue(formValues.email);
    });

    it('should render "Save" button that calls the correct action when clicked', () => {
      const { formView, formValues } = setupEmailSenderForm();
      const saveBtn = formView.getByRole('button', { name: 'Save' });
      expect(saveBtn).toHaveAttribute('type', 'submit');
      mockDispatch.mockClear();
      userEvent.click(saveBtn);
      expect(mockDispatch).toHaveBeenCalledTimes(1);
      expect(mockDispatch).toHaveBeenCalledWith({ type: 'updateEmailSender_test', payload: formValues });
    });

    it('should render a disabled "Save" button when code field is empty', () => {
      const { formView } = setupEmailSenderForm();
      const codeField = formView.getByRole('textbox', { name: 'Code' });
      fireEvent.change(codeField, { target: { value: '' } });
      const saveBtn = formView.getByRole('button', { name: 'Save' });
      expect(saveBtn).toBeDisabled();
    });

    it('should render a disabled "Save" button when email field is empty', () => {
      const { formView } = setupEmailSenderForm();
      const emailField = formView.getByRole('textbox', { name: 'Email' });
      fireEvent.change(emailField, { target: { value: '' } });
      const saveBtn = formView.getByRole('button', { name: 'Save' });
      expect(saveBtn).toBeDisabled();
    });
  });
});
