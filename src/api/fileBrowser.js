import { makeRequest, METHODS } from '@entando/apimanager';
import { FILE_BROWSER, FILE_BROWSER_FILE, FILE_BROWSER_FOLDER } from 'test/mocks/fileBrowser';

export const getFileBrowser = (queryString = '') => (
  makeRequest({
    uri: `/api/fileBrowser${queryString}`,
    method: METHODS.GET,
    mockResponse: FILE_BROWSER,
    useAuthentication: true,
  })
);

export const getFile = (params = '') => (
  makeRequest({
    uri: `/api/fileBrowser/file${params}`,
    method: METHODS.GET,
    mockResponse: FILE_BROWSER_FILE,
    useAuthentication: true,
  })
);

export const postFile = file => (
  makeRequest({
    uri: '/api/fileBrowser/file',
    method: METHODS.POST,
    body: file,
    mockResponse: FILE_BROWSER_FILE,
    useAuthentication: true,
  })
);

export const putFile = file => (
  makeRequest({
    uri: '/api/fileBrowser/file',
    method: METHODS.PUT,
    body: file,
    mockResponse: FILE_BROWSER_FILE,
    useAuthentication: true,
  })
);

export const postCreateFolder = (protectedFolder, path) => (
  makeRequest({
    uri: '/api/fileBrowser/directory',
    body: { protectedFolder, path },
    method: METHODS.POST,
    mockResponse: FILE_BROWSER_FOLDER,
    useAuthentication: true,
  })
);

export const deleteFolder = params => makeRequest({
  uri: `/api/fileBrowser/directory${params}`,
  body: {},
  method: METHODS.DELETE,
  mockResponse: FILE_BROWSER_FOLDER,
  useAuthentication: true,
});

export const deleteFile = params => makeRequest({
  uri: `/api/fileBrowser/file${params}`,
  body: {},
  method: METHODS.DELETE,
  mockResponse: FILE_BROWSER_FILE,
  useAuthentication: true,
});
