import 'test/enzyme-init';
import { makeRequest, METHODS } from 'api/apiManager';
import { getPageModels, getPageModel, postPageModel, putPageModel, getPageReferences } from 'api/pageModels';


const PAGE_MODEL_CODE = 'some_code';
const PAGE_MODEL = {
  code: PAGE_MODEL_CODE,
};


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

  describe('postPageModel()', () => {
    it('returns a promise', () => {
      expect(postPageModel(PAGE_MODEL)).toBeInstanceOf(Promise);
    });

    it('makes the correct request', () => {
      postPageModel(PAGE_MODEL);
      expect(makeRequest).toHaveBeenCalledWith(expect.objectContaining({
        uri: '/api/pageModels',
        method: METHODS.POST,
        useAuthentication: true,
        body: PAGE_MODEL,
      }));
    });
  });

  describe('putPageModel()', () => {
    it('returns a promise', () => {
      expect(putPageModel(PAGE_MODEL)).toBeInstanceOf(Promise);
    });

    it('makes the correct request', () => {
      putPageModel(PAGE_MODEL);
      expect(makeRequest).toHaveBeenCalledWith(expect.objectContaining({
        uri: `/api/pageModels/${PAGE_MODEL_CODE}`,
        method: METHODS.PUT,
        useAuthentication: true,
        body: PAGE_MODEL,
      }));
    });
  });

  describe('getPageReferences()', () => {
    it('returns a promise', () => {
      expect(getPageReferences(PAGE_MODEL)).toBeInstanceOf(Promise);
    });

    it('makes the correct request', () => {
      getPageReferences(PAGE_MODEL_CODE);
      expect(makeRequest).toHaveBeenCalledWith(
        expect.objectContaining({
          uri: `/api/pageModels/${PAGE_MODEL_CODE}/references/PageManager`,
          method: METHODS.GET,
          useAuthentication: true,
        }),
        {
          page: 1,
          pageSize: 10,
        },
      );
    });
  });
});
