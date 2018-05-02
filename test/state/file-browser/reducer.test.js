import reducer from 'state/file-browser/reducer';
import { setFileList } from 'state/file-browser/actions';
import { FILE_BROWSER } from 'test/mocks/fileBrowser';


describe('state/file-browser/reducer', () => {
  const INITIAL_STATE = reducer();

  it('should return an object', () => {
    expect(INITIAL_STATE).toBeInstanceOf(Object);
    expect(INITIAL_STATE).toHaveProperty('list', []);
  });

  describe('after SET_FILE_LIST', () => {
    it('new apis value is returned ', () => {
      const newState = reducer(INITIAL_STATE, setFileList(FILE_BROWSER));
      expect(newState).toHaveProperty('list', FILE_BROWSER);
    });
  });
});
