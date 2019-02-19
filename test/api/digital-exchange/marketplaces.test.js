import 'test/enzyme-init';
import {
  getDEMarketplaces,
  getDEMarketplace,
  deleteDEMarketplace,
  postDEMarketplaces,
  putDEMarketplaces,
} from 'api/digital-exchange/marketplaces';
import { makeRequest, METHODS } from '@entando/apimanager';
import { LIST_DE_MARKETPLACES_OK } from 'test/mocks/digital-exchange/marketplaces';

jest.unmock('api/digital-exchange/marketplaces');
jest.mock('@entando/apimanager', () => ({
  makeRequest: jest.fn(() => new Promise(resolve => resolve({}))),
  METHODS: require.requireActual('@entando/apimanager').METHODS,
}));

describe('api/digital-exchange/marketplaces', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getDEMarketplaces', () => {
    it('returns a promise', () => {
      expect(getDEMarketplaces()).toBeInstanceOf(Promise);
    });

    it('makes the correct request', () => {
      getDEMarketplaces();
      expect(makeRequest).toHaveBeenCalledWith(
        {
          uri: '/api/digitalExchange/exchanges',
          method: METHODS.GET,
          mockResponse: LIST_DE_MARKETPLACES_OK,
          useAuthentication: true,
        },
        {
          page: 1,
          pageSize: 10,
        },
      );
    });
  });

  describe('getDEMarketplace', () => {
    it('returns a promise', () => {
      expect(getDEMarketplace(12)).toBeInstanceOf(Promise);
    });

    it('makes the correct request', () => {
      getDEMarketplace(12);
      expect(makeRequest).toHaveBeenCalledWith({
        uri: '/api/digitalExchange/exchanges/12',
        method: METHODS.GET,
        mockResponse: {},
        useAuthentication: true,
      });
    });
  });

  describe('deleteDEMarketplace', () => {
    it('returns a promise', () => {
      expect(deleteDEMarketplace(12)).toBeInstanceOf(Promise);
    });

    it('makes the correct request', () => {
      deleteDEMarketplace(12);
      expect(makeRequest).toHaveBeenCalledWith({
        uri: '/api/digitalExchange/exchanges/12',
        method: METHODS.DELETE,
        mockResponse: {},
        useAuthentication: true,
      });
    });
  });

  describe('postDEMarketplaces', () => {
    it('returns a promise', () => {
      expect(postDEMarketplaces({})).toBeInstanceOf(Promise);
    });

    it('makes the correct request', () => {
      const body = { active: false };
      postDEMarketplaces(body);
      expect(makeRequest).toHaveBeenCalledWith({
        uri: '/api/digitalExchange/exchanges',
        method: METHODS.POST,
        mockResponse: {},
        useAuthentication: true,
        body,
      });
    });
  });

  describe('putDEMarketplaces', () => {
    it('returns a promise', () => {
      expect(putDEMarketplaces({})).toBeInstanceOf(Promise);
    });

    it('makes the correct request', () => {
      const body = { id: 12 };
      putDEMarketplaces(body);
      expect(makeRequest).toHaveBeenCalledWith({
        uri: '/api/digitalExchange/exchanges/12',
        method: METHODS.PUT,
        mockResponse: {},
        useAuthentication: true,
        body,
      });
    });
  });
});
