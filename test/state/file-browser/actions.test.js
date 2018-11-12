import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { isFSA } from 'flux-standard-action';
import { initialize } from 'redux-form';
import { ADD_TOAST, ADD_ERRORS } from '@entando/messages';
import { gotoRoute } from '@entando/router';
import { ROUTE_FILE_BROWSER } from 'app-init/router';
import { mockApi } from 'test/testUtils';
import { FILE_BROWSER } from 'test/mocks/fileBrowser';

import { getFileBrowser, postCreateFolder, getFile, deleteFolder, deleteFile } from 'api/fileBrowser';
import {
  setFileList, setPathInfo, fetchFileList, saveFile,
  sendPostCreateFolder, sendDeleteFolder, sendDeleteFile, fetchFile,
} from 'state/file-browser/actions';
import { getPathInfo } from 'state/file-browser/selectors';
import { SET_FILE_LIST, SET_PATH_INFO } from 'state/file-browser/types';
import { TOGGLE_LOADING } from 'state/loading/types';


const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

jest.mock('state/file-browser/selectors', () => ({
  getPathInfo: jest.fn(),
}));

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

  describe('setPathInfo', () => {
    const meta = {
      protectedFolder: false,
      prevPath: 'folder',
      currentPath: 'folder/subfolder1',
    };

    beforeEach(() => {
      action = setPathInfo(meta);
    });

    it('is FSA compliant', () => {
      expect(isFSA(action)).toBe(true);
    });

    it('is of type SET_PATH_INFO', () => {
      expect(action).toHaveProperty('type', SET_PATH_INFO);
    });

    it('defines payload property', () => {
      expect(action).toHaveProperty('payload');
      expect(action).toHaveProperty('payload.pathInfo', meta);
    });
  });


  describe('thunks', () => {
    let store;
    beforeEach(() => {
      jest.clearAllMocks();
      store = mockStore({});
    });

    describe('fetchFile', () => {
      it('fetchFile dispatch initialize', (done) => {
        getPathInfo.mockImplementationOnce(mockApi({ protectedFolder: true, currentPath: '' }));
        store.dispatch(fetchFile('file.txt', ['.txt'])).then(() => {
          expect(getFile).toHaveBeenCalled();
          const actions = store.getActions();
          expect(actions).toHaveLength(3);
          expect(actions[0]).toHaveProperty('type', TOGGLE_LOADING);
          expect(initialize).toHaveBeenCalledWith('CreateTextFileForm', { content: window.atob('base64') });
          expect(actions[2]).toHaveProperty('type', TOGGLE_LOADING);
          done();
        }).catch(done.fail);
      });

      it('fetchFile give toast error is extension is not permitted', (done) => {
        getPathInfo.mockImplementationOnce(mockApi({ protectedFolder: true, currentPath: '' }));
        store.dispatch(fetchFile('pippo.MD', ['.txt'])).catch(() => {
          expect(getFile).not.toHaveBeenCalled();
          const actions = store.getActions();
          expect(actions).toHaveLength(1);
          expect(actions[0]).toHaveProperty('type', ADD_TOAST);
          done();
        }).catch(done.fail);
      });

      it('if the response is not ok, dispatch add errors', (done) => {
        getFile.mockImplementationOnce(mockApi({ errors: true }));
        getPathInfo.mockImplementationOnce(mockApi({ protectedFolder: false, currentPath: '' }));
        store.dispatch(fetchFile('file.txt')).then(() => {
          expect(getFile).toHaveBeenCalled();
          const actions = store.getActions();
          expect(actions).toHaveLength(3);
          expect(actions[0]).toHaveProperty('type', TOGGLE_LOADING);
          expect(actions[1]).toHaveProperty('type', ADD_ERRORS);
          expect(actions[2]).toHaveProperty('type', TOGGLE_LOADING);
          done();
        }).catch(done.fail);
      });
    });

    describe('fetchFileList', () => {
      it('fetchFileList calls setFileList without parameters', (done) => {
        store.dispatch(fetchFileList()).then(() => {
          const actions = store.getActions();
          expect(getFileBrowser).toHaveBeenCalledWith('?');
          expect(actions).toHaveLength(4);
          expect(actions[0]).toHaveProperty('type', TOGGLE_LOADING);
          expect(actions[1]).toHaveProperty('type', SET_FILE_LIST);
          expect(actions[2]).toHaveProperty('type', SET_PATH_INFO);
          expect(actions[3]).toHaveProperty('type', TOGGLE_LOADING);
          done();
        }).catch(done.fail);
      });

      it('fetchFileList calls setFileList with protectedFolder true', (done) => {
        store.dispatch(fetchFileList(true)).then(() => {
          const actions = store.getActions();
          expect(getFileBrowser).toHaveBeenCalledWith('?protectedFolder=true');
          expect(actions).toHaveLength(4);
          expect(actions[0]).toHaveProperty('type', TOGGLE_LOADING);
          expect(actions[1]).toHaveProperty('type', SET_FILE_LIST);
          expect(actions[2]).toHaveProperty('type', SET_PATH_INFO);
          expect(actions[3]).toHaveProperty('type', TOGGLE_LOADING);
          done();
        }).catch(done.fail);
      });

      it('fetchFileList calls setFileList with protectedFolder true and path not empty', (done) => {
        store.dispatch(fetchFileList(true, 'path')).then(() => {
          const actions = store.getActions();
          expect(getFileBrowser).toHaveBeenCalledWith('?protectedFolder=true&currentPath=path');
          expect(actions).toHaveLength(4);
          expect(actions[0]).toHaveProperty('type', TOGGLE_LOADING);
          expect(actions[1]).toHaveProperty('type', SET_FILE_LIST);
          expect(actions[2]).toHaveProperty('type', SET_PATH_INFO);
          expect(actions[3]).toHaveProperty('type', TOGGLE_LOADING);
          done();
        }).catch(done.fail);
      });

      it('fetchFileList calls setFileList with path not empty', (done) => {
        store.dispatch(fetchFileList(null, 'path')).then(() => {
          const actions = store.getActions();
          expect(getFileBrowser).toHaveBeenCalledWith('?currentPath=path');
          expect(actions).toHaveLength(4);
          expect(actions[0]).toHaveProperty('type', TOGGLE_LOADING);
          expect(actions[1]).toHaveProperty('type', SET_FILE_LIST);
          expect(actions[2]).toHaveProperty('type', SET_PATH_INFO);
          expect(actions[3]).toHaveProperty('type', TOGGLE_LOADING);
          done();
        }).catch(done.fail);
      });
    });

    describe('sendPostCreateFolder', () => {
      it('sendPostCreateFolder calls postCreateFolder and gotoRoute', (done) => {
        getPathInfo.mockImplementationOnce(mockApi({ protectedFolder: false, currentPath: '' }));
        store.dispatch(sendPostCreateFolder(false, 'path')).then(() => {
          expect(postCreateFolder).toHaveBeenCalled();
          expect(gotoRoute).toHaveBeenCalledWith(ROUTE_FILE_BROWSER);
          done();
        }).catch(done.fail);
      });
    });

    describe('sendDeleteFolder', () => {
      beforeEach(() => {
        jest.clearAllMocks();
      });

      it('sendDeleteFolder calls deleteFolder, gotoRoute and addToast', (done) => {
        getPathInfo.mockImplementationOnce(mockApi({ protectedFolder: false, currentPath: '' }));
        store.dispatch(sendDeleteFolder({ protectedFolder: false, path: 'path' })).then(() => {
          expect(deleteFolder).toHaveBeenCalledWith('?protectedFolder=false&currentPath=path');
          expect(gotoRoute).toHaveBeenCalled();
          const actions = store.getActions();
          expect(actions).toHaveLength(2);
          expect(actions[0]).toHaveProperty('type', TOGGLE_LOADING);
          expect(actions[1]).toHaveProperty('type', ADD_TOAST);
          expect(actions[1].payload).toHaveProperty('message', 'fileBrowser.deleteFolderSuccess');
          expect(actions[1].payload).toHaveProperty('type', 'success');
          done();
        }).catch(done.fail);
      });

      it('when deleteFolder get error, should dispatch addErrors and addToast', async () => {
        getPathInfo.mockImplementationOnce(mockApi({ protectedFolder: false, currentPath: '' }));
        deleteFolder.mockImplementationOnce(mockApi({ errors: true }));
        store.dispatch(sendDeleteFolder({ protectedFolder: false, path: 'path' })).catch((e) => {
          expect(deleteFolder).toHaveBeenCalled();
          const actions = store.getActions();
          expect(actions).toHaveLength(2);
          expect(actions[0]).toHaveProperty('type', ADD_ERRORS);
          expect(actions[1]).toHaveProperty('type', ADD_TOAST);
          expect(actions[1].payload).toHaveProperty('message', 'fileBrowser.deleteFolderError');
          expect(actions[1].payload).toHaveProperty('type', 'error');
          expect(e).toHaveProperty('errors');
        });
      });
    });

    describe('sendDeleteFile', () => {
      beforeEach(() => {
        jest.clearAllMocks();
      });

      it('sendDeleteFile calls deleteFile, gotoRoute and addToast', (done) => {
        getPathInfo.mockImplementationOnce(mockApi({ protectedFolder: false, currentPath: '' }));
        store.dispatch(sendDeleteFile({ protectedFolder: false, path: 'path' })).then(() => {
          expect(deleteFile).toHaveBeenCalledWith('?protectedFolder=false&currentPath=path');
          expect(gotoRoute).toHaveBeenCalled();
          const actions = store.getActions();
          expect(actions).toHaveLength(2);
          expect(actions[0]).toHaveProperty('type', TOGGLE_LOADING);
          expect(actions[1]).toHaveProperty('type', ADD_TOAST);
          expect(actions[1].payload).toHaveProperty('message', 'fileBrowser.deleteFileSuccess');
          expect(actions[1].payload).toHaveProperty('type', 'success');
          done();
        }).catch(done.fail);
      });

      it('when deleteFile get error, should dispatch addErrors and addToast', async () => {
        getPathInfo.mockImplementationOnce(mockApi({ protectedFolder: false, currentPath: '' }));
        deleteFile.mockImplementationOnce(mockApi({ errors: true }));
        store.dispatch(sendDeleteFile({ protectedFolder: false, path: 'path' })).catch((e) => {
          expect(deleteFile).toHaveBeenCalled();
          const actions = store.getActions();
          expect(actions).toHaveLength(2);
          expect(actions[0]).toHaveProperty('type', ADD_ERRORS);
          expect(actions[1]).toHaveProperty('type', ADD_TOAST);
          expect(actions[1].payload).toHaveProperty('message', 'fileBrowser.deleteFileError');
          expect(actions[1].payload).toHaveProperty('type', 'error');
          expect(e).toHaveProperty('errors');
        });
      });
    });

    describe('saveFile', () => {
      const file = new File([''], 'filename.txt');
      it('saveFile calls getFile', (done) => {
        getPathInfo.mockImplementationOnce(mockApi({ protectedFolder: false, currentPath: '' }));
        store.dispatch(saveFile(file)).then(() => {
          expect(getFile).toHaveBeenCalled();
          done();
        }).catch(done.fail);
      });

      it('if the response is not ok, dispatch add errors', (done) => {
        getFile.mockImplementationOnce(mockApi({ errors: true }));
        getPathInfo.mockImplementationOnce(mockApi({ protectedFolder: false, currentPath: '' }));
        store.dispatch(saveFile(file)).then(() => {
          expect(getFile).toHaveBeenCalled();
          const actions = store.getActions();
          expect(actions).toHaveLength(1);
          expect(actions[0]).toHaveProperty('type', ADD_ERRORS);
          done();
        }).catch(done.fail);
      });
    });
  });
});
