import { getFileBrowser, postFileBrowserCreateFolder } from 'api/fileBrowser';
import { makeRequest, METHODS } from '@entando/apimanager';
import { FILE_BROWSER, FILE_BROWSER_CREATE_FOLDER } from 'test/mocks/fileBrowser';

jest.unmock('api/fileBrowser');
jest.mock('@entando/apimanager', () => ({
  makeRequest: jest.fn(() => new Promise(resolve => resolve({}))),
  METHODS: require.requireActual('@entando/apimanager').METHODS,
}));

describe('api/fileBrowser', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getFileBrowser', () => {
    it('returns a promise', () => {
      expect(getFileBrowser()).toBeInstanceOf(Promise);
    });

    it('makes the correct request', () => {
      getFileBrowser();
      expect(makeRequest).toHaveBeenCalledWith({
        uri: '/api/fileBrowser',
        method: METHODS.GET,
        mockResponse: FILE_BROWSER,
        useAuthentication: true,
      });
    });

    it('makes the correct request with query string', () => {
      getFileBrowser('?queryString=test');
      expect(makeRequest).toHaveBeenCalledWith({
        uri: '/api/fileBrowser?queryString=test',
        method: METHODS.GET,
        mockResponse: FILE_BROWSER,
        useAuthentication: true,
      });
    });
  });

  describe('postFileBrowserCreateFolder', () => {
    it('returns a promise', () => {
      expect(postFileBrowserCreateFolder(false, 'folder/subfolder')).toBeInstanceOf(Promise);
    });

    it('makes the correct request', () => {
      const protectedFolder = false;
      const path = 'folder/subfolder';
      postFileBrowserCreateFolder(protectedFolder, path);
      expect(makeRequest).toHaveBeenCalledWith({
        uri: '/api/fileBrowser/directory',
        body: { protectedFolder, path },
        method: METHODS.POST,
        mockResponse: FILE_BROWSER_CREATE_FOLDER,
        useAuthentication: true,
      });
    });
  });
});
