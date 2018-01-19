import store from 'state/store';

describe('state/store', () => {
  let defaultState;
  beforeEach(() => {
    defaultState = store.getState();
  });

  describe('default state', () => {
    it('contains property "helloWorld"', () => {
      expect(defaultState.helloWorld).toBeDefined();
    });

    it('contains property "helloWorld.message"', () => {
      expect(defaultState.helloWorld.message).toBeDefined();
    });
  });
});
