import 'test/enzyme-init';
import {
  getCategoryTree,
  getCategory,
  postCategory,
  putCategory,
  deleteCategory,
  getReferences,
} from 'api/categories';
import { makeRequest, METHODS } from '@entando/apimanager';
import { MYCATEGORY1_PAYLOAD, BODY_OK, MOCK_REFERENCES } from 'test/mocks/categories';

const CATEGORY_CODE = MYCATEGORY1_PAYLOAD.code;
const REFERENCE_KEY = 'jacmsContentManager';
const EDITED_CATEGORY = {
  code: MYCATEGORY1_PAYLOAD.code,
  title: { it: 'nuova categoria' },
};

jest.unmock('api/categories');
jest.mock('@entando/apimanager', () => ({
  makeRequest: jest.fn(() => new Promise(resolve => resolve({}))),
  METHODS: require.requireActual('@entando/apimanager').METHODS,
}));

describe('api/categories', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getCategoryTree', () => {
    it('returns a promise', () => {
      expect(getCategoryTree()).toBeInstanceOf(Promise);
    });

    it('if successful, returns a mock ok response', () => {
      getCategoryTree();
      expect(makeRequest).toHaveBeenCalledWith(expect.objectContaining({
        uri: '/api/categories',
        method: METHODS.GET,
        useAuthentication: true,
      }));
    });

    it('makes the request with additional params', () => {
      getCategoryTree(CATEGORY_CODE);
      expect(makeRequest).toHaveBeenCalledWith(expect.objectContaining({
        uri: `/api/categories?parentCode=${CATEGORY_CODE}`,
        method: METHODS.GET,
        useAuthentication: true,
      }));
    });
  });

  describe('getCategory()', () => {
    it('returns a promise', () => {
      expect(getCategory(CATEGORY_CODE)).toBeInstanceOf(Promise);
    });

    it('if successful, returns a mock ok response', () => {
      getCategory(CATEGORY_CODE);
      expect(makeRequest).toHaveBeenCalledWith(expect.objectContaining({
        uri: `/api/categories/${CATEGORY_CODE}`,
        method: METHODS.GET,
        useAuthentication: true,
      }));
    });
  });

  describe('postCategory()', () => {
    it('if successful, returns a mock ok response', () => {
      expect(postCategory(BODY_OK)).toBeInstanceOf(Promise);
    });

    it('if successful, returns a mock ok response', () => {
      postCategory(BODY_OK);
      expect(makeRequest).toHaveBeenCalledWith(expect.objectContaining({
        uri: '/api/categories',
        method: METHODS.POST,
        useAuthentication: true,
      }));
    });
  });

  describe('putCategory()', () => {
    it('returns a promise', () => {
      expect(putCategory(EDITED_CATEGORY)).toBeInstanceOf(Promise);
    });

    it('if successful, returns a mock ok response', () => {
      putCategory(EDITED_CATEGORY);
      expect(makeRequest).toHaveBeenCalledWith(expect.objectContaining({
        uri: `/api/categories/${EDITED_CATEGORY.code}`,
        method: METHODS.PUT,
        body: EDITED_CATEGORY,
      }));
    });
  });

  describe('deleteCategory()', () => {
    it('returns a promise', () => {
      expect(deleteCategory(CATEGORY_CODE)).toBeInstanceOf(Promise);
    });

    it('if successful, returns a mock ok response', () => {
      deleteCategory(CATEGORY_CODE);
      expect(makeRequest).toHaveBeenCalledWith(expect.objectContaining({
        uri: `/api/categories/${CATEGORY_CODE}`,
        method: METHODS.DELETE,
        useAuthentication: true,
      }));
    });
  });

  describe('getReferences()', () => {
    it('returns a promise', () => {
      expect(getReferences(CATEGORY_CODE, REFERENCE_KEY)).toBeInstanceOf(Promise);
    });

    it('if successful, returns a mock ok response', () => {
      getReferences(CATEGORY_CODE, REFERENCE_KEY);
      expect(makeRequest).toHaveBeenCalledWith({
        uri: `/api/categories/${CATEGORY_CODE}/references/${REFERENCE_KEY}`,
        method: METHODS.GET,
        mockResponse: MOCK_REFERENCES[REFERENCE_KEY] || [],
        useAuthentication: true,
      }, { page: 1, pageSize: 10 });
    });
  });
});
