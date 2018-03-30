import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { fetchDataModelListPaged } from 'state/data-models/actions';
import { SET_DATA_MODELS } from 'state/data-models/types';
import { TOGGLE_LOADING } from 'state/loading/types';
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
      expect(actions[0].type).toEqual(TOGGLE_LOADING);
      expect(actions[1].type).toEqual(SET_DATA_MODELS);
      expect(actions[1].payload).toEqual({ dataModelsPaged: DATA_MODELS_MOCK });
      done();
    });
  });
});
