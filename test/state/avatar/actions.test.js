import { createFileObject, uploadAvatar, fetchAvatar } from 'state/avatar/actions';
import * as actionsHelper from 'state/avatar/actions';
import * as apiHelper from 'api/avatar';

describe('createFileObject', () => {
  it('should create a file object', async () => {
    const avatar = new File(['test data'], 'test.png', { type: 'image/png' });
    const result = await createFileObject(avatar);
    expect(result).toEqual({ filename: 'test.png', base64: result.base64 });
  });
});

describe('uploadAvatar', () => {
  beforeAll(() => {
    global.Date.now = jest.fn(() => new Date('2019-04-07T10:20:30Z').getTime());
  });
  it('should upload avatar successfully', async () => {
    const avatar = new File(['test data'], 'test.png', { type: 'image/png' });
    const dispatch = jest.fn();
    jest.spyOn(actionsHelper, 'createFileObject').mockResolvedValue({ filename: 'test.png', base64: 'base64encodedstring' });
    jest.spyOn(apiHelper, 'postAvatar').mockResolvedValue({ json: () => Promise.resolve({ payload: { filename: 'test.png' } }) });

    await uploadAvatar(avatar)(dispatch);

    expect(dispatch).toHaveBeenCalledWith({ payload: { id: 'uploadAvatar' }, type: 'loading/toggle-loading' });
    expect(dispatch).toHaveBeenCalledWith({ payload: { filename: `test.png?${new Date('2019-04-07T10:20:30Z').getTime()}` }, type: 'avatar/filename' });
    expect(dispatch).toHaveBeenCalledWith({ payload: { id: 'uploadAvatar' }, type: 'loading/toggle-loading' });
    expect(dispatch).toHaveBeenCalledWith({ payload: { message: { id: 'fileBrowser.uploadFileComplete' }, type: 'success' }, type: 'toasts/add-toast' });
    expect(dispatch).toHaveBeenCalledTimes(5);
  });

  it('should handle avatar upload error', async () => {
    const avatar = { name: 'test.jpg' };
    const dispatch = jest.fn();
    const error = new Error('Upload failed');
    jest.spyOn(actionsHelper, 'createFileObject').mockResolvedValue({ filename: avatar.name, base64: 'base64encodedstring' });
    jest.spyOn(apiHelper, 'postAvatar').mockRejectedValue(error);

    await uploadAvatar(avatar)(dispatch);

    expect(dispatch).toHaveBeenCalledWith({ payload: { id: 'uploadAvatar' }, type: 'loading/toggle-loading' });
    expect(dispatch).toHaveBeenCalledWith({ payload: { id: 'uploadAvatar' }, type: 'loading/toggle-loading' });
    expect(dispatch).toHaveBeenCalledWith({ payload: { message: { id: 'fileBrowser.uploadFileError', values: { errmsg: TypeError('[TypeError: Failed to execute \'readAsDataURL\' on \'FileReader\': parameter 1 is not of type \'Blob\'.]') } }, type: 'error' }, type: 'toasts/add-toast' });
    expect(dispatch).toHaveBeenCalledWith({ type: 'errors/add-errors', payload: { errors: TypeError('[TypeError: Failed to execute \'readAsDataURL\' on \'FileReader\': parameter 1 is not of type \'Blob\'.]') } });
    expect(dispatch).toHaveBeenCalledTimes(4);
  });
});


describe('fetchAvatar', () => {
  beforeAll(() => {
    global.Date.now = jest.fn(() => new Date('2019-04-07T10:20:30Z').getTime());
  });

  it('should retrieve the avatar successfully', async () => {
    const dispatch = jest.fn();
    jest.spyOn(apiHelper, 'getAvatar').mockResolvedValue({ ok: true, json: () => Promise.resolve({ payload: { filename: 'test.png' } }) });
    await fetchAvatar()(dispatch);
    expect(dispatch).toHaveBeenCalledWith({ payload: { id: 'fetchAvatar' }, type: 'loading/toggle-loading' });
    expect(dispatch).toHaveBeenCalledWith({ payload: { useGravatar: false }, type: 'avatar/useGravatar' });
    expect(dispatch).toHaveBeenCalledWith({ payload: { filename: `test.png?${new Date('2019-04-07T10:20:30Z').getTime()}` }, type: 'avatar/filename' });
    expect(dispatch).toHaveBeenCalledWith({ payload: { id: 'fetchAvatar' }, type: 'loading/toggle-loading' });
    expect(dispatch).toHaveBeenCalledTimes(4);
  });

  it('should handle avatar fetch error', async () => {
    const dispatch = jest.fn();
    const error = new Error('Fetch failed');
    jest.spyOn(apiHelper, 'getAvatar').mockRejectedValue(error);
    await fetchAvatar()(dispatch);
    expect(dispatch).toHaveBeenCalledWith({ payload: { id: 'fetchAvatar' }, type: 'loading/toggle-loading' });
    expect(dispatch).toHaveBeenCalledWith({ payload: { id: 'fetchAvatar' }, type: 'loading/toggle-loading' });
    expect(dispatch).toHaveBeenCalledWith({ payload: { message: 'Fetch failed', type: 'error' }, type: 'toasts/add-toast' });
    expect(dispatch).toHaveBeenCalledTimes(4);
  });
});

