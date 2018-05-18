import { makeRequest, METHODS } from '@entando/apimanager';
import { FILE_BROWSER, FILE_BROWSER_FILE } from 'test/mocks/fileBrowser';

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
