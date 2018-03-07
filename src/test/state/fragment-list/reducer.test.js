import reducer from 'state/fragment-list/reducer';
import { setFragments } from 'state/fragment-list/actions';
import { LIST_FRAGMENTS_OK_PAGE_1 } from 'test/mocks/fragments';

const FRAGMENT_PAYLOAD = LIST_FRAGMENTS_OK_PAGE_1.payload;

describe('fragment-list reducer', () => {
  it('should return an object', () => {
    const state = reducer();
    expect(typeof state).toBe('object');
    expect(state instanceof Array).toBe(true);
  });

  describe('after action SET_FRAGMENTS', () => {
    it('should define fragmentList', () => {
      const state = reducer({}, setFragments(FRAGMENT_PAYLOAD));
      expect(state).toHaveLength(2);
    });
  });
});
