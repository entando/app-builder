import { postAvatar, getAvatar, deleteAvatar } from 'api/avatar';
import { getBase64 } from 'state/file-browser/actions';
import { toggleLoading } from 'state/loading/actions';
import { addToast, addErrors, TOAST_SUCCESS, TOAST_ERROR } from '@entando/messages';
import { SET_AVATAR_FILE_NAME, SET_USE_GRAVATAR } from './types';

export const setAvatarFilename = filename => ({
  type: SET_AVATAR_FILE_NAME,
  payload: {
    filename,
  },
});

export const setUseGravatar = useGravatar => ({
  type: SET_USE_GRAVATAR,
  payload: {
    useGravatar,
  },
});


export const createFileObject = async (avatar) => {
  const base64 = await getBase64(avatar);
  return { filename: avatar.name, base64 };
};

export const uploadAvatar =
  (avatar, loader = 'uploadAvatar') =>
    async (dispatch) => {
      try {
        dispatch(toggleLoading(loader));
        const requestObject = await createFileObject(avatar);
        const response = await postAvatar(requestObject);
        const { ok, status } = response;
        if (ok) {
          const { payload } = await response.json();
          const { filename } = payload;
          dispatch(setUseGravatar(false));
          dispatch(setAvatarFilename(`${filename}?${Date.now()}`));
          dispatch(addToast({ id: 'fileBrowser.uploadFileComplete' }, TOAST_SUCCESS));
        } else if (!ok && status === 413) {
          dispatch(addToast({ id: 'fileBrowser.errorTooLargeFile' }, TOAST_ERROR));
        }
        dispatch(toggleLoading(loader));
      } catch (error) {
        dispatch(toggleLoading(loader));
        const message = { id: 'fileBrowser.uploadFileError', values: { errmsg: error } };
        dispatch(addErrors(error));
        dispatch(addToast(message, TOAST_ERROR));
      }
    };

export const setGravatar = (loader = 'useGravatar') =>
  async (dispatch) => {
    try {
      dispatch(toggleLoading(loader));
      const response = await postAvatar({ useGravatar: true });
      const { payload } = await response.json();
      const { useGravatar } = payload;
      dispatch(setUseGravatar(useGravatar));
      dispatch(addToast({ id: 'fileBrowser.uploadFileComplete' }, TOAST_SUCCESS));
      dispatch(toggleLoading(loader));
    } catch (error) {
      dispatch(toggleLoading(loader));
      const message = { id: 'fileBrowser.uploadFileError', values: { errmsg: error } };
      dispatch(addErrors(error));
      dispatch(addToast(message, TOAST_ERROR));
    }
  };

export const fetchAvatar = (loader = 'fetchAvatar') => async (dispatch) => {
  try {
    dispatch(toggleLoading(loader));
    const response = await getAvatar();
    const { ok, status } = response;
    if (ok) {
      const { payload } = await response.json();
      const { filename, useGravatar } = payload;
      dispatch(setUseGravatar(useGravatar));
      if (filename) dispatch(setAvatarFilename(`${filename}?${Date.now()}`));
    } else if (!ok && status === 404) {
      dispatch(setUseGravatar(false));
      dispatch(setAvatarFilename(''));
    }
    dispatch(toggleLoading(loader));
  } catch (error) {
    dispatch(toggleLoading(loader));
    dispatch(addErrors(error));
    dispatch(addToast(error.message, TOAST_ERROR));
  }
};


export const removeAvatar =
  (loader = 'removeAvatar') =>
    async (dispatch) => {
      try {
        dispatch(toggleLoading(loader));
        await deleteAvatar();
        dispatch(setAvatarFilename(''));
        dispatch(setUseGravatar(false));
        dispatch(toggleLoading(loader));
        dispatch(addToast({ id: 'fileBrowser.removeFileComplete' }, TOAST_SUCCESS));
      } catch (error) {
        dispatch(toggleLoading(loader));
        const message = { id: 'fileBrowser.uploadFileError', values: { errmsg: error } };
        dispatch(addErrors(error));
        dispatch(addToast(message, TOAST_ERROR));
      }
    };
