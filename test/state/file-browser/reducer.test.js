import reducer from 'state/file-browser/reducer';
import { setFileList, setPathInfo } from 'state/file-browser/actions';
import { FILE_BROWSER } from 'test/mocks/fileBrowser';


describe('state/file-browser/reducer', () => {
  const INITIAL_STATE = reducer();

  const pathInfoMock = {
    protectedFolder: true,
    prevPath: '/prev',
    currentPath: '/current',
  };

  it('should return an object', () => {
    expect(INITIAL_STATE).toBeInstanceOf(Object);
    expect(INITIAL_STATE).toHaveProperty('list', []);
    expect(INITIAL_STATE).toHaveProperty('pathInfo' );
    expect(INITIAL_STATE).toHaveProperty('pathInfo.protectedFolder', null);
    expect(INITIAL_STATE).toHaveProperty('pathInfo.prevPath', '');
    expect(INITIAL_STATE).toHaveProperty('pathInfo.currentPath', '');
  });

  describe('after SET_FILE_LIST', () => {
    it('new file list value is returned ', () => {
      const newState = reducer(INITIAL_STATE, setFileList(FILE_BROWSER));
      expect(newState).toHaveProperty('list', FILE_BROWSER);
    });

    it('default file list value is returned ', () => {
      const newState = reducer(INITIAL_STATE, setFileList());
      expect(newState).toHaveProperty('list', []);
    });
  });

  describe('after SET_PATH_INFO', () => {
    it('new path info value is returned ', () => {
      const newState = reducer(INITIAL_STATE, setPathInfo(pathInfoMock));
      expect(newState).toHaveProperty('pathInfo.protectedFolder', pathInfoMock.protectedFolder);
      expect(newState).toHaveProperty('pathInfo.prevPath', pathInfoMock.prevPath);
      expect(newState).toHaveProperty('pathInfo.currentPath', pathInfoMock.currentPath);
    });
  });
});
