import reducer from 'state/fragment-list/reducer';
import { setFragments } from 'state/fragment-list/actions';
import { LIST_FRAGMENTS_OK } from 'test/mocks/fragments';

const FRAGMENT_PAYLOAD = LIST_FRAGMENTS_OK.payload;

describe('fragment-list reducer', () => {
  it('should return an object', () => {
    const state = reducer();
    expect(typeof state).toBe('object');
    expect(state instanceof Array).toBe(true);
  });

  describe('after action SET_FRAGMENTS', () => {
    it('should define fragmentList', () => {
      const state = reducer({}, setFragments(FRAGMENT_PAYLOAD));
      expect(state.length).toBe(1);
    });
  });
});
