import React from 'react';
import { screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import * as reactRedux from 'react-redux';

import { renderWithIntlAndState } from 'test/testUtils';
import EmailConfigSmtpServerContainer from 'ui/email-config/EmailConfigSmtpServerContainer';
import { initialState } from 'state/email-config/reducer';

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
const useSelectorSpy = jest.spyOn(reactRedux, 'useSelector');
useSelectorSpy.mockReturnValue(callback => callback({
  emailConfig: {
    smtpServer: {
      ...initialState,
    },
  },
}));

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
});
