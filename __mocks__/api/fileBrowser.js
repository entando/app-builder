import { mockApi } from 'test/testUtils';
import { FILE_BROWSER } from 'test/mocks/fileBrowser';

// eslint-disable-next-line import/prefer-default-export
export const getFileBrowser = jest.fn(mockApi({ payload: FILE_BROWSER }));
