import { makeRequest, METHODS } from '@entando/apimanager';

import { getSystemReport } from 'api/system';

jest.mock('@entando/apimanager', () => ({
  makeRequest: jest.fn(() => new Promise(resolve => resolve({}))),
  METHODS: { GET: 'GET' },
}));

describe('api/system', () => {
  describe('getSystemReport', () => {
    it('should return a promise', () => {
      expect(getSystemReport()).toBeInstanceOf(Promise);
    });

    it('should make a request with the correct parameters', () => {
      getSystemReport();
      expect(makeRequest).toHaveBeenCalledWith({
        uri: '/api/system/report',
        method: METHODS.GET,
        mockResponse: {},
        useAuthentication: true,
      });
    });
  });
});
