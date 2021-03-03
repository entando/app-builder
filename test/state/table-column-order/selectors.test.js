import { getColumnOrder } from 'state/table-column-order/selectors';

const firstTable = ['a', 'v'];

const secondTable = ['b', 'bb2'];

describe('pagination selectors', () => {
  let state;

  beforeEach(() => {
    state = { tableColumnOrder: { default: [], firstTable } };
  });

  it('verify getColumnOrder selector', () => {
    expect(getColumnOrder(state)).toEqual([]);
  });

  it('verify correct getColumnOrder selector', () => {
    expect(getColumnOrder(state, 'firstTable')).toEqual(firstTable);
  });

  it('verify correct getColumnOrder selector 2nd example', () => {
    state = { tableColumnOrder: { secondTable } };
    expect(getColumnOrder(state, 'secondTable')).toEqual(secondTable);
  });
});
