import { makeRequest, METHODS } from '@entando/apimanager';
import { FILE_BROWSER, FILE_BROWSER_CREATE_FOLDER } from 'test/mocks/fileBrowser';

export const getFileBrowser = (queryString = '') => (
  makeRequest({
    uri: `/api/fileBrowser${queryString}`,
    method: METHODS.GET,
    mockResponse: FILE_BROWSER,
    useAuthentication: true,
  })
);

export const postFileBrowserCreateFolder = (protectedFolder, path) => (
  makeRequest({
    uri: '/api/fileBrowser/directory',
    body: { protectedFolder, path },
    method: METHODS.POST,
    mockResponse: FILE_BROWSER_CREATE_FOLDER,
    useAuthentication: true,
  })
);
