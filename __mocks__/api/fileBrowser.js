import { mockApi } from 'test/testUtils';
import { FILE_BROWSER, FILE_BROWSER_CREATE_FOLDER } from 'test/mocks/fileBrowser';

export const getFileBrowser = jest.fn(mockApi({ payload: FILE_BROWSER }));
export const postFileBrowserCreateFolder =
  jest.fn(mockApi({ payload: FILE_BROWSER_CREATE_FOLDER }));
