import { makeRequest, METHODS } from '@entando/apimanager';

import { MOCK_SMTP_SERVER_SETTINGS, MOCK_EMAIL_SENDER_LIST, MOCK_EMAIL_SENDER } from 'test/mocks/emailConfig';

export const getSMTPServerSettings = () => makeRequest({
  uri: '/api/plugins/emailSettings/SMTPServer',
  method: METHODS.GET,
  mockResponse: MOCK_SMTP_SERVER_SETTINGS,
  useAuthentication: true,
});

export const putSMTPServerSettings = config => makeRequest({
  uri: '/api/plugins/emailSettings/SMTPServer',
  method: METHODS.PUT,
  body: config,
  mockResponse: MOCK_SMTP_SERVER_SETTINGS,
  useAuthentication: true,
});

export const postTestEmailConfig = config => makeRequest({
  uri: '/api/plugins/emailSettings/SMTPServer/testConfiguration',
  method: METHODS.POST,
  body: config,
  mockResponse: {},
  useAuthentication: true,
});

export const postSendTestEmail = () => makeRequest({
  uri: '/api/plugins/emailSettings/SMTPServer/sendTestEmail',
  method: METHODS.POST,
  body: {},
  mockResponse: {},
  useAuthentication: true,
});

export const getEmailSenders = () => makeRequest({
  uri: '/api/plugins/emailSettings/senders',
  method: METHODS.GET,
  mockResponse: MOCK_EMAIL_SENDER_LIST,
  useAuthentication: true,
});

export const deleteEmailSender = code => makeRequest({
  uri: `/api/plugins/emailSettings/senders/${code}`,
  method: METHODS.DELETE,
  mockResponse: {},
  useAuthentication: true,
});

export const postEmailSender = sender => makeRequest({
  uri: '/api/plugins/emailSettings/senders',
  method: METHODS.POST,
  body: sender,
  mockResponse: MOCK_EMAIL_SENDER,
  useAuthentication: true,
});

export const getEmailSender = code => makeRequest({
  uri: `/api/plugins/emailSettings/senders/${code}`,
  method: METHODS.GET,
  mockResponse: MOCK_EMAIL_SENDER,
  useAuthentication: true,
});

export const putEmailSender = sender => makeRequest({
  uri: `/api/plugins/emailSettings/senders/${sender.code}`,
  method: METHODS.PUT,
  body: sender,
  mockResponse: MOCK_EMAIL_SENDER,
  useAuthentication: true,
});
