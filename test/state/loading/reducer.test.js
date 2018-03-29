import reducer from 'state/loading/reducer';
import { toggleLoading } from 'state/loading/actions';

describe('state/loading/reducer', () => {
  const INITIAL_STATE = reducer();

  it('should return an object', () => {
    expect(INITIAL_STATE).toBeInstanceOf(Object);
  });

  it('should define ad empty object', () => {
    expect(INITIAL_STATE).toMatchObject({});
  });

  describe('after action TOGGLE_LOADING', () => {
    let newState;
    beforeEach(() => {
      newState = reducer(INITIAL_STATE, toggleLoading('test'));
    });

    it('should "id" defined as return true', () => {
      expect(newState.test).toBe(true);
    });

    it('should "id" defined as return false', () => {
      newState = reducer(newState, toggleLoading('test'));
      expect(newState.test).toBe(false);
    });
  });
});
