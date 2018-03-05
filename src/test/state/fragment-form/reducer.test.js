import reducer from 'state/fragment-form/reducer';
import { setFragment } from 'state/fragment-form/actions';
import { GET_FRAGMENT_OK } from 'test/mocks/fragment';

const FRAGMENT_PAYLOAD = GET_FRAGMENT_OK.payload;

describe('state/fragment-form/reducer', () => {
  it('should return an object', () => {
    const state = reducer();
    expect(typeof state).toBe('object');
  });

  describe('after action SET_FRAGMENT', () => {
    let state;
    beforeEach(() => {
      state = reducer({}, setFragment(FRAGMENT_PAYLOAD));
    });
    it('should define fragmentValues', () => {
      expect(state.fragmentValues).toBeDefined();
    });
  });
});
