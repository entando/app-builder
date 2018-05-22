import reducer from 'state/toasts/reducer';
import { addToast, removeToast } from 'state/toasts/actions';
import uuid from 'uuid/v1';

jest.mock('uuid/v1');

describe('state/toasts/reducer', () => {
  const INITIAL_STATE = reducer();

  it('should return an object', () => {
    expect(INITIAL_STATE).toBeInstanceOf(Object);
  });

  it('should define ad empty object', () => {
    expect(INITIAL_STATE).toMatchObject({});
  });

  describe('add Toast', () => {
    let newState;

    it('should be passed a valid Object ', () => {
      uuid.mockReturnValueOnce('a');
      newState = reducer(INITIAL_STATE, addToast('a', 'test'));
      expect(Object.keys(newState)).toHaveLength(1);
      expect(newState).toHaveProperty('a', { message: 'a', type: 'test' });
    });

    it('add another alert', () => {
      uuid.mockReturnValueOnce('b');
      newState = reducer(newState, addToast('b', 'test2'));
      expect(Object.keys(newState)).toHaveLength(2);
      expect(newState).toHaveProperty('a', { message: 'a', type: 'test' });
      expect(newState).toHaveProperty('b', { message: 'b', type: 'test2' });
    });

    describe('remove Toast', () => {
      it('should not remove a non existing id', () => {
        newState = reducer(newState, removeToast('c'));
        expect(Object.keys(newState)).toHaveLength(2);
        expect(newState).toHaveProperty('a', { message: 'a', type: 'test' });
        expect(newState).toHaveProperty('b', { message: 'b', type: 'test2' });
      });

      it('should remove an existing id', () => {
        newState = reducer(newState, removeToast('a'));
        expect(Object.keys(newState)).toHaveLength(1);
        expect(newState).not.toHaveProperty('a', { message: 'a', type: 'test' });
        expect(newState).toHaveProperty('b', { message: 'b', type: 'test2' });
      });
    });
  });
});
