import { makeRequest, METHODS } from '@entando/apimanager';

import { getCurrentTenant } from 'api/multiTenancy';
import { GET_CURRENT_TENANT_RESPONSE_OK_PRIMARY } from 'test/mocks/multiTenancy';

jest.mock('@entando/apimanager', () => ({
  makeRequest: jest.fn(() => new Promise(resolve => resolve({}))),
  METHODS: { GET: 'GET' },
}));

describe('api/multiTenancy', () => {
  describe('getCurrentTenant', () => {
    it('should return a promise', () => {
      expect(getCurrentTenant()).toBeInstanceOf(Promise);
    });

    it('should make a request with the correct parameters', () => {
      getCurrentTenant();
      expect(makeRequest).toHaveBeenCalledWith({
        uri: '/api/currentTenant',
        method: METHODS.GET,
        mockResponse: GET_CURRENT_TENANT_RESPONSE_OK_PRIMARY,
        useAuthentication: true,
      });
    });
  });
});
