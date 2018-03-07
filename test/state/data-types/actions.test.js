import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { fetchDataTypes } from 'state/data-types/actions';
import { DATA_TYPES } from 'test/mocks/dataTypes';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const DATA_TYPES_MOCK = DATA_TYPES.payload;

const DATA_TYPES_MOCK_INITIAL_STATE = {
  dataType: [],
};


describe('test fetchDataTypes', () => {
  const store = mockStore(DATA_TYPES_MOCK_INITIAL_STATE);
  it('action payload contains dataType information', (done) => {
    store.dispatch(fetchDataTypes()).then(() => {
      const actions = store.getActions();
      expect(actions[0].payload).toEqual({ dataTypes: DATA_TYPES_MOCK });
      done();
    });
  });
});
