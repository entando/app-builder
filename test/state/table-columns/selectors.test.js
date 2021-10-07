import { getCurrentColumnsShow } from 'state/table-columns/selectors';

const TEST_STATE = {
  tableColumns: { currentColumnsShow: ['col1', 'col2'] },
};

it('verify getCurrentColumnsShow selector', () => {
  const currentColumns = getCurrentColumnsShow(TEST_STATE);
  expect(currentColumns).toEqual(['col1', 'col2']);
});
