import { mockApi } from 'test/testUtils';
import { FILE_BROWSER, FILE_BROWSER_FILE, FILE_BROWSER_CREATE_FOLDER } from 'test/mocks/fileBrowser';

export const getFileBrowser = jest.fn(mockApi({ payload: FILE_BROWSER }));
export const getFile = jest.fn(mockApi({ payload: FILE_BROWSER_FILE }));
export const postFile = jest.fn(mockApi({ payload: FILE_BROWSER_FILE }));
export const putFile = jest.fn(mockApi({ payload: FILE_BROWSER_FILE }));
export const postFileBrowserCreateFolder =
  jest.fn(mockApi({ payload: FILE_BROWSER_CREATE_FOLDER }));
