import { formattedText } from '@entando/utils';
import { gotoRoute } from '@entando/router';
import { addToast, addErrors, TOAST_SUCCESS, TOAST_ERROR } from '@entando/messages';
import { initialize } from 'redux-form';

import { getFileBrowser, getFile, postFile, putFile, postCreateFolder, deleteFolder, deleteFile } from 'api/fileBrowser';
import { toggleLoading } from 'state/loading/actions';
import { getPathInfo } from 'state/file-browser/selectors';
import { SET_FILE_LIST, SET_PATH_INFO } from 'state/file-browser/types';
import { ROUTE_FILE_BROWSER } from 'app-init/router';

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
    if (extensions.includes(`.${file[1]}`)) {
      dispatch(toggleLoading('file'));
      const { protectedFolder, currentPath } = getPathInfo(state);
      const queryString = `?protectedFolder=${protectedFolder === null ? false : protectedFolder}&currentPath=${currentPath}/${filename}`;
      getFile(queryString).then((response) => {
        response.json().then((json) => {
          if (response.ok) {
            dispatch(initialize('CreateTextFileForm', { content: window.atob(json.payload.base64) }));
          } else {
            dispatch(addErrors(json.errors.map(e => e.message)));
          }
          dispatch(toggleLoading('file'));
          resolve();
        });
      });
    } else {
      const message = formattedText('fragment.alert.error.fileExtension');
      dispatch(addToast(message), TOAST_ERROR);
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
          gotoRoute(ROUTE_FILE_BROWSER);
          dispatch(setFileList(json.payload));
          dispatch(setPathInfo(json.metaData));
        } else {
          dispatch(addErrors(json.errors.map(e => e.message)));
        }
        dispatch(toggleLoading('files'));
        resolve();
      });
    }).catch(() => {});
  });

const sendPostFile = fileObject => new Promise((resolve, reject) => {
  postFile(fileObject).then(response => (response.ok ? resolve() : reject())).catch((error) => {
    reject(error);
  });
});

const sendPutFile = fileObject => new Promise((resolve, reject) => {
  putFile(fileObject).then(response => (response.ok ? resolve() : reject())).catch((error) => {
    reject(error);
  });
});

const createFileObject = (protectedFolder, currentPath, file) => getBase64(file).then(base64 => ({
  protectedFolder,
  path: `${currentPath}/${file.name}`,
  filename: file.name,
  base64,
}));

const bodyApi = apiFunc => (...args) => (dispatch) => {
  createFileObject(...args).then((obj) => {
    dispatch(toggleLoading('uploadFile'));
    apiFunc(obj).then(() => {
      dispatch(addToast(formattedText('fileBrowser.uploadFileComplete'), TOAST_SUCCESS));
      gotoRoute(ROUTE_FILE_BROWSER);
      dispatch(fetchFileList(...args));
      dispatch(toggleLoading('uploadFile'));
    }).catch((error) => {
      dispatch(toggleLoading('uploadFile'));
      const message = formattedText('fileBrowser.uploadFileError');
      dispatch(addToast(`${message} - ${error}`), TOAST_ERROR);
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
      gotoRoute(ROUTE_FILE_BROWSER);
      dispatch(fetchFileList(pathInfo.protectedFolder, pathInfo.currentPath));
      dispatch(addToast(formattedText('fileBrowser.createFolderSuccess', null, { path: values.path }), TOAST_SUCCESS));
      resolve();
    }).catch(() => {
      dispatch(addToast(formattedText('fileBrowser.createFolderError', null, { path: values.path }), TOAST_ERROR));
    });
  })
);

export const sendDeleteFolder = values => (dispatch, getState) => (
  new Promise((resolve) => {
    const deleteFolderApi = wrapApiCall(deleteFolder);
    const pathInfo = getPathInfo(getState());
    const queryString = `?protectedFolder=${values.protectedFolder}&currentPath=${values.path}`;
    deleteFolderApi(queryString)(dispatch).then(() => {
      gotoRoute(ROUTE_FILE_BROWSER);
      dispatch(fetchFileList(pathInfo.protectedFolder, pathInfo.currentPath));
      dispatch(addToast(
        formattedText('fileBrowser.deleteFolderSuccess', null, { path: values.path }),
        TOAST_SUCCESS,
      ));
      resolve();
    }).catch(() => {
      dispatch(addToast(
        formattedText(
          'fileBrowser.deleteFolderError',
          null,
          { path: values.path },
        ),
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
      gotoRoute(ROUTE_FILE_BROWSER);
      dispatch(fetchFileList(pathInfo.protectedFolder, pathInfo.currentPath));
      dispatch(addToast(
        formattedText('fileBrowser.deleteFileSuccess', null, { path: values.path }),
        TOAST_SUCCESS,
      ));
      resolve();
    }).catch(() => {
      dispatch(addToast(
        formattedText(
          'fileBrowser.deleteFileError',
          null,
          { path: values.path },
        ),
        TOAST_ERROR,
      ));
    });
  })
);
