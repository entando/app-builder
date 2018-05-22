import { getFileBrowser, getFile, postFile, putFile, postFileBrowserCreateFolder } from 'api/fileBrowser';
import { makeRequest, METHODS } from '@entando/apimanager';
import { FILE_BROWSER, FILE_BROWSER_FILE, FILE_BROWSER_CREATE_FOLDER } from 'test/mocks/fileBrowser';

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

  describe('getFile', () => {
    it('returns a promise', () => {
      expect(getFile()).toBeInstanceOf(Promise);
    });

    it('makes the correct request', () => {
      getFile();
      expect(makeRequest).toHaveBeenCalledWith({
        uri: '/api/fileBrowser/file',
        method: METHODS.GET,
        mockResponse: FILE_BROWSER_FILE,
        useAuthentication: true,
      });
    });

    it('makes the correct request with query string', () => {
      getFile('?queryString=test');
      expect(makeRequest).toHaveBeenCalledWith({
        uri: '/api/fileBrowser/file?queryString=test',
        method: METHODS.GET,
        mockResponse: FILE_BROWSER_FILE,
        useAuthentication: true,
      });
    });
  });

  describe('postFile', () => {
    it('returns a promise', () => {
      expect(postFile()).toBeInstanceOf(Promise);
    });

    it('makes the correct request', () => {
      postFile();
      expect(makeRequest).toHaveBeenCalledWith({
        uri: '/api/fileBrowser/file',
        method: METHODS.POST,
        mockResponse: FILE_BROWSER_FILE,
        useAuthentication: true,
      });
    });
  });

  describe('putFile', () => {
    it('returns a promise', () => {
      expect(putFile()).toBeInstanceOf(Promise);
    });

    it('makes the correct request', () => {
      putFile();
      expect(makeRequest).toHaveBeenCalledWith({
        uri: '/api/fileBrowser/file',
        method: METHODS.PUT,
        mockResponse: FILE_BROWSER_FILE,
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
