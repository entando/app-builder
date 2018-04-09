import { isFSA } from 'flux-standard-action';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { gotoRoute } from 'frontend-common-components';
import { ROUTE_DATA_MODEL_LIST } from 'app-init/router';
import { mockApi } from 'test/testUtils';
import { SET_PAGE } from 'state/pagination/types';
import { TOGGLE_LOADING } from 'state/loading/types';
import { ADD_ERRORS } from 'state/errors/types';

import { SET_DATA_TYPES, SET_ATTRIBUTES, SET_SELECTED } from 'state/data-types/types';
import { getDataTypeAttributesIdList } from 'state/data-types/selectors';
import {
  sendDataType,
  setDataTypes,
  setDataTypeAttributes,
  setSelectedAttribute,
  fetchDataTypes,
  fetchDataTypeAttributes,
  fetchDataTypeAttribute,
} from 'state/data-types/actions';
import {
  postDataType,
  getDataTypes,
  getDataTypeAttributes,
  getDataTypeAttribute,
} from 'api/dataTypes';
import {
  DATA_TYPES,
  DATA_TYPES_OK_PAGE_1,
  DATA_TYPES_ATTRIBUTES,
  DATA_TYPE_ATTRIBUTE,
} from 'test/mocks/dataTypes';

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
    beforeEach(() => {
      action = setDataTypes(DATA_TYPES_MOCK);
    });
    it('is FSA compliant', () => {
      expect(isFSA(action)).toBe(true);
    });
    it('test setDataTypes action sets the correct type', () => {
      expect(action.type).toBe(SET_DATA_TYPES);
    });
  });
  describe('setDataTypeAttributes', () => {
    beforeEach(() => {
      action = setDataTypeAttributes(DATA_TYPES_ATTRIBUTES);
    });
    it('is FSA compliant', () => {
      expect(isFSA(action)).toBe(true);
    });
    it('test setDataTypeAttributes action sets the correct type', () => {
      expect(action.type).toBe(SET_ATTRIBUTES);
    });
  });
  describe('setSelectedAttribute', () => {
    beforeEach(() => {
      action = setSelectedAttribute(DATA_TYPE_ATTRIBUTE);
    });
    it('is FSA compliant', () => {
      expect(isFSA(action)).toBe(true);
    });
    it('test setSelectedAttribute action sets the correct type', () => {
      expect(action.type).toBe(SET_SELECTED);
    });
  });

  describe('thunk', () => {
    describe('sendDataType', () => {
      it('when postDataType succeeds, should dispatch gotoRoute', (done) => {
        postDataType.mockImplementation(mockApi({ payload: DATA_TYPES.payload }));
        store.dispatch(sendDataType(DATA_TYPES.payload)).then(() => {
          expect(postDataType).toHaveBeenCalled();
          expect(gotoRoute).toHaveBeenCalledWith(ROUTE_DATA_MODEL_LIST);
          done();
        }).catch(done.fail);
      });

      it('when postDataType get error, should dispatch addError', (done) => {
        postDataType.mockImplementation(mockApi({ errors: true }));
        store.dispatch(sendDataType(DATA_TYPES.payload)).then(() => {
          expect(postDataType).toHaveBeenCalled();
          const actions = store.getActions();
          expect(actions).toHaveLength(1);
          expect(actions[0]).toHaveProperty('type', ADD_ERRORS);
          done();
        }).catch(done.fail);
      });
    });

    describe('fetchDataTypes', () => {
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

      it('fetchDataTypes calls ADD_ERROR actions', (done) => {
        getDataTypes.mockImplementation(mockApi({ errors: true }));
        store.dispatch(fetchDataTypes()).then(() => {
          const actions = store.getActions();
          expect(actions).toHaveLength(3);
          expect(actions[0]).toHaveProperty('type', TOGGLE_LOADING);
          expect(actions[1]).toHaveProperty('type', ADD_ERRORS);
          expect(actions[2]).toHaveProperty('type', TOGGLE_LOADING);
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

      it('fetchDataTypeAttributes calls ADD_ERROR actions', (done) => {
        getDataTypeAttributes.mockImplementation(mockApi({ errors: true }));
        store.dispatch(fetchDataTypeAttributes()).then(() => {
          const actions = store.getActions();
          expect(actions).toHaveLength(1);
          expect(actions[0]).toHaveProperty('type', ADD_ERRORS);
          done();
        }).catch(done.fail);
      });
    });
    describe('fetchDataTypeAttribute', () => {
      it('fetchDataTypeAttribute calls setSelectedAttribute actions', (done) => {
        getDataTypeAttribute.mockImplementation(mockApi({ payload: DATA_TYPE_ATTRIBUTE }));
        store.dispatch(fetchDataTypeAttribute()).then(() => {
          const actions = store.getActions();
          expect(actions).toHaveLength(1);
          expect(actions[0]).toHaveProperty('type', SET_SELECTED);
          expect(actions[0]).toHaveProperty('payload.dataTypeAttributeCode');
          expect(actions[0]).toHaveProperty('payload.dataTypeAttributeCode', DATA_TYPE_ATTRIBUTE);

          done();
        }).catch(done.fail);
      });

      it('fetchDataTypeAttribute calls ADD_ERROR actions', (done) => {
        getDataTypeAttribute.mockImplementation(mockApi({ errors: true }));
        store.dispatch(fetchDataTypeAttribute()).then(() => {
          const actions = store.getActions();
          expect(actions).toHaveLength(1);
          expect(actions[0]).toHaveProperty('type', ADD_ERRORS);
          done();
        }).catch(done.fail);
      });
    });
  });
});
