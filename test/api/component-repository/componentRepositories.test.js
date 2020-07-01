import 'test/enzyme-init';
import {
  getComponentRepositories,
  getComponentRepository,
  deleteComponentRepository,
  postComponentRepository,
  putComponentRepository,
} from 'api/component-repository/componentRepositories';
import { makeRequest, METHODS } from '@entando/apimanager';
import { LIST_COMPONENT_REPOSITORIES_OK } from 'test/mocks/component-repository/componentRepositories';

jest.unmock('api/component-repository/componentRepositories');
jest.mock('@entando/apimanager', () => ({
  makeRequest: jest.fn(() => new Promise(resolve => resolve({}))),
  METHODS: require.requireActual('@entando/apimanager').METHODS,
}));

describe('api/component-repository/componentRepositories', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getComponentRepositories', () => {
    it('returns a promise', () => {
      expect(getComponentRepositories()).toBeInstanceOf(Promise);
    });

    it('makes the correct request', () => {
      getComponentRepositories();
      expect(makeRequest).toHaveBeenCalledWith(
        {
          uri: '/exchanges',
          domain: '/digital-exchange',
          method: METHODS.GET,
          mockResponse: LIST_COMPONENT_REPOSITORIES_OK,
          useAuthentication: true,
        },
        {
          page: 1,
          pageSize: 10,
        },
      );
    });
  });

  describe('getComponentRepository', () => {
    it('returns a promise', () => {
      expect(getComponentRepository(12)).toBeInstanceOf(Promise);
    });

    it('makes the correct request', () => {
      getComponentRepository(12);
      expect(makeRequest).toHaveBeenCalledWith({
        uri: '/exchanges/12',
        domain: '/digital-exchange',
        method: METHODS.GET,
        mockResponse: {},
        useAuthentication: true,
      });
    });
  });

  describe('deleteComponentRepository', () => {
    it('returns a promise', () => {
      expect(deleteComponentRepository(12)).toBeInstanceOf(Promise);
    });

    it('makes the correct request', () => {
      deleteComponentRepository(12);
      expect(makeRequest).toHaveBeenCalledWith({
        uri: '/exchanges/12',
        domain: '/digital-exchange',
        method: METHODS.DELETE,
        mockResponse: {},
        useAuthentication: true,
      });
    });
  });

  describe('postComponentRepository', () => {
    it('returns a promise', () => {
      expect(postComponentRepository({})).toBeInstanceOf(Promise);
    });

    it('makes the correct request', () => {
      const body = { active: false };
      postComponentRepository(body);
      expect(makeRequest).toHaveBeenCalledWith({
        uri: '/exchanges',
        domain: '/digital-exchange',
        method: METHODS.POST,
        mockResponse: {},
        useAuthentication: true,
        body,
      });
    });
  });

  describe('putComponentRepository', () => {
    it('returns a promise', () => {
      expect(putComponentRepository({})).toBeInstanceOf(Promise);
    });

    it('makes the correct request', () => {
      const body = { id: 12 };
      putComponentRepository(body);
      expect(makeRequest).toHaveBeenCalledWith({
        uri: '/exchanges/12',
        domain: '/digital-exchange',
        method: METHODS.PUT,
        mockResponse: {},
        useAuthentication: true,
        body,
      });
    });
  });
});
