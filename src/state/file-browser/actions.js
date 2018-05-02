import { getFileBrowser } from 'api/fileBrowser';
import { addErrors } from 'state/errors/actions';
import { SET_FILE_LIST } from 'state/file-browser/types';

// eslint-disable-next-line import/prefer-default-export
export const setFileList = fileList => ({
  type: SET_FILE_LIST,
  payload: {
    fileList,
  },
});

// thunks

export const fetchFileList = () => dispatch => new Promise((resolve) => {
  getFileBrowser().then((response) => {
    response.json().then((json) => {
      if (response.ok) {
        dispatch(setFileList(json.payload));
      } else {
        dispatch(addErrors(json.errors.map(err => err.message)));
      }
      resolve();
    });
  });
});
