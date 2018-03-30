import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { setDataTypes, fetchDataTypes } from 'state/data-types/actions';
import { SET_DATA_TYPES } from 'state/data-types/types';
import { SET_PAGE } from 'state/pagination/types';
import { TOGGLE_LOADING } from 'state/loading/types';
import { DATA_TYPES_OK_PAGE_1 } from 'test/mocks/dataTypes';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);


const INITIAL_STATE = {
  dataTypes: {
    list: [],
  },
};

describe('data types actions ', () => {
  let store;

  beforeEach(() => {
    store = mockStore(INITIAL_STATE);
  });

  describe('setDataTypes', () => {
    it('test setDataTypes action sets the correct type', () => {
      const action = setDataTypes(DATA_TYPES_OK_PAGE_1.payload);
      expect(action.type).toEqual(SET_DATA_TYPES);
    });
  });

  describe('test fetchDataTypes', () => {
    it('fetchDataTypes calls fetchDataTypes and setPage actions', (done) => {
      store.dispatch(fetchDataTypes()).then(() => {
        const actions = store.getActions();
        expect(actions).toHaveLength(4);
        expect(actions[0].type).toEqual(TOGGLE_LOADING);
        expect(actions[1].type).toEqual(SET_DATA_TYPES);
        expect(actions[2].type).toEqual(TOGGLE_LOADING);
        expect(actions[3].type).toEqual(SET_PAGE);
        done();
      });
    });

    it('dataTypes is defined and properly valued', (done) => {
      store.dispatch(fetchDataTypes()).then(() => {
        const actionPayload = store.getActions()[1].payload;
        expect(actionPayload.dataTypes).toHaveLength(2);
        const dataType = actionPayload.dataTypes[0];
        expect(dataType).toHaveProperty('name', 'dataType1');
        expect(dataType).toHaveProperty('code', 'ABC');
        expect(dataType).toHaveProperty('status', 'ok');
        done();
      });
    });
  });
});
