import { setCurrentColumnsShow } from 'state/table-columns/actions';
import { SET_CURRENT_COLUMNS_SHOW } from 'state/table-columns/types';

describe('state/table-columns/actions', () => {
  it('setCurrentColumnsShow() should return a well formed action', () => {
    const action = setCurrentColumnsShow(['created', 'status']);
    expect(action).toHaveProperty('type', SET_CURRENT_COLUMNS_SHOW);
    expect(action.payload).toEqual(['created', 'status']);
  });
});
