
import reducer from 'state/hello-world/reducer';


const DEFAULT_VALUE = {
  message: 'Hello, world!',
};
const MESSAGE_AFTER_CLICK = 'You clicked the message!';

const ACTION = {
  'hello-world-clicked': { type: 'hello-world-clicked' },
};

const defaultStore = reducer();

describe('hello-world/reducer', () => {
  describe('should contain property', () => {
    it('message', () => {
      expect(defaultStore.message).toBeDefined();
    });
  });

  describe('default value of property', () => {
    it(`message should be ${DEFAULT_VALUE.message}`, () => {
      expect(defaultStore.message).toBe(DEFAULT_VALUE.message);
    });
  });


  describe('on action', () => {
    describe('hello-world-clicked', () => {
      let store;
      beforeEach(() => {
        store = reducer(undefined, ACTION['hello-world-clicked']);
      });

      it(`message should be ${MESSAGE_AFTER_CLICK}`, () => {
        expect(store.message).toBe(MESSAGE_AFTER_CLICK);
      });
    });
  });
});
