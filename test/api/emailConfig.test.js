import { makeRequest, METHODS } from '@entando/apimanager';

import {
  getSMTPServerSettings,
  putSMTPServerSettings,
  postTestEmailConfig,
  postSendTestEmail,
  getEmailSenders,
  deleteEmailSender,
  postEmailSender,
  getEmailSender,
  putEmailSender,
} from 'api/emailConfig';
import { MOCK_SMTP_SERVER_SETTINGS, MOCK_EMAIL_SENDER_LIST, MOCK_EMAIL_SENDER } from 'test/mocks/emailConfig';

jest.mock('@entando/apimanager', () => ({
  makeRequest: jest.fn(() => new Promise(resolve => resolve({}))),
  METHODS: {
    GET: 'GET', POST: 'POST', PUT: 'PUT', DELETE: 'DELETE',
  },
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

  describe('putSMTPServerSettings', () => {
    it('should return a promise', () => {
      expect(putSMTPServerSettings()).toBeInstanceOf(Promise);
    });

    it('should make a request with the correct parameters', () => {
      putSMTPServerSettings(MOCK_SMTP_SERVER_SETTINGS);
      expect(makeRequest).toHaveBeenCalledWith({
        uri: '/api/plugins/emailSettings/SMTPServer',
        method: METHODS.PUT,
        body: MOCK_SMTP_SERVER_SETTINGS,
        mockResponse: MOCK_SMTP_SERVER_SETTINGS,
        useAuthentication: true,
      });
    });
  });

  describe('postTestEmailConfig', () => {
    it('should return a promise', () => {
      expect(postTestEmailConfig()).toBeInstanceOf(Promise);
    });

    it('should make a request with the correct parameters', () => {
      postTestEmailConfig(MOCK_SMTP_SERVER_SETTINGS);
      expect(makeRequest).toHaveBeenCalledWith({
        uri: '/api/plugins/emailSettings/SMTPServer/testConfiguration',
        method: METHODS.POST,
        body: MOCK_SMTP_SERVER_SETTINGS,
        mockResponse: {},
        useAuthentication: true,
      });
    });
  });

  describe('postSendTestEmail', () => {
    it('should return a promise', () => {
      expect(postSendTestEmail()).toBeInstanceOf(Promise);
    });

    it('should make a request with the correct parameters', () => {
      postSendTestEmail(MOCK_SMTP_SERVER_SETTINGS);
      expect(makeRequest).toHaveBeenCalledWith({
        uri: '/api/plugins/emailSettings/SMTPServer/sendTestEmail',
        method: METHODS.POST,
        body: {},
        mockResponse: {},
        useAuthentication: true,
      });
    });
  });

  describe('getEmailSenders', () => {
    it('should return a promise', () => {
      expect(getEmailSenders()).toBeInstanceOf(Promise);
    });

    it('should make a request with the correct parametsrs', () => {
      getEmailSenders();
      expect(makeRequest).toHaveBeenCalledWith({
        uri: '/api/plugins/emailSettings/senders',
        method: METHODS.GET,
        mockResponse: MOCK_EMAIL_SENDER_LIST,
        useAuthentication: true,
      });
    });
  });

  describe('deleteEmailSender', () => {
    it('should return a promise', () => {
      expect(deleteEmailSender()).toBeInstanceOf(Promise);
    });

    it('should make a request with the correct parametsrs', () => {
      deleteEmailSender('testcode');
      expect(makeRequest).toHaveBeenCalledWith({
        uri: '/api/plugins/emailSettings/senders/testcode',
        method: METHODS.DELETE,
        mockResponse: {},
        useAuthentication: true,
      });
    });
  });

  describe('postEmailSender', () => {
    it('should return a promise', () => {
      expect(postEmailSender()).toBeInstanceOf(Promise);
    });

    it('should make a request with the correct parametsrs', () => {
      postEmailSender(MOCK_EMAIL_SENDER);
      expect(makeRequest).toHaveBeenCalledWith({
        uri: '/api/plugins/emailSettings/senders',
        method: METHODS.POST,
        body: MOCK_EMAIL_SENDER,
        mockResponse: MOCK_EMAIL_SENDER,
        useAuthentication: true,
      });
    });
  });

  describe('postEmailSender', () => {
    it('should return a promise', () => {
      expect(postEmailSender()).toBeInstanceOf(Promise);
    });

    it('should make a request with the correct parametsrs', () => {
      postEmailSender(MOCK_EMAIL_SENDER);
      expect(makeRequest).toHaveBeenCalledWith({
        uri: '/api/plugins/emailSettings/senders',
        method: METHODS.POST,
        body: MOCK_EMAIL_SENDER,
        mockResponse: MOCK_EMAIL_SENDER,
        useAuthentication: true,
      });
    });
  });

  describe('getEmailSender', () => {
    it('should return a promise', () => {
      expect(getEmailSender()).toBeInstanceOf(Promise);
    });

    it('should make a request with the correct parametsrs', () => {
      getEmailSender(MOCK_EMAIL_SENDER.code);
      expect(makeRequest).toHaveBeenCalledWith({
        uri: `/api/plugins/emailSettings/senders/${MOCK_EMAIL_SENDER.code}`,
        method: METHODS.GET,
        mockResponse: MOCK_EMAIL_SENDER,
        useAuthentication: true,
      });
    });
  });

  describe('putEmailSender', () => {
    it('should return a promise', () => {
      expect(putEmailSender(MOCK_EMAIL_SENDER)).toBeInstanceOf(Promise);
    });

    it('should make a request with the correct parametsrs', () => {
      putEmailSender(MOCK_EMAIL_SENDER);
      expect(makeRequest).toHaveBeenCalledWith({
        uri: `/api/plugins/emailSettings/senders/${MOCK_EMAIL_SENDER.code}`,
        method: METHODS.PUT,
        body: MOCK_EMAIL_SENDER,
        mockResponse: MOCK_EMAIL_SENDER,
        useAuthentication: true,
      });
    });
  });
});
