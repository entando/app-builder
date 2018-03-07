import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { fetchDataModelList } from 'state/data-model-list/actions';
import { DATA_MODELS } from 'test/mocks/dataModels';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const DATA_MODELS_MOCK = DATA_MODELS.payload;

const DATA_MODELS_MOCK_INITIAL_STATE = {
  dataModels: [],
};


describe('test fetchDataTypes', () => {
  const store = mockStore(DATA_MODELS_MOCK_INITIAL_STATE);
  it('action payload contains dataModels information', (done) => {
    store.dispatch(fetchDataModelList()).then(() => {
      const actions = store.getActions();
      expect(actions[0].payload).toEqual({ dataModels: DATA_MODELS_MOCK });
      done();
    });
  });
});
