import { makeRequest, METHODS } from '@entando/apimanager';

import { getCurrentSystemConfiguration } from 'api/currentSystemConfiguration';

import { GET_CURRENT_SYSTEM_CONFIGURATION_ADVANCED_SEARCH_ON } from 'test/mocks/currentSystemConfiguration';

jest.mock('@entando/apimanager', () => ({
  makeRequest: jest.fn(() => new Promise(resolve => resolve({}))),
  METHODS: { GET: 'GET' },
}));

describe('api/currentSystemConfiguration', () => {
  describe('getCurrentSystemConfiguration', () => {
    it('should return a promise', () => {
      expect(getCurrentSystemConfiguration()).toBeInstanceOf(Promise);
    });

    it('should make a request with the correct parameters', () => {
      getCurrentSystemConfiguration();
      expect(makeRequest).toHaveBeenCalledWith({
        uri: '/api/currentSystemConfiguration',
        method: METHODS.GET,
        mockResponse: GET_CURRENT_SYSTEM_CONFIGURATION_ADVANCED_SEARCH_ON,
        useAuthentication: true,
      });
    });
  });
});
