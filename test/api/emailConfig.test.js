import { makeRequest, METHODS } from '@entando/apimanager';

import { getSMTPServerSettings } from 'api/emailConfig';
import { MOCK_SMTP_SERVER_SETTINGS } from 'test/mocks/emailConfig';

jest.mock('@entando/apimanager', () => ({
  makeRequest: jest.fn(() => new Promise(resolve => resolve({}))),
  METHODS: { GET: 'GET', POST: 'POST', PUT: 'PUT' },
}));

describe('api/emailConfig', () => {
  describe('getSMTPServerSettings', () => {
    it('should return a promise', () => {
      expect(getSMTPServerSettings()).toBeInstanceOf(Promise);
    });

    it('should make a request with the correct parameters', () => {
      getSMTPServerSettings();
      expect(makeRequest).toHaveBeenCalledWith({
        uri: '/api/plugins/emailSettings/SMTPServer',
        method: METHODS.GET,
        mockResponse: MOCK_SMTP_SERVER_SETTINGS,
        useAuthentication: true,
      });
    });
  });
});
