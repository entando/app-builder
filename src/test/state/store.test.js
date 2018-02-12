
import store from 'state/store';

describe('state/store', () => {
  let defaultState;
  beforeEach(() => {
    defaultState = store.getState();
  });

  describe('default state', () => {
    it('contains at least one property', () => {
      expect(defaultState).toBeDefined();
    });
  });
});
