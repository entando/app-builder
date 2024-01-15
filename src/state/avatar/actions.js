import { postAvatar, getAvatar, deleteAvatar } from 'api/avatar';
import { getBase64 } from 'state/file-browser/actions';
import { toggleLoading } from 'state/loading/actions';
import { addToast, addErrors, TOAST_SUCCESS, TOAST_ERROR } from '@entando/messages';
import { SET_AVATAR_FILE_NAME } from './types';

export const setAvatarFilename = filename => ({
  type: SET_AVATAR_FILE_NAME,
  payload: {
    filename,
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
        const avatarCreated = await response.json();
        dispatch(setAvatarFilename(`${avatarCreated.payload.filename}?${Date.now()}`));
        dispatch(toggleLoading(loader));
        dispatch(addToast({ id: 'fileBrowser.uploadFileComplete' }, TOAST_SUCCESS));
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
    const avatar = await response.json();
    if (avatar.payload.filename) dispatch(setAvatarFilename(`${avatar.payload.filename}?${Date.now()}`));
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
        dispatch(toggleLoading(loader));
        dispatch(addToast({ id: 'fileBrowser.uploadFileComplete' }, TOAST_SUCCESS));
      } catch (error) {
        dispatch(toggleLoading(loader));
        const message = { id: 'fileBrowser.uploadFileError', values: { errmsg: error } };
        dispatch(addErrors(error));
        dispatch(addToast(message, TOAST_ERROR));
      }
    };
