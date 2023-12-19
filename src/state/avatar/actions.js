import { postAvatar } from 'api/avatar';
import { toggleLoading } from 'state/loading/actions';
import { addToast, addErrors, TOAST_SUCCESS, TOAST_ERROR } from '@entando/messages';

export const getBase64 = file => (
  new Promise((resolve) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const base64 = reader.result.split(',');
      resolve(base64[1]);
    };
  }));

export const createFileObject = async (avatar) => {
  const base64 = await getBase64(avatar);
  return { fileName: avatar.name, base64 };
};

export const uploadAvatar =
  (avatar, loader = 'uploadAvatar') =>
    async (dispatch) => {
      try {
        const requestObject = await createFileObject(avatar);
        dispatch(toggleLoading(loader));
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
