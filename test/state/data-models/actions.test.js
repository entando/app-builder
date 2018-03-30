import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { fetchDataModelListPaged } from 'state/data-models/actions';
import { getDataModels } from 'api/dataModels';
import { SET_DATA_MODELS } from 'state/data-models/types';
import { ADD_ERRORS } from 'state/errors/types';
import { TOGGLE_LOADING } from 'state/loading/types';
import { DATA_MODELS } from 'test/mocks/dataModels';
import { SET_PAGE } from 'state/pagination/types';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const DATA_MODELS_MOCK = DATA_MODELS.payload;

const DATA_MODELS_MOCK_INITIAL_STATE = {
  dataModelsPaged: [],
};

const PROMISE_OK = {
  ok: true,
  json: () => new Promise(res => res({ payload: DATA_MODELS.payload })),
};
const PROMISE_ERROR = {
  ok: false,
  json: () => new Promise(err => err({
    errors: [
      { message: 'what went wrong' },
    ],
  })),
};

jest.mock('api/dataModels', () => ({
  getDataModels: jest.fn(),
}));
getDataModels.mockReturnValue(new Promise(resolve => resolve(PROMISE_OK)));


describe('state/data-models/actions', () => {
  let store;
  beforeEach(() => {
    store = mockStore(DATA_MODELS_MOCK_INITIAL_STATE);
  });

  describe('fetchDataModels', () => {
    it('fetchDataModels calls setDataModels and setPage actions ', (done) => {
      store.dispatch(fetchDataModelListPaged()).then(() => {
        const actions = store.getActions();
        expect(actions).toHaveLength(4);
        expect(actions[0].type).toEqual(TOGGLE_LOADING);
        expect(actions[1].type).toEqual(SET_DATA_MODELS);
        expect(actions[1].payload).toEqual({ dataModelsPaged: DATA_MODELS_MOCK });
        expect(actions[2].type).toEqual(TOGGLE_LOADING);
        expect(actions[3].type).toEqual(SET_PAGE);
        done();
      }).catch(done.fail);
    });

    it('getDataModels is defined and properly valued', (done) => {
      store.dispatch(fetchDataModelListPaged()).then(() => {
        expect(getDataModels).toHaveBeenCalled();
        const actions = store.getActions();
        const actionPayload = actions[1].payload;
        expect(actionPayload.dataModelsPaged).toHaveLength(6);
        const dataModel = actionPayload.dataModelsPaged[0];
        expect(dataModel).toMatchObject(DATA_MODELS.payload[0]);
        done();
      }).catch(done.fail);
    });

    it('when getDataModels get error, should dispatch addErrors', (done) => {
      getDataModels.mockReturnValueOnce(new Promise(resolve => resolve(PROMISE_ERROR)));
      store.dispatch(fetchDataModelListPaged()).then(() => {
        expect(getDataModels).toHaveBeenCalled();
        const actions = store.getActions();
        expect(actions).toHaveLength(3);
        expect(actions[0].type).toEqual(TOGGLE_LOADING);
        expect(actions[1].type).toEqual(ADD_ERRORS);
        expect(actions[2].type).toEqual(TOGGLE_LOADING);
        done();
      }).catch(done.fail);
    });
  });
});
