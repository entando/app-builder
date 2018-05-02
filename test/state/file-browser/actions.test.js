import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { isFSA } from 'flux-standard-action';
import { setFileList, fetchFileList } from 'state/file-browser/actions';
import { mockApi } from 'test/testUtils';
import { getFileBrowser } from 'api/fileBrowser';
import { SET_FILE_LIST } from 'state/file-browser/types';
import { ADD_ERRORS } from 'state/errors/types';
import { FILE_BROWSER } from 'test/mocks/fileBrowser';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('state/file-browser/actions', () => {
  let action;

  describe('setFileList', () => {
    beforeEach(() => {
      action = setFileList(FILE_BROWSER);
    });

    it('is FSA compliant', () => {
      expect(isFSA(action)).toBe(true);
    });

    it('is of type SET_APIS', () => {
      expect(action).toHaveProperty('type', SET_FILE_LIST);
    });

    it('defines payload property', () => {
      expect(action).toHaveProperty('payload');
      expect(action).toHaveProperty('payload.fileList', FILE_BROWSER);
    });
  });

  describe('thunks', () => {
    let store;
    beforeEach(() => {
      jest.clearAllMocks();
      store = mockStore({});
    });

    describe('fetchFileList', () => {
      it('fetchFileList calls setFileList', (done) => {
        store.dispatch(fetchFileList()).then(() => {
          const actions = store.getActions();
          expect(getFileBrowser).toHaveBeenCalled();
          expect(actions).toHaveLength(1);
          expect(actions[0]).toHaveProperty('type', SET_FILE_LIST);
          done();
        }).catch(done.fail);
      });

      it('when fetchUsers get error, should dispatch addErrors', (done) => {
        getFileBrowser.mockImplementationOnce(mockApi({ errors: true }));
        store.dispatch(fetchFileList()).then(() => {
          expect(getFileBrowser).toHaveBeenCalled();
          const actions = store.getActions();
          expect(actions).toHaveLength(1);
          expect(actions[0]).toHaveProperty('type', ADD_ERRORS);
          done();
        }).catch(done.fail);
      });
    });
  });
});
