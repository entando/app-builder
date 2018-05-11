import { getFileBrowser, getFileList, getPathInfo } from 'state/file-browser/selectors';
import { FILE_LIST } from 'test/mocks/fileBrowser';

const STATE = {
  fileBrowser: {
    list: FILE_LIST,
    pathInfo: {
      protectedFolder: true,
      prevPath: '/prev',
      currentPath: '/current',
    },
  },
};

describe('state/file-browser/selectors', () => {
  it('getFileBrowser returns the full state', () => {
    expect(getFileBrowser(STATE)).toEqual(STATE.fileBrowser);
  });

  it('getFileList returns the file list', () => {
    expect(getFileList(STATE)).toEqual(FILE_LIST);
  });

  it('getPathInfo returns the path info metadata', () => {
    expect(getPathInfo(STATE)).toEqual(STATE.fileBrowser.pathInfo);
  });
});
