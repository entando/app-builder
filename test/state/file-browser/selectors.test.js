import {
  getFileBrowser,
  getFileList,
} from 'state/file-browser/selectors';
import { FILE_BROWSER } from 'test/mocks/fileBrowser';

const STATE = {
  fileBrowser: {
    list: FILE_BROWSER,
  },
};

describe('state/file-browser/selectors', () => {
  it('getFileBrowser returns the full state', () => {
    expect(getFileBrowser(STATE)).toEqual(STATE.fileBrowser);
  });

  it('getFileList returns the file list', () => {
    expect(getFileList(STATE)).toEqual(FILE_BROWSER);
  });
});
