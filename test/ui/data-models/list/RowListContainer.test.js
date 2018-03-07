import { mapStateToProps } from 'ui/data-models/list/RowListContainer';
import { DATA_MODELS } from 'test/mocks/dataModels';

const TEST_STATE = {
  dataModelList: {
    list: DATA_MODELS.payload,
  },

};

describe('RowListContainer', () => {
  it('maps dataModels property state in RowListContainer', () => {
    expect(mapStateToProps(TEST_STATE)).toEqual({ dataModels: DATA_MODELS.payload });
  });
});
