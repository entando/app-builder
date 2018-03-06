import reducer from 'state/fragments/reducer';
import { setSelectedFragment } from 'state/fragments/actions';
import { BODY_OK } from 'test/mocks/fragment';


describe('state/fragments/reducer', () => {
  const state = reducer();

  it('should return an object', () => {
    expect(typeof state).toBe('object');
  });

  describe('after action SET_SELECTED', () => {
    let newState;
    beforeEach(() => {
      newState = reducer(state, setSelectedFragment(BODY_OK.payload));
    });
    it('should define the fragment payload', () => {
      expect(newState.selected).toEqual(BODY_OK.payload);
    });
  });
});
