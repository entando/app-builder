import { configEnzymeAdapter } from 'test/legacyTestUtils';

import { getContents, getContentsStatus } from 'api/contents';
import { makeRequest } from '@entando/apimanager';
import { MOCK_CONTENTS_STATUS, RESPONSE_CONTENTS_OK } from 'test/mocks/contents';

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
