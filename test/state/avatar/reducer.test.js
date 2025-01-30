import { createStore } from 'redux';
import rootReducer from 'state/rootReducer';
import { SET_AVATAR_FILE_NAME } from 'state/avatar/types';

describe('avatarReducer', () => {
  it('should handle SET_AVATAR_FILE_NAME action', () => {
    const store = createStore(rootReducer);
    const setAvatarFileNameAction = {
      type: SET_AVATAR_FILE_NAME,
      payload: { filename: 'test.jpg' },
    };
    store.dispatch(setAvatarFileNameAction);
    expect(store.getState().avatar.filename).toBe('test.jpg');
  });

  it('should handle unknown action type', () => {
    const store = createStore(rootReducer);
    const unknownAction = {
      type: 'UNKNOWN_ACTION',
      payload: { filename: 'test.jpg' },
    };
    store.dispatch(unknownAction);
    expect(store.getState().avatar.filename).toBe('');
  });
});

