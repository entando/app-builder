import { postAvatar } from 'api/avatar';
import { getBase64 } from 'state/file-browser/actions';
import { toggleLoading } from 'state/loading/actions';
import { addToast, addErrors, TOAST_SUCCESS, TOAST_ERROR } from '@entando/messages';

export const createFileObject = async (avatar) => {
  const base64 = await getBase64(avatar);
  return { fileName: avatar.name, base64 };
};

export const uploadAvatar =
  (avatar, loader = 'uploadAvatar') =>
    async (dispatch) => {
      try {
        dispatch(toggleLoading(loader));
        const requestObject = await createFileObject(avatar);
        await postAvatar(requestObject);
        dispatch(toggleLoading(loader));
        dispatch(addToast({ id: 'fileBrowser.uploadFileComplete' }, TOAST_SUCCESS));
      } catch (error) {
        dispatch(toggleLoading(loader));
        const message = { id: 'fileBrowser.uploadFileError', values: { errmsg: error } };
        dispatch(addErrors(error));
        dispatch(addToast(message, TOAST_ERROR));
      }
    };

