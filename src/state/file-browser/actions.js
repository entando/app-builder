import { getFileBrowser } from 'api/fileBrowser';
import { addErrors } from 'state/errors/actions';
import { SET_FILE_LIST, SET_PATH_INFO } from 'state/file-browser/types';
import { toggleLoading } from 'state/loading/actions';

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

// thunks

export const fetchFileList = (protectedFolder = '', path = '') => dispatch => new Promise((resolve) => {
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
        dispatch(setFileList(json.payload));
        dispatch(setPathInfo(json.metaData));
      } else {
        dispatch(addErrors(json.errors.map(err => err.message)));
      }
      dispatch(toggleLoading('files'));
      resolve();
    });
  });
});
