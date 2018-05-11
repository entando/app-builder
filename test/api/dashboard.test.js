import 'test/enzyme-init';
import { getIntegration, getPageStatus } from 'api/dashboard';
import { makeRequest, METHODS } from '@entando/apimanager';
import { INTEGRATIONS, PAGE_STATUS } from 'test/mocks/dashboard';


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

  describe('getPageStatus', () => {
    it('returns a promise', () => {
      expect(getPageStatus()).toBeInstanceOf(Promise);
    });

    it('makes the correct request', () => {
      getPageStatus();
      expect(makeRequest).toHaveBeenCalledWith({
        uri: '/api/dashboard/pageStatus',
        method: METHODS.GET,
        mockResponse: PAGE_STATUS,
        useAuthentication: true,
      });
    });
  });
});
