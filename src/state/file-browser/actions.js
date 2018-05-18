import { getFileBrowser, postFileBrowserCreateFolder } from 'api/fileBrowser';
import { addErrors } from 'state/errors/actions';
import { SET_FILE_LIST, SET_PATH_INFO } from 'state/file-browser/types';
import { toggleLoading } from 'state/loading/actions';
import { gotoRoute } from '@entando/router';
import { ROUTE_FILE_BROWSER } from 'app-init/router';
import { getPathInfo } from 'state/file-browser/selectors';

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

export const wrapApiCall = apiFunc => (...args) => async (dispatch) => {
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

export const sendPostCreateFolder = values => (dispatch, getState) => (
  new Promise((resolve) => {
    const postFileBrowserCreateFolderApi = wrapApiCall(postFileBrowserCreateFolder);
    const pathInfo = getPathInfo(getState());
    const newFolderPath = `${pathInfo.currentPath}/${values.path}`;
    postFileBrowserCreateFolderApi(pathInfo.protectedFolder, newFolderPath)(dispatch).then(() => {
      gotoRoute(ROUTE_FILE_BROWSER);
      dispatch(fetchFileList(pathInfo.protectedFolder, pathInfo.currentPath));
      resolve();
    }).catch(() => {});
  })
);
