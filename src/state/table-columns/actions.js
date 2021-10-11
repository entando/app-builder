import { SET_CURRENT_COLUMNS_SHOW } from 'state/table-columns/types';

// eslint-disable-next-line import/prefer-default-export
export const setCurrentColumnsShow = columns => ({
  type: SET_CURRENT_COLUMNS_SHOW,
  payload: columns,
});
