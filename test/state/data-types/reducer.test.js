import reducer from 'state/data-types/reducer';
import { setDataTypes } from 'state/data-types/actions';
import { DATA_TYPES } from 'test/mocks/dataTypes';

describe('state/data-types/reducer', () => {
  const state = reducer();

  it('should return an object', () => {
    expect(typeof state).toBe('object');
  });

  describe('after action SET_DATA_TYPES', () => {
    let newState;
    beforeEach(() => {
      newState = reducer(state, setDataTypes(DATA_TYPES.payload));
    });

    it('should define the dataType payload', () => {
      expect(newState.list).toEqual(DATA_TYPES.payload);
    });
  });
});
