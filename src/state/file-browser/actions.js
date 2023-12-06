import { addToast, addErrors, TOAST_SUCCESS, TOAST_ERROR } from '@entando/messages';

import { getFileBrowser, getFile, postFile, putFile, postCreateFolder, deleteFolder, deleteFile } from 'api/fileBrowser';
import { toggleLoading } from 'state/loading/actions';
import { getPathInfo } from 'state/file-browser/selectors';
import { SET_FILE_LIST, SET_PATH_INFO } from 'state/file-browser/types';
import { history, ROUTE_FILE_BROWSER } from 'app-init/router';

export const setFileList = fileList => ({
  type: SET_FILE_LIST,
  payload: {
    fileList,
  },
});

export const setPathInfo = pathInfo => ({
  type: SET_PATH_INFO,
  payload: {
    pathInfo,
  },
});

const wrapApiCall = apiFunc => (...args) => async (dispatch) => {
  const response = await apiFunc(...args);
  const json = await response.json();
  if (response.ok) {
    return json;
  }
  dispatch(addErrors(json.errors.map(e => e.message)));
  throw json;
};


// thunks

const getBase64 = file => (
  new Promise((resolve) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const base64 = reader.result.split(',');
      resolve(base64[1]);
    };
  }));

export const fetchFile = (filename, extensions = ['.txt']) => (dispatch, getState) =>
  new Promise((resolve, reject) => {
    const state = getState();
    const file = filename.split('.');
    if (extensions.includes(`.${file[file.length - 1]}`)) {
      dispatch(toggleLoading('file'));
      const { protectedFolder, currentPath } = getPathInfo(state);
      const queryString = `?protectedFolder=${protectedFolder === null ? false : protectedFolder}&currentPath=${currentPath}/${filename}`;
      getFile(queryString).then((response) => {
        response.json().then((json) => {
          if (!response.ok) {
            dispatch(addErrors(json.errors.map(e => e.message)));
            json.errors.forEach(err => dispatch(addToast(err.message, TOAST_ERROR)));
            history.push(ROUTE_FILE_BROWSER);
          }
          dispatch(toggleLoading('file'));
          resolve();
        });
      });
    } else {
      dispatch(addToast({ id: 'fragment.alert.error.fileExtension' }, TOAST_ERROR));
      reject();
    }
  });

export const fetchFileList = (protectedFolder = '', path = '') => dispatch =>
  new Promise((resolve) => {
    dispatch(toggleLoading('files'));
    const queryString = [];
    if ((protectedFolder !== '') && (protectedFolder !== null)) {
      queryString.push(`protectedFolder=${protectedFolder}`);
    }
    if (path) {
      queryString.push(`currentPath=${path}`);
    }

    getFileBrowser(`?${queryString.join('&')}`).then((response) => {
      response.json().then((json) => {
        if (response.ok) {
          history.push(ROUTE_FILE_BROWSER, { from: history.location.pathname });
          dispatch(setFileList(json.payload));
          dispatch(setPathInfo(json.metaData));
        } else {
          dispatch(addErrors(json.errors.map(e => e.message)));
          json.errors.forEach(err => dispatch(addToast(err.message, TOAST_ERROR)));
        }
        dispatch(toggleLoading('files'));
        resolve();
      });
    }).catch(() => {});
  });

export const sendPostFile = fileObject => new Promise((resolve, reject) => {
  postFile(fileObject).then(response => (response.ok ? resolve() : reject())).catch((error) => {
    reject(error);
  });
});

export const sendPutFile = fileObject => new Promise((resolve, reject) => {
  putFile(fileObject).then(response => (response.ok ? resolve() : reject())).catch((error) => {
    reject(error);
  });
});

export const createFileObject = (protectedFolder, currentPath, file) =>
  getBase64(file).then(base64 => ({
    protectedFolder,
    path: `${currentPath}/${file.name}`,
    filename: file.name,
    base64,
  }));

const bodyApi = apiFunc => (...args) => (dispatch) => {
  createFileObject(...args).then((obj) => {
    dispatch(toggleLoading('uploadFile'));
    apiFunc(obj).then(() => {
      dispatch(addToast({ id: 'fileBrowser.uploadFileComplete' }, TOAST_SUCCESS));
      history.push(ROUTE_FILE_BROWSER);
      dispatch(fetchFileList(...args));
      dispatch(toggleLoading('uploadFile'));
    }).catch((error) => {
      dispatch(toggleLoading('uploadFile'));
      const message = { id: 'fileBrowser.uploadFileError', values: { errmsg: error } };
      dispatch(message, TOAST_ERROR);
    });
  });
};

export const saveFile = file => (dispatch, getState) => new Promise((resolve) => {
  const { protectedFolder, currentPath } = getPathInfo(getState());
  const queryString = `?protectedFolder=${protectedFolder}&currentPath=${currentPath}/${file.name}`;
  getFile(queryString).then((response) => {
    response.json().then((json) => {
      if (response.status === 404) {
        dispatch(bodyApi(sendPostFile)(protectedFolder, currentPath, file));
      } else if (response.ok) {
        dispatch(bodyApi(sendPutFile)(protectedFolder, currentPath, file));
      } else {
        dispatch(addErrors(json.errors.map(e => e.message)));
        json.errors.forEach(err => dispatch(addToast(err.message, TOAST_ERROR)));
      }
      resolve();
    });
  }).catch(() => {});
});

