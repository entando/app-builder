import { getListDataModels } from 'state/data-models/selectors';

const pagedList = [
  {
    modelId: 'ID',
  },
];

const TEST_STATE = { dataModels: { pagedList } };

describe('data models list selectors', () => {
  it('verify getListDataModels selector', () => {
    expect(getListDataModels(TEST_STATE)).toEqual(pagedList);
  });
});
