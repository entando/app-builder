import reducer from 'state/settings-form/reducer';
import { getOptions } from 'state/settings-form/actions';
import { SELECT_OPTIONS_OK } from 'test/mocks/pageSettings';

const SELECT_OPTIONS_PAYLOAD = SELECT_OPTIONS_OK.payload;

describe('state/settings-form/reducer', () => {
  it('should return an object', () => {
    const state = reducer();
    expect(typeof state).toBe('object');
  });

  describe('after action GET_OPTIONS', () => {
    let state;
    beforeEach(() => {
      state = reducer({}, getOptions(SELECT_OPTIONS_PAYLOAD));
    });
    it('state should be valued with an array of options', () => {
      expect(state[0]).toEqual(SELECT_OPTIONS_PAYLOAD[0]);
    });
  });
});
