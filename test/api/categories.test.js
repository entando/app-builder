import 'test/enzyme-init';
import { getCategoryTree } from 'api/categories';
import { makeMockRequest, METHODS } from 'api/apiManager';
import { CATEGORY_TREE } from 'test/mocks/categories';

const correctGetRequest = {
  uri: '/api/categories',
  method: METHODS.GET,
  mockResponse: CATEGORY_TREE.home,
  useAuthentication: true,
};

jest.unmock('api/categories');
jest.mock('api/apiManager', () => ({
  makeMockRequest: jest.fn(() => new Promise(resolve => resolve({}))),
  METHODS: { GET: 'GET' },
}));

describe('api/categories', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getCategoryTree', () => {
    it('returns a promise', () => {
      expect(getCategoryTree()).toBeInstanceOf(Promise);
    });

    it('get category tree', () => {
      getCategoryTree();
      expect(makeMockRequest).toHaveBeenCalledWith(correctGetRequest);
    });

    it('makes the request with additional params', () => {
      getCategoryTree('?parentNode=home');
      expect(makeMockRequest).toHaveBeenCalledWith({
        ...correctGetRequest,
        uri: '/api/categories?parentNode=home',
      });
    });
  });
});
