import React from 'react';
import { screen, within, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';

import EmailConfigSmtpServer from 'ui/email-config/EmailConfigSmtpServer';
import { renderWithIntl } from '../../test/testUtils';

describe('EmailConfigSmtpServer', () => {
  const onSubmit = jest.fn();
  const onTestConfig = jest.fn();
  const onSendTestEmail = jest.fn();
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
  const setupEmailConfigForm = () =>
    renderWithIntl(<EmailConfigSmtpServer
      initialValues={formValues}
      onSubmit={onSubmit}
      onTestConfig={onTestConfig}
      onSendTestEmail={onSendTestEmail}
    />);

  const getHeadings = view => view.getAllByRole('heading');

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render General Settings section', () => {
    const { debug } = setupEmailConfigForm();
    debug();
    expect(getHeadings(screen)[0]).toHaveTextContent('General Settings');
    expect(screen.getByLabelText('Active')).toHaveTextContent('ON');
    expect(screen.getByLabelText('Debug Mode')).toHaveTextContent('OFF');
  });

  it('should render Connection section', () => {
    setupEmailConfigForm();
    const securityRadioGroupView = within(screen.getByLabelText('Security'));
    expect(getHeadings(screen)[1]).toHaveTextContent('Connection');
    expect(screen.getByRole('textbox', { name: 'Host' })).toHaveDisplayValue(formValues.host);
    expect(screen.getByRole('textbox', { name: 'Port' })).toHaveDisplayValue(formValues.port);
    expect(securityRadioGroupView.getByRole('radio', { name: 'None' })).toBeChecked();
    expect(screen.getByLabelText('Check Server Identity')).toHaveTextContent('ON');
    expect(screen.getByRole('textbox', { name: 'Timeout (in milliseconds)' })).toHaveDisplayValue(formValues.timeout);
  });

  it('should render Authentication section', () => {
    setupEmailConfigForm();
    expect(getHeadings(screen)[2]).toHaveTextContent('Authentication');
    expect(screen.getByRole('textbox', { name: 'Username' })).toHaveDisplayValue(formValues.username);
    expect(screen.getByLabelText('Password')).toHaveDisplayValue(formValues.password);
    expect(screen.getByLabelText('Password')).toHaveAttribute('type', 'password');
  });

  it('should render "Test configuration" button that calls the correct action when clicked', () => {
    setupEmailConfigForm();
    const testConfigBtn = screen.getByRole('button', { name: 'Test configuration' });
    userEvent.click(testConfigBtn);
    expect(onTestConfig).toHaveBeenCalledTimes(1);
    expect(onTestConfig).toHaveBeenCalledWith(formValues);
  });

  it('should render "Send test email" button that calls the correct action when clicked', () => {
    setupEmailConfigForm();
    const sendTestEmailBtn = screen.getByRole('button', { name: 'Send test email' });
    onSendTestEmail.mockClear();
    userEvent.click(sendTestEmailBtn);
    expect(onSendTestEmail).toHaveBeenCalledTimes(1);
  });

  it('should render "Save" button that calls the correct action when clicked', async () => {
    setupEmailConfigForm();
    const saveBtn = screen.getByRole('button', { name: 'Save' });
    expect(saveBtn).toHaveAttribute('type', 'submit');
    userEvent.click(saveBtn);
    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledTimes(1);
      expect(onSubmit).toHaveBeenCalledWith(formValues);
    });
  });
});
