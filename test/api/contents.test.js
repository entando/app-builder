import { configEnzymeAdapter } from 'test/legacyTestUtils';

import {
  getContents, deleteContent, publishContent,
  updateContents, publishMultipleContents, getContentsStatus,
} from 'api/contents';
import { makeRequest } from '@entando/apimanager';
import {
  MOCK_CONTENTS_STATUS, RESPONSE_CONTENTS_OK, RESPONSE_DELETE_OK, RESPONSE_PUBLISH_OK,
} from 'test/mocks/contents';

configEnzymeAdapter();

jest.unmock('api/contents');
jest.mock('@entando/apimanager', () => ({
  makeRequest: jest.fn(() => new Promise(resolve => resolve({}))),
  METHODS: { GET: 'GET', PUT: 'PUT', DELETE: 'DELETE' },
}));

describe('api/contents', () => {
  describe('get contents', () => {
    it('returns a promise', () => {
      const response = getContents({ page: 1, pageSize: 10 });
      expect(makeRequest).toHaveBeenCalledWith({
        uri: '/api/plugins/cms/contents?mode=list', // now the default is list ENG-2381
        method: 'GET',
        mockResponse: RESPONSE_CONTENTS_OK,
        contentType: 'application/json',
        useAuthentication: true,
      }, { page: 1, pageSize: 10 });
      expect(response).toBeInstanceOf(Promise);
    });
  });

  describe('delete content', () => {
    it('returns a promise', () => {
      const response = deleteContent('NEW1');
      expect(makeRequest).toHaveBeenCalledWith({
        uri: '/api/plugins/cms/contents/NEW1',
        method: 'DELETE',
        mockResponse: RESPONSE_DELETE_OK,
        contentType: 'application/json',
        useAuthentication: true,
      });
      expect(response).toBeInstanceOf(Promise);
    });
  });

  describe('publish/unpublish content', () => {
    it('returns a promise', () => {
      const response = publishContent('NEW1', 'published');
      expect(makeRequest).toHaveBeenCalledWith({
        uri: '/api/plugins/cms/contents/NEW1/status',
        method: 'PUT',
        mockResponse: RESPONSE_PUBLISH_OK,
        contentType: 'application/json',
        useAuthentication: true,
        body: { status: 'published' },
      });
      expect(response).toBeInstanceOf(Promise);
    });
  });

  describe('publish/unpublish multiple content', () => {
    it('returns a promise', () => {
      const response = publishMultipleContents(['id1', 'id2'], 'published');
      expect(makeRequest).toHaveBeenCalledWith({
        uri: '/api/plugins/cms/contents/status',
        method: 'PUT',
        mockResponse: RESPONSE_PUBLISH_OK,
        contentType: 'application/json',
        useAuthentication: true,
        body: { status: 'published', codes: ['id1', 'id2'] },
      });
      expect(response).toBeInstanceOf(Promise);
    });
  });

  describe('update contents', () => {
    it('returns a promise', () => {
      const response = updateContents([{ a: 1 }, { b: 2 }]);
      expect(makeRequest).toHaveBeenCalledWith({
        uri: '/api/plugins/cms/contents',
        method: 'PUT',
        mockResponse: RESPONSE_PUBLISH_OK,
        contentType: 'application/json',
        useAuthentication: true,
        body: [{ a: 1 }, { b: 2 }],
      });
      expect(response).toBeInstanceOf(Promise);
    });
  });

  describe('getContentsStatus', () => {
    it('should make the correct request and return a promise', () => {
      const response = getContentsStatus();
      expect(makeRequest).toHaveBeenCalledWith({
        uri: '/api/plugins/cms/contents/status',
        method: 'GET',
        contentType: 'application/json',
        mockResponse: MOCK_CONTENTS_STATUS,
        useAuthentication: true,
      });
      expect(response).toBeInstanceOf(Promise);
    });
  });
});
