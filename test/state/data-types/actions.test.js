import { isFSA } from 'flux-standard-action';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { mockApi } from 'test/testUtils';
import { SET_PAGE } from 'state/pagination/types';
import { TOGGLE_LOADING } from 'state/loading/types';

import { SET_DATA_TYPES, SET_ATTRIBUTES } from 'state/data-types/types';
import { getDataTypeAttributesIdList } from 'state/data-types/selectors';
import { setDataTypes, fetchDataTypes, fetchDataTypeAttributes } from 'state/data-types/actions';
import { getDataTypes, getDataTypeAttributes } from 'api/dataTypes';
import { DATA_TYPES_OK_PAGE_1, DATA_TYPES_ATTRIBUTES } from 'test/mocks/dataTypes';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const DATA_TYPES_MOCK = DATA_TYPES_OK_PAGE_1.payload;

const INITIAL_STATE = {};

jest.mock('state/data-types/selectors', () => ({
  getDataTypeAttributesIdList: jest.fn(),
}));

describe('state/data-types/actions ', () => {
  let store;
  let action;
  beforeEach(() => {
    store = mockStore(INITIAL_STATE);
    jest.clearAllMocks();
  });

  describe('setDataTypes', () => {
    it('test setDataTypes action sets the correct type', () => {
      action = setDataTypes(DATA_TYPES_MOCK);
      expect(action.type).toBe(SET_DATA_TYPES);
    });
  });

  describe('setDataTypeAttributes', () => {
    it('is FSA compliant', () => {
      expect(isFSA(action)).toBe(true);
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
      }).catch(done.fail);
    });

    it('dataTypes is defined and properly valued', (done) => {
      getDataTypes.mockImplementation(mockApi({ payload: DATA_TYPES_MOCK }));
      store.dispatch(fetchDataTypes()).then(() => {
        const actionPayload = store.getActions()[1].payload;
        expect(actionPayload.dataTypes).toHaveLength(2);
        const dataType = actionPayload.dataTypes[0];
        expect(dataType).toHaveProperty('name', 'dataType1');
        expect(dataType).toHaveProperty('code', 'ABC');
        expect(dataType).toHaveProperty('status', 'ok');
        done();
      }).catch(done.fail);
    });
  });
  describe('fetchDataTypeAttributes', () => {
    it('fetchDataTypeAttributes call setAttributes actions', (done) => {
      getDataTypeAttributes.mockImplementation(mockApi({ payload: DATA_TYPES_ATTRIBUTES }));
      store.dispatch(fetchDataTypeAttributes()).then(() => {
        const actions = store.getActions();
        expect(actions).toHaveLength(1);
        expect(actions[0]).toHaveProperty('type', SET_ATTRIBUTES);
        expect(actions[0]).toHaveProperty('payload');
        expect(actions[0]).toHaveProperty('payload.attributes');
        expect(actions[0]).toHaveProperty('payload.attributes', DATA_TYPES_ATTRIBUTES);
        done();
      }).catch(done.fail);
    });

    it('fetchDataTypeAttributes not call setAttributes actions', (done) => {
      getDataTypeAttributesIdList.mockReturnValue(DATA_TYPES_ATTRIBUTES);
      getDataTypeAttributes.mockImplementation(mockApi({ payload: DATA_TYPES_ATTRIBUTES }));
      store.dispatch(fetchDataTypeAttributes()).then(() => {
        const actions = store.getActions();
        expect(actions).toHaveLength(0);
        done();
      }).catch(done.fail);
    });
  });
});