export const downloadFile = file => (dispatch, getState) => new Promise((resolve) => {
  const { protectedFolder, currentPath } = getPathInfo(getState());
  const queryString = `?protectedFolder=${protectedFolder}&currentPath=${currentPath}/${file.name}`;
  getFile(queryString).then((response) => {
    response.json().then((json) => {
      if (response.ok) {
        resolve(json.payload.base64);
      } else {
        dispatch(addErrors(json.errors.map(e => e.message)));
        json.errors.forEach(err => dispatch(addToast(err.message, TOAST_ERROR)));
        resolve();
      }
    });
  }).catch(() => {});
});

export const sendPostCreateFolder = values => (dispatch, getState) => (
  new Promise((resolve) => {
    const postCreateFolderApi = wrapApiCall(postCreateFolder);
    const pathInfo = getPathInfo(getState());
    const newFolderPath = `${pathInfo.currentPath}/${values.path}`;
    postCreateFolderApi(pathInfo.protectedFolder, newFolderPath)(dispatch).then(() => {
      history.push(ROUTE_FILE_BROWSER);
      dispatch(fetchFileList(pathInfo.protectedFolder, pathInfo.currentPath));
      dispatch(addToast({ id: 'fileBrowser.createFolderSuccess', values: { path: values.path } }, TOAST_SUCCESS));
      resolve();
    }).catch(() => {
      dispatch(addToast({ id: 'fileBrowser.createFolderError', values: { path: values.path } }, TOAST_ERROR));
    });
  })
);

export const sendDeleteFolder = values => (dispatch, getState) => (
  new Promise((resolve) => {
    const deleteFolderApi = wrapApiCall(deleteFolder);
    const pathInfo = getPathInfo(getState());
    const queryString = `?protectedFolder=${values.protectedFolder}&currentPath=${values.path}`;
    deleteFolderApi(queryString)(dispatch).then(() => {
      history.push(ROUTE_FILE_BROWSER);
      dispatch(fetchFileList(pathInfo.protectedFolder, pathInfo.currentPath));
      dispatch(addToast(
        { id: 'fileBrowser.deleteFolderSuccess', values: { path: values.path } },
        TOAST_SUCCESS,
      ));
      resolve();
    }).catch(() => {
      dispatch(addToast(
        { id: 'fileBrowser.deleteFolderError', values: { path: values.path } },
        TOAST_ERROR,
      ));
    });
  })
);

export const sendDeleteFile = values => (dispatch, getState) => (
  new Promise((resolve) => {
    const deleteFileApi = wrapApiCall(deleteFile);
    const pathInfo = getPathInfo(getState());
    const queryString = `?protectedFolder=${values.protectedFolder}&currentPath=${values.path}`;
    deleteFileApi(queryString)(dispatch).then(() => {
      history.push(ROUTE_FILE_BROWSER);
      dispatch(fetchFileList(pathInfo.protectedFolder, pathInfo.currentPath));
      dispatch(addToast(
        { id: 'fileBrowser.deleteFileSuccess', values: { path: values.path } },
        TOAST_SUCCESS,
      ));
      resolve();
    }).catch(() => {
      dispatch(addToast(
        { id: 'fileBrowser.deleteFileError', values: { path: values.path } },
        TOAST_ERROR,
      ));
    });
  })
);

const generalBodyApi = (apiFunc, loader) => (...args) => dispatch =>
  new Promise((resolve, reject) => {
    createFileObject(...args).then((obj) => {
      dispatch(toggleLoading(loader));
      apiFunc(obj).then(() => {
        dispatch(addToast({ id: 'fileBrowser.uploadFileComplete' }, TOAST_SUCCESS));
        dispatch(toggleLoading(loader));
        resolve();
      }).catch((error) => {
        dispatch(toggleLoading(loader));
        const message = { id: 'fileBrowser.uploadFileError', values: { errmsg: error } };
        dispatch(message, TOAST_ERROR);
        reject();
      });
    });
  });

export const uploadFile = (file, currentPath, loader = 'uploadFile', protectedFolder = false) =>
  dispatch => new Promise((resolve) => {
    const queryString = `?protectedFolder=${protectedFolder}&currentPath=${currentPath}/${file.name}`;
    dispatch(toggleLoading(loader));
    getFile(queryString).then((response) => {
      response.json().then((json) => {
        if (response.status === 404) {
          dispatch(generalBodyApi(sendPostFile, loader)(protectedFolder, currentPath, file))
            .then(resolve);
        } else if (response.ok) {
          dispatch(generalBodyApi(sendPutFile, loader)(protectedFolder, currentPath, file))
            .then(resolve);
        } else {
          dispatch(toggleLoading(loader));
          dispatch(addErrors(json.errors.map(e => e.message)));
          json.errors.forEach(err => dispatch(addToast(err.message, TOAST_ERROR)));
          resolve();
        }
      });
    }).catch(() => {});
  });
