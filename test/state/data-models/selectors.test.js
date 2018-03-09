import { getListDataModelsPaged } from 'state/data-model-list/selectors';

const pagedList = [
  {
    modelId: 'ID',
  },
];

const TEST_STATE = { dataModelList: { pagedList } };

describe('data models list selectors', () => {
  it('verify getListDataModelsPaged selector', () => {
    expect(getListDataModelsPaged(TEST_STATE)).toEqual(pagedList);
  });
});
