import { getFileBrowser, getFile, postFile, putFile, postCreateFolder, deleteFolder } from 'api/fileBrowser';
import { formattedText } from '@entando/utils';
import { gotoRoute } from '@entando/router';
import { addErrors } from 'state/errors/actions';
import { addToast } from 'state/toasts/actions';
import { TOAST_SUCCESS, TOAST_ERROR } from 'state/toasts/const';
import { toggleLoading } from 'state/loading/actions';
import { SET_FILE_LIST, SET_PATH_INFO } from 'state/file-browser/types';
import { getPathInfo } from 'state/file-browser/selectors';
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
  const contentType = response.headers.get('content-type');
  if (contentType && contentType.includes('application/json')) {
    const json = await response.json();
    if (response.ok) {
      return json;
    }
    dispatch(addErrors(json.errors.map(e => e.message)));
    throw json;
  }
  throw new TypeError('No JSON content-type in response headers');
};


// thunks
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
    const getFileBrowserApi = wrapApiCall(getFileBrowser);
    getFileBrowserApi((`?${queryString.join('&')}`))(dispatch).then((response) => {
      gotoRoute(ROUTE_FILE_BROWSER);
      dispatch(setFileList(response.payload));
      dispatch(setPathInfo(response.metaData));
      dispatch(toggleLoading('files'));
      resolve();
    }).catch(() => {});
  });


const getBase64 = file => (
  new Promise((resolve) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const base64 = reader.result.split(',');
      resolve(base64[1]);
    };
  }));

const sendPostFile = fileObject => new Promise((resolve, reject) => {
  postFile(fileObject).then(response => (response.ok ? resolve() : reject()));
});

const sendPutFile = fileObject => new Promise((resolve, reject) => {
  putFile(fileObject).then(response => (response.ok ? resolve('OK') : reject()));
});

const createFileObject = (protectedFolder, currentPath, file) => getBase64(file).then(base64 => ({
  protectedFolder,
  path: `${currentPath}/${file.name}`,
  filename: file.name,
  base64,
}));

const bodyApi = apiFunc => (...args) => (dispatch) => {
  createFileObject(...args).then((obj) => {
    apiFunc(obj).then(() => {
      gotoRoute(ROUTE_FILE_BROWSER);
      dispatch(fetchFileList(...args));
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
  });
});

export const sendPostCreateFolder = values => (dispatch, getState) => (
  new Promise((resolve) => {
    const postCreateFolderApi = wrapApiCall(postCreateFolder);
    const pathInfo = getPathInfo(getState());
    const newFolderPath = `${pathInfo.currentPath}/${values.path}`;
    postCreateFolderApi(pathInfo.protectedFolder, newFolderPath)(dispatch).then(() => {
      gotoRoute(ROUTE_FILE_BROWSER);
      dispatch(fetchFileList(pathInfo.protectedFolder, pathInfo.currentPath));
      dispatch(addToast(formattedText('fileBrowser.createFolderSuccess', TOAST_SUCCESS)));
      resolve();
    }).catch(() => {
      dispatch(addToast(formattedText('fileBrowser.createFolderError', TOAST_ERROR)));
    });
  })
);

export const sendDeleteFolder = values => (dispatch, getState) => (
  new Promise((resolve) => {
    const deleteFolderApi = wrapApiCall(deleteFolder);
    const pathInfo = getPathInfo(getState());
    const folderPath = `${pathInfo.currentPath}/${values.path}`;
    deleteFolderApi(pathInfo.protectedFolder, folderPath)(dispatch).then(() => {
      gotoRoute(ROUTE_FILE_BROWSER);
      dispatch(fetchFileList(pathInfo.protectedFolder, pathInfo.currentPath));
      dispatch(addToast(formattedText('fileBrowser.deleteFolderSuccess', TOAST_SUCCESS)));
      resolve();
    }).catch(() => {
      dispatch(addToast(formattedText('fileBrowser.deleteFolderError', TOAST_ERROR)));
    });
  })
);
