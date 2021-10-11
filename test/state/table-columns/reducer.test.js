import reducer from 'state/table-columns/reducer';
import { setCurrentColumnsShow } from 'state/table-columns/actions';

describe('state/table-columns/reducer', () => {
  it('should return an object', () => {
    const state = reducer();
    expect(typeof state).toBe('object');
  });

  describe('after action setCurrentColumnsShow', () => {
    let newState = reducer();
    it('should correctly update currentColumnsShow state field', () => {
      newState = reducer(newState, setCurrentColumnsShow(['column1']));
      expect(newState.currentColumnsShow).toEqual(['column1']);
      newState = reducer(newState, setCurrentColumnsShow([]));
      expect(newState.currentColumnsShow).toEqual([]);
    });
  });
});
