import { getFileBrowser } from 'api/fileBrowser';
import { addErrors } from 'state/errors/actions';
import { SET_FILE_LIST } from 'state/file-browser/types';
import { toggleLoading } from 'state/loading/actions';

export const setFileList = fileList => ({
  type: SET_FILE_LIST,
  payload: {
    fileList,
  },
});

// thunks

export const fetchFileList = (path = '') => dispatch => new Promise((resolve) => {
  dispatch(toggleLoading('files'));
  getFileBrowser(path).then((response) => {
    response.json().then((json) => {
      if (response.ok) {
        dispatch(setFileList(json.payload));
      } else {
        dispatch(addErrors(json.errors.map(err => err.message)));
      }
      dispatch(toggleLoading('files'));
      resolve();
    });
  });
});
