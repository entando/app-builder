import reducer from 'state/table-column-order/reducer';
import { setColumnOrder } from 'state/table-column-order/actions';

let defaultState;

const correctBody = {
  default: ['pos'],
  top: ['op', 'cors'],
};

describe('table-column-order reducer', () => {
  it('should return an object', () => {
    defaultState = reducer();
    expect(typeof defaultState).toBe('object');
    expect(defaultState).toHaveProperty('default', []);
  });

  describe('after action SET_COLUMN_ORDER', () => {
    it('should define page with the correct parameters', () => {
      const state = reducer(defaultState, setColumnOrder(correctBody.top));
      expect(state).not.toHaveProperty('top');
      expect(state).toHaveProperty('default', correctBody.top);
    });

    describe('table namespacing', () => {
      it('should set the values in the correct table', () => {
        const state = reducer(defaultState, setColumnOrder(correctBody.top, 'top'));
        expect(state).toHaveProperty('default', []);
        expect(state).toHaveProperty('top', correctBody.top);
      });
    });
  });
});
