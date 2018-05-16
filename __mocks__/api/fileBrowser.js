import { mockApi } from 'test/testUtils';
import { FILE_BROWSER, FILE_BROWSER_FILE } from 'test/mocks/fileBrowser';

export const getFileBrowser = jest.fn(mockApi({ payload: FILE_BROWSER }));
export const getFile = jest.fn(mockApi({ payload: FILE_BROWSER_FILE }));
export const postFile = jest.fn(mockApi({ payload: FILE_BROWSER_FILE }));
export const putFile = jest.fn(mockApi({ payload: FILE_BROWSER_FILE }));
