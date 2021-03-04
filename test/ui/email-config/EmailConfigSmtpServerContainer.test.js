import React from 'react';
import { screen, within } from '@testing-library/dom';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import * as reactRedux from 'react-redux';

import { renderWithIntlAndState, setupForm } from 'test/testUtils';
import EmailConfigSmtpServerContainer from 'ui/email-config/EmailConfigSmtpServerContainer';

jest.unmock('react-redux');
jest.unmock('redux-form');

jest.mock('state/email-config/actions', () => ({
  fetchSMTPServerSettings: jest.fn(() => ({ type: 'fetchSMTPServerSettings_test' })),
  saveEmailConfig: jest.fn(payload => ({ type: 'saveEmailConfig_test', payload })),
  testEmailConfig: jest.fn(payload => ({ type: 'testEmailConfig_test', payload })),
  sendTestEmail: jest.fn(() => ({ type: 'sendTestEmail_test' })),
}));

const useDispatchSpy = jest.spyOn(reactRedux, 'useDispatch');
const mockDispatch = jest.fn();
useDispatchSpy.mockReturnValue(mockDispatch);

describe('EmailConfigSmtpServerContainer', () => {
  afterEach(() => {
    mockDispatch.mockClear();
  });

  it('should fetch relevant data on initial render', () => {
    renderWithIntlAndState(<EmailConfigSmtpServerContainer />);
    expect(mockDispatch).toHaveBeenCalledTimes(1);
    expect(mockDispatch).toHaveBeenCalledWith({ type: 'fetchSMTPServerSettings_test' });
  });

  it('should render a panel message', () => {
    renderWithIntlAndState(<EmailConfigSmtpServerContainer />);
    const panelMsg = 'Host is mandatory. Port and Timeout if blank, will default to 25 and 10000. Please leave Username and Password blank if the SMTP server does not require authentication.';
    expect(screen.getByText(panelMsg)).toBeInTheDocument();
  });

  describe('form', () => {
    const setupEmailConfigForm = () => {
      const formValues = {
        active: true,
        debugMode: false,
        host: 'localhost',
        port: '25000',
        protocol: 'STD',
        checkServerIdentity: true,
        timeout: 41331973,
        username: 'testuser',
        password: 'testpassword',
      };
      return setupForm('emailConfig', formValues, renderWithIntlAndState, <EmailConfigSmtpServerContainer />);
    };

    const getHeadings = view => view.getAllByRole('heading');

    it('should render General Settings section', () => {
      const { formView } = setupEmailConfigForm();
      expect(getHeadings(formView)[0]).toHaveTextContent('General Settings');
      expect(formView.getByLabelText('Active')).toHaveTextContent('ON');
      expect(formView.getByLabelText('Debug Mode')).toHaveTextContent('OFF');
    });

    it('should render Connection section', () => {
      const { formView, formValues } = setupEmailConfigForm();
      const securityRadioGroupView = within(formView.getByLabelText('Security'));
      expect(getHeadings(formView)[1]).toHaveTextContent('Connection');
      expect(formView.getByRole('textbox', { name: 'Host' })).toHaveDisplayValue(formValues.host);
      expect(formView.getByRole('textbox', { name: 'Port' })).toHaveDisplayValue(formValues.port);
      expect(securityRadioGroupView.getByRole('radio', { name: 'None' })).toBeChecked();
      expect(formView.getByLabelText('Check Server Identity')).toHaveTextContent('ON');
      expect(formView.getByRole('textbox', { name: 'Timeout (in milliseconds)' })).toHaveDisplayValue(formValues.timeout);
    });

    it('should render Authentication section', () => {
      const { formView, formValues } = setupEmailConfigForm();
      expect(getHeadings(formView)[2]).toHaveTextContent('Authentication');
      expect(formView.getByRole('textbox', { name: 'Username' })).toHaveDisplayValue(formValues.username);
      expect(formView.getByLabelText('Password')).toHaveDisplayValue(formValues.password);
      expect(formView.getByLabelText('Password')).toHaveAttribute('type', 'password');
    });

    it('should render "Test configuration" button that calls the correct action when clicked', () => {
      const { formView, formValues } = setupEmailConfigForm();
      const testConfigBtn = formView.getByRole('button', { name: 'Test configuration' });
      mockDispatch.mockClear();
      userEvent.click(testConfigBtn);
      expect(mockDispatch).toHaveBeenCalledTimes(1);
      expect(mockDispatch).toHaveBeenCalledWith({ type: 'testEmailConfig_test', payload: formValues });
    });

    it('should render "Send test email" button that calls the correct action when clicked', () => {
      const { formView } = setupEmailConfigForm();
      const sendTestEmailBtn = formView.getByRole('button', { name: 'Send test email' });
      mockDispatch.mockClear();
      userEvent.click(sendTestEmailBtn);
      expect(mockDispatch).toHaveBeenCalledTimes(1);
      expect(mockDispatch).toHaveBeenCalledWith({ type: 'sendTestEmail_test' });
    });

    it('should render "Save" button that calls the correct action when clicked', () => {
      const { formView, formValues } = setupEmailConfigForm();
      const saveBtn = formView.getByRole('button', { name: 'Save' });
      expect(saveBtn).toHaveAttribute('type', 'submit');
      mockDispatch.mockClear();
      userEvent.click(saveBtn);
      expect(mockDispatch).toHaveBeenCalledTimes(1);
      expect(mockDispatch).toHaveBeenCalledWith({ type: 'saveEmailConfig_test', payload: formValues });
    });
  });
});
