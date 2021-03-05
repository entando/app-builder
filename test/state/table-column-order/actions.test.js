import { setColumnOrder } from 'state/table-column-order/actions';
import { SET_COLUMN_ORDER } from 'state/table-column-order/types';

describe('column order actions', () => {
  describe('setColumnOrder', () => {
    it('test setColumnOrder action sets the correct type and default namespace', () => {
      const action = setColumnOrder([]);
      expect(action).toHaveProperty('type', SET_COLUMN_ORDER);
      expect(action).toHaveProperty('payload');
      expect(action).toHaveProperty('payload.columns', []);
      expect(action).toHaveProperty('payload.table', 'default');
    });

    it('sets a custom table', () => {
      const action = setColumnOrder(['woo'], 'custom');
      expect(action).toHaveProperty('type', SET_COLUMN_ORDER);
      expect(action).toHaveProperty('payload');
      expect(action).toHaveProperty('payload.columns', ['woo']);
      expect(action).toHaveProperty('payload.table', 'custom');
    });
  });
});
