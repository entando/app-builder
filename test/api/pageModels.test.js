import 'test/enzyme-init';
import { makeRequest, METHODS } from 'api/apiManager';
import { getPageModels, getPageModel } from 'api/pageModels';


const PAGE_MODEL_CODE = 'some_code';


jest.unmock('api/pageModels');

jest.mock('api/apiManager', () => ({
  makeRequest: jest.fn(() => new Promise(resolve => resolve({}))),
  METHODS: require.requireActual('api/apiManager').METHODS,
}));

jest.mock('api/apiManager', () => ({
  makeRequest: jest.fn(() => new Promise(resolve => resolve({}))),
  METHODS: require.requireActual('api/apiManager').METHODS,
}));

beforeEach(jest.clearAllMocks);
describe('api/pageModels', () => {
  describe('getPageModels()', () => {
    it('returns a promise', () => {
      expect(getPageModels()).toBeInstanceOf(Promise);
    });

    it('has default paging', () => {
      getPageModels();
      expect(makeRequest).toHaveBeenCalledWith(
        expect.objectContaining({
          uri: '/api/pageModels',
          method: METHODS.GET,
          useAuthentication: true,
        }),
        {
          page: 1,
          pageSize: 10,
        },
      );
    });

    it('resolves with a paged page models list', () => {
      getPageModels({ page: 2, pageSize: 20 });
      expect(makeRequest).toHaveBeenCalledWith(
        expect.objectContaining({
          uri: '/api/pageModels',
          method: METHODS.GET,
          useAuthentication: true,
        }),
        {
          page: 2,
          pageSize: 20,
        },
      );
    });
  });

  describe('getPageModel()', () => {
    it('returns a promise', () => {
      expect(getPageModel()).toBeInstanceOf(Promise);
    });

    it('makes the correct request', () => {
      getPageModel(PAGE_MODEL_CODE);
      expect(makeRequest).toHaveBeenCalledWith(expect.objectContaining({
        uri: `/api/pageModels/${PAGE_MODEL_CODE}`,
        method: METHODS.GET,
        useAuthentication: true,
      }));
    });
  });
});
