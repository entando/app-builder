import 'test/enzyme-init';
import { getIntegration } from 'api/dashboard';
import { makeRequest, METHODS } from '@entando/apimanager';
import { INTEGRATIONS } from 'test/mocks/dashboard';


jest.unmock('api/dashboard');
jest.mock('@entando/apimanager', () => ({
  makeRequest: jest.fn(() => new Promise(resolve => resolve({}))),
  METHODS: require.requireActual('@entando/apimanager').METHODS,
}));

describe('api/dashboard', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getIntegration', () => {
    it('returns a promise', () => {
      expect(getIntegration()).toBeInstanceOf(Promise);
    });

    it('makes the correct request', () => {
      getIntegration();
      expect(makeRequest).toHaveBeenCalledWith({
        uri: '/api/dashboard/integration',
        method: METHODS.GET,
        mockResponse: INTEGRATIONS,
        useAuthentication: true,
      });
    });
  });
});
