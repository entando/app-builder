import React from 'react';
import { screen, within } from '@testing-library/dom';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import * as reactRedux from 'react-redux';

import { renderWithIntlAndState as render } from 'test/testUtils';
import EmailConfigSmtpServerContainer from 'ui/email-config/EmailConfigSmtpServerContainer';

jest.unmock('react-redux');
jest.unmock('redux-form');

// jest.mock('state/email-config/actions', () => ({
//   fetchSMTPServerSettings: jest.fn(() => 'fetchSMTPServerSettings'),
// }));

const useDispatchSpy = jest.spyOn(reactRedux, 'useDispatch');
const mockDispatch = jest.fn();
useDispatchSpy.mockReturnValue(mockDispatch);

describe('EmailConfigSmtpServerContainer', () => {
  it('should fetch relevant data on initial render', () => {
    render(<EmailConfigSmtpServerContainer />);
    expect(mockDispatch).toHaveBeenCalledWith({ type: 'fetchSMTPServerSettings' });
  });

  it('should have a panel message', () => {
    render(<EmailConfigSmtpServerContainer />);
    const panelMsg = 'Host is mandatory. Port and Timeout if blank, will default to 25 and 10000. Please leave Username and Password blank if the SMTP server does not require authentication.';
    expect(screen.getByText(panelMsg)).toBeInTheDocument();
  });

  describe('form', () => {
    const formValues = {
      active: true,
      debugMode: false,
      host: 'localhost',
      port: '25000',
      security: 'none',
      checkServerIdentity: true,
      timeout: 41331973,
      username: 'testuser',
      password: 'testpassword',
    };
    const state = {
      form: {
        emailConfig: {
          values: formValues,
        },
      },
    };

    beforeEach(() => render(<EmailConfigSmtpServerContainer />, { state }));

    const getFormView = () => within(screen.getByRole('form'));
    const getHeadings = view => view.getAllByRole('heading');

    it('should have General Settings section', () => {
      const formView = getFormView();
      expect(getHeadings(formView)[0]).toHaveTextContent('General Settings');
      expect(formView.getByLabelText('Active')).toHaveTextContent('ON');
      expect(formView.getByLabelText('Debug Mode')).toHaveTextContent('OFF');
    });

    it('should have Connection section', () => {
      const formView = getFormView();
      const securityRadioGroupView = within(formView.getByLabelText('Security'));
      expect(getHeadings(formView)[1]).toHaveTextContent('Connection');
      expect(formView.getByRole('textbox', { name: 'Host' })).toHaveDisplayValue(formValues.host);
      expect(formView.getByRole('textbox', { name: 'Port' })).toHaveDisplayValue(formValues.port);
      expect(securityRadioGroupView.getByRole('radio', { name: 'None' })).toBeChecked();
      expect(formView.getByLabelText('Check Server Identity')).toHaveTextContent('ON');
      expect(formView.getByRole('textbox', { name: 'Timeout (in milliseconds)' })).toHaveDisplayValue(formValues.timeout);
    });

    it('should have Authentication section', () => {
      const formView = getFormView();
      expect(getHeadings(formView)[2]).toHaveTextContent('Authentication');
      expect(formView.getByRole('textbox', { name: 'Username' })).toHaveDisplayValue(formValues.username);
      expect(formView.getByLabelText('Password')).toHaveDisplayValue(formValues.password);
      expect(formView.getByLabelText('Password')).toHaveAttribute('type', 'password');
    });

    it('should have correct buttons that work properly', () => {
      const formView = getFormView();

      const testConfigBtn = formView.getByRole('button', { name: 'Test configuration' });
      userEvent.click(testConfigBtn);
      expect(mockDispatch).toHaveBeenCalledWith({ type: 'testEmailConfig' });

      const sendTestEmailBtn = formView.getByRole('button', { name: 'Send test email' });
      userEvent.click(sendTestEmailBtn);
      expect(mockDispatch).toHaveBeenCalledWith({ type: 'sendTestEmail' });

      const saveBtn = formView.getByRole('button', { name: 'Save' });
      expect(saveBtn).toHaveAttribute('type', 'submit');
      userEvent.click(saveBtn);
      expect(mockDispatch).toHaveBeenCalledWith({ type: 'saveEmailConfig' });
    });
  });
});
