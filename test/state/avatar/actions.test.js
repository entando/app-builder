import { createFileObject, uploadAvatar } from 'state/avatar/actions';
import * as actionsHelper from 'state/avatar/actions';
import * as apiHelper from 'api/avatar';

describe('createFileObject', () => {
  it('should create a file object', async () => {
    const avatar = new File(['test data'], 'test.png', { type: 'image/png' });
    const result = await createFileObject(avatar);
    expect(result).toEqual({ fileName: 'test.png', base64: result.base64 });
  });
});

describe('uploadAvatar', () => {
  it('should upload avatar successfully', async () => {
    const avatar = new File(['test data'], 'test.png', { type: 'image/png' });
    const dispatch = jest.fn();
    jest.spyOn(actionsHelper, 'createFileObject').mockResolvedValue({ fileName: 'test.png', base64: 'base64encodedstring' });
    jest.spyOn(apiHelper, 'postAvatar').mockResolvedValue();

    await uploadAvatar(avatar)(dispatch);

    expect(dispatch).toHaveBeenCalledWith({ payload: { id: 'uploadAvatar' }, type: 'loading/toggle-loading' });
    expect(dispatch).toHaveBeenCalledWith({ payload: { id: 'uploadAvatar' }, type: 'loading/toggle-loading' });
    expect(dispatch).toHaveBeenCalledWith({ payload: { message: { id: 'fileBrowser.uploadFileComplete' }, type: 'success' }, type: 'toasts/add-toast' });
    expect(dispatch).toHaveBeenCalledTimes(3);
  });

  it('should handle avatar upload error', async () => {
    const avatar = { name: 'test.jpg' };
    const dispatch = jest.fn();
    const error = new Error('Upload failed');
    jest.spyOn(actionsHelper, 'createFileObject').mockResolvedValue({ fileName: avatar.name, base64: 'base64encodedstring' });
    jest.spyOn(apiHelper, 'postAvatar').mockRejectedValue(error);

    await uploadAvatar(avatar)(dispatch);

    expect(dispatch).toHaveBeenCalledWith({ payload: { id: 'uploadAvatar' }, type: 'loading/toggle-loading' });
    expect(dispatch).toHaveBeenCalledWith({ payload: { id: 'uploadAvatar' }, type: 'loading/toggle-loading' });
    expect(dispatch).toHaveBeenCalledWith({ payload: { message: { id: 'fileBrowser.uploadFileError', values: { errmsg: TypeError('[TypeError: Failed to execute \'readAsDataURL\' on \'FileReader\': parameter 1 is not of type \'Blob\'.]') } }, type: 'error' }, type: 'toasts/add-toast' });
    expect(dispatch).toHaveBeenCalledWith({ type: 'errors/add-errors', payload: { errors: TypeError('[TypeError: Failed to execute \'readAsDataURL\' on \'FileReader\': parameter 1 is not of type \'Blob\'.]') } });
    expect(dispatch).toHaveBeenCalledTimes(4);
  });
});

