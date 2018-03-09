import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { fetchDataModelListPaged } from 'state/data-model-list/actions';
import { DATA_MODELS_P1 } from 'test/mocks/dataModels';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const DATA_MODELS_MOCK = DATA_MODELS_P1.payload;

const DATA_MODELS_MOCK_INITIAL_STATE = {
  dataModelsPaged: [],
};


describe('test fetchDataModels', () => {
  const store = mockStore(DATA_MODELS_MOCK_INITIAL_STATE);
  it('action payload contains dataModels information', (done) => {
    store.dispatch(fetchDataModelListPaged()).then(() => {
      const actions = store.getActions();
      expect(actions[0].payload).toEqual({ dataModelsPaged: DATA_MODELS_MOCK });
      done();
    });
  });
});
