import { configEnzymeAdapter } from 'test/legacyTestUtils';

import {
  getContent, getCategories, postAddContent,
} from 'api/editContent';
import { makeRequest } from '@entando/apimanager';
import { GET_CATEGORIES_RESPONSE_OK } from 'test/mocks/contentType';
import { GET_CONTENT_RESPONSE_OK, POST_CONTENT_ADD_RESPONSE_OK } from 'test/mocks/editContent';

configEnzymeAdapter();

jest.unmock('api/editContent');
jest.mock('@entando/apimanager', () => ({
  makeRequest: jest.fn(() => new Promise(resolve => resolve({}))),
  METHODS: { GET: 'GET', POST: 'POST' },
}));

describe('api/editContent', () => {
  describe('categories', () => {
    it('returns a promise', () => {
      const response = getCategories();
      expect(makeRequest).toHaveBeenCalledWith({
        uri: '/api/categories',
        method: 'GET',
        mockResponse: GET_CATEGORIES_RESPONSE_OK,
        contentType: 'application/json',
        useAuthentication: true,
      });
      expect(response).toBeInstanceOf(Promise);
    });
  });
  describe('api/getContent', () => {
    it('returns a promise for getContent', () => {
      const response = getContent();
      expect(makeRequest).toHaveBeenCalledWith({
        uri: '/api/plugins/cms/contents',
        method: 'GET',
        mockResponse: GET_CONTENT_RESPONSE_OK,
        contentType: 'application/json',
        useAuthentication: true,
      });
      expect(response).toBeInstanceOf(Promise);
    });
  });
  describe('api/postAddContent', () => {
    it('postAddContent returns a promise with correct params', () => {
      const body = [{ a: 1, b: 2 }];
      const response = postAddContent({ a: 1, b: 2 });
      expect(makeRequest).toHaveBeenCalledWith({
        uri: '/api/plugins/cms/contents',
        body,
        method: 'POST',
        contentType: 'application/json',
        mockResponse: POST_CONTENT_ADD_RESPONSE_OK,
        useAuthentication: true,
      });
      expect(response).toBeInstanceOf(Promise);
    });
  });
});
