import reducer from 'state/fragments/reducer';
import { setSelectedFragment } from 'state/fragments/actions';
import { GET_FRAGMENT_OK } from 'test/mocks/fragments';


describe('state/fragments/reducer', () => {
  const state = reducer();

  it('should return an object', () => {
    expect(typeof state).toBe('object');
  });

  describe('after action SET_SELECTED', () => {
    let newState;
    beforeEach(() => {
      newState = reducer(state, setSelectedFragment(GET_FRAGMENT_OK.payload));
    });
    it('should define the fragment payload', () => {
      expect(newState.selected).toEqual(GET_FRAGMENT_OK.payload);
    });
  });
});
