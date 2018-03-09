import reducer from 'state/data-models/reducer';
import { setDataModels } from 'state/data-models/actions';
import { DATA_MODELS } from 'test/mocks/dataModels';

describe('state/data-types/reducer', () => {
  const state = reducer();

  it('should return an object', () => {
    expect(typeof state).toBe('object');
  });

  describe('SET_DATA_MODELS', () => {
    let newState;
    beforeEach(() => {
      newState =
      reducer(state, setDataModels(DATA_MODELS.payload));
    });

    it('compares the dataModel payload', () => {
      expect(newState.list).toEqual(DATA_MODELS.payload);
    });
  });
});
