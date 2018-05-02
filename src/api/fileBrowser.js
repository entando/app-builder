import { makeRequest, METHODS } from '@entando/apimanager';
import { FILE_BROWSER } from 'test/mocks/fileBrowser';

// eslint-disable-next-line import/prefer-default-export
export const getFileBrowser = () => (
  makeRequest({
    uri: '/api/fileBrowser',
    method: METHODS.GET,
    mockResponse: FILE_BROWSER,
    useAuthentication: true,
  })
);
