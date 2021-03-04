import { makeRequest, METHODS } from '@entando/apimanager';

import { MOCK_SMTP_SERVER_SETTINGS } from 'test/mocks/emailConfig';

// eslint-disable-next-line import/prefer-default-export
export const getSMTPServerSettings = () => (
  makeRequest({
    uri: '/api/plugins/emailSettings/SMTPServer',
    method: METHODS.GET,
    mockResponse: MOCK_SMTP_SERVER_SETTINGS,
    useAuthentication: true,
  })
);
