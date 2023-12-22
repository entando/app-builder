import { createStore } from 'redux';
import { getAvatar, getAvatarFilename } from 'state/avatar/selectors';
import rootReducer from 'state/rootReducer';

describe('getAvatar', () => {
  it('should return the avatar state', () => {
    const initialState = { avatar: { filename: 'test.jpg' } };
    const store = createStore(rootReducer, initialState);
    const result = getAvatar(store.getState());
    expect(result).toEqual(initialState.avatar);
  });
});

describe('getAvatarFilename selector', () => {
  it('should return the avatar filename', () => {
    const initialState = { avatar: { filename: 'test.jpg' } };
    const store = createStore(rootReducer, initialState);
    const result = getAvatarFilename(store.getState());
    expect(result).toBe('test.jpg');
  });
});

