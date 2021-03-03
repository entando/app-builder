import { SET_COLUMN_ORDER } from 'state/table-column-order/types';

// eslint-disable-next-line import/prefer-default-export
export const setColumnOrder = (columns, table = 'default') => ({
  type: SET_COLUMN_ORDER,
  payload: {
    columns,
    table,
  },
});
