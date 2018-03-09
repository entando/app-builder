import { getListDataModelsPaged } from 'state/data-models/selectors';

const pagedList = [
  {
    modelId: 'ID',
  },
];

const TEST_STATE = { dataModels: { pagedList } };

describe('data models list selectors', () => {
  it('verify getListDataModelsPaged selector', () => {
    expect(getListDataModelsPaged(TEST_STATE)).toEqual(pagedList);
  });
});
