import 'test/enzyme-init';
import {
  getDigitalExchanges,
  getDigitalExchange,
  deleteDigitalExchange,
  postDigitalExchange,
  putDigitalExchange,
} from 'api/digital-exchange/digitalExchanges';
import { makeRequest, METHODS } from '@entando/apimanager';
import { LIST_DIGITAL_EXCHANGES_OK } from 'test/mocks/digital-exchange/digitalExchanges';

jest.unmock('api/digital-exchange/digitalExchanges');
jest.mock('@entando/apimanager', () => ({
  makeRequest: jest.fn(() => new Promise(resolve => resolve({}))),
  METHODS: require.requireActual('@entando/apimanager').METHODS,
}));

describe('api/digital-exchange/digitalExchanges', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getDigitalExchanges', () => {
    it('returns a promise', () => {
      expect(getDigitalExchanges()).toBeInstanceOf(Promise);
    });

    it('makes the correct request', () => {
      getDigitalExchanges();
      expect(makeRequest).toHaveBeenCalledWith(
        {
          uri: '/exchanges',
          path: '/digital-exchange',
          method: METHODS.GET,
          mockResponse: LIST_DIGITAL_EXCHANGES_OK,
          useAuthentication: true,
        },
        {
          page: 1,
          pageSize: 10,
        },
      );
    });
  });

  describe('getDigitalExchange', () => {
    it('returns a promise', () => {
      expect(getDigitalExchange(12)).toBeInstanceOf(Promise);
    });

    it('makes the correct request', () => {
      getDigitalExchange(12);
      expect(makeRequest).toHaveBeenCalledWith({
        uri: '/exchanges/12',
        path: '/digital-exchange',
        method: METHODS.GET,
        mockResponse: {},
        useAuthentication: true,
      });
    });
  });

  describe('deleteDigitalExchange', () => {
    it('returns a promise', () => {
      expect(deleteDigitalExchange(12)).toBeInstanceOf(Promise);
    });

    it('makes the correct request', () => {
      deleteDigitalExchange(12);
      expect(makeRequest).toHaveBeenCalledWith({
        uri: '/exchanges/12',
        path: '/digital-exchange',
        method: METHODS.DELETE,
        mockResponse: {},
        useAuthentication: true,
      });
    });
  });

  describe('postDigitalExchange', () => {
    it('returns a promise', () => {
      expect(postDigitalExchange({})).toBeInstanceOf(Promise);
    });

    it('makes the correct request', () => {
      const body = { active: false };
      postDigitalExchange(body);
      expect(makeRequest).toHaveBeenCalledWith({
        uri: '/exchanges',
        path: '/digital-exchange',
        method: METHODS.POST,
        mockResponse: {},
        useAuthentication: true,
        body,
      });
    });
  });

  describe('putDigitalExchange', () => {
    it('returns a promise', () => {
      expect(putDigitalExchange({})).toBeInstanceOf(Promise);
    });

    it('makes the correct request', () => {
      const body = { id: 12 };
      putDigitalExchange(body);
      expect(makeRequest).toHaveBeenCalledWith({
        uri: '/exchanges/12',
        path: '/digital-exchange',
        method: METHODS.PUT,
        mockResponse: {},
        useAuthentication: true,
        body,
      });
    });
  });
});
