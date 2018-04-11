import { isFSA } from 'flux-standard-action';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { gotoRoute } from 'frontend-common-components';
import { ROUTE_DATA_MODEL_LIST } from 'app-init/router';
import { mockApi } from 'test/testUtils';
import { SET_PAGE } from 'state/pagination/types';
import { TOGGLE_LOADING } from 'state/loading/types';
import { ADD_ERRORS } from 'state/errors/types';

import {
  SET_DATA_TYPES,
  REMOVE_DATA_TYPE,
  SET_ATTRIBUTES,
  SET_SELECTED_DATA_TYPE,
  SET_SELECTED_ATTRIBUTE_FOR_DATATYPE,
  SET_SELECTED_ATTRIBUTE,
  REMOVE_ATTRIBUTE,
} from 'state/data-types/types';
import { getDataTypeAttributesIdList } from 'state/data-types/selectors';
import {
  sendPostDataType,
  sendPutDataType,
  sendDeleteDataType,
  setDataTypes,
  removeDataType,
  fetchDataType,
  fetchDataTypes,
  fetchAttributeFromDataType,
  sendPostAttributeFromDataType,
  sendPutAttributeFromDataType,
  sendDeleteAttributeFromDataType,
  setSelectedDataType,
  setDataTypeAttributes,
  setSelectedAttribute,
  fetchDataTypeAttributes,
  fetchDataTypeAttribute,
} from 'state/data-types/actions';
import {
  postDataType,
  putDataType,
  deleteDataType,
  getDataType,
  getDataTypes,
  getAttributeFromDataType,
  postAttributeFromDataType,
  putAttributeFromDataType,
  deleteAttributeFromDataType,
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

  describe('removeDataType', () => {
    beforeEach(() => {
      action = removeDataType('AAA');
    });
    it('is FSA compliant', () => {
      expect(isFSA(action)).toBe(true);
    });
    it('test removeDataType action sets the correct type', () => {
      expect(action.type).toBe(REMOVE_DATA_TYPE);
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
  describe('setSelectedDataType', () => {
    beforeEach(() => {
      action = setSelectedDataType('AAA');
    });
    it('is FSA compliant', () => {
      expect(isFSA(action)).toBe(true);
    });
    it('test setSelectedDataType action sets the correct type', () => {
      expect(action.type).toBe(SET_SELECTED_DATA_TYPE);
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
      expect(action.type).toBe(SET_SELECTED_ATTRIBUTE);
    });
  });

  describe('thunk', () => {
    describe('sendPostDataType', () => {
      it('when postDataType succeeds, should dispatch gotoRoute', (done) => {
        postDataType.mockImplementation(mockApi({ payload: DATA_TYPES }));
        store.dispatch(sendPostDataType(DATA_TYPES)).then(() => {
          expect(postDataType).toHaveBeenCalled();
          expect(gotoRoute).toHaveBeenCalledWith(ROUTE_DATA_MODEL_LIST);
          done();
        }).catch(done.fail);
      });

      it('when postDataType get error, should dispatch addError', (done) => {
        postDataType.mockImplementation(mockApi({ errors: true }));
        store.dispatch(sendPostDataType(DATA_TYPES)).then(() => {
          expect(postDataType).toHaveBeenCalled();
          const actions = store.getActions();
          expect(actions).toHaveLength(1);
          expect(actions[0]).toHaveProperty('type', ADD_ERRORS);
          done();
        }).catch(done.fail);
      });
    });

    describe('sendPutDataType', () => {
      it('when putDataType succeeds, should dispatch gotoRoute', (done) => {
        putDataType.mockImplementation(mockApi({ payload: DATA_TYPES }));
        store.dispatch(sendPutDataType(DATA_TYPES)).then(() => {
          expect(putDataType).toHaveBeenCalled();
          expect(gotoRoute).toHaveBeenCalledWith(ROUTE_DATA_MODEL_LIST);
          done();
        }).catch(done.fail);
      });

      it('when putDataType get error, should dispatch addError', (done) => {
        putDataType.mockImplementation(mockApi({ errors: true }));
        store.dispatch(sendPutDataType(DATA_TYPES)).then(() => {
          expect(putDataType).toHaveBeenCalled();
          const actions = store.getActions();
          expect(actions).toHaveLength(1);
          expect(actions[0]).toHaveProperty('type', ADD_ERRORS);
          done();
        }).catch(done.fail);
      });
    });

    describe('sendDeleteDataType', () => {
      it('when deleteDataType succeeds, should dispatch gotoRoute', (done) => {
        deleteDataType.mockImplementation(mockApi({ payload: 'AAA' }));
        store.dispatch(sendDeleteDataType('AAA')).then(() => {
          expect(deleteDataType).toHaveBeenCalled();
          expect(gotoRoute).toHaveBeenCalled();
          const actions = store.getActions();
          expect(actions[0]).toHaveProperty('type', REMOVE_DATA_TYPE);
          expect(actions[0]).toHaveProperty('payload', { dataTypeCode: 'AAA' });
          done();
        }).catch(done.fail);
      });

      it('when deleteDataType get error, should dispatch addError', (done) => {
        deleteDataType.mockImplementation(mockApi({ errors: true }));
        store.dispatch(sendDeleteDataType('AAA')).then(() => {
          expect(deleteDataType).toHaveBeenCalled();
          const actions = store.getActions();
          expect(actions[0]).toHaveProperty('type', ADD_ERRORS);
          done();
        }).catch(done.fail);
      });
    });

    describe('fetchDataType', () => {
      it('fetchDataType calls setSelectedDataType', (done) => {
        getDataType.mockImplementation(mockApi({ payload: DATA_TYPES }));
        store.dispatch(fetchDataType('AAA')).then(() => {
          const actions = store.getActions();
          expect(actions).toHaveLength(1);
          expect(actions[0]).toHaveProperty('type', SET_SELECTED_DATA_TYPE);
          expect(actions[0]).toHaveProperty('payload');
          expect(actions[0].payload).toMatchObject({ dataType: DATA_TYPES });
          done();
        }).catch(done.fail);
      });

      it('fetchDataType get error, should dispatch addError', (done) => {
        getDataType.mockImplementation(mockApi({ errors: true }));
        store.dispatch(fetchDataType('AAA')).then(() => {
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

    describe('fetchAttributeFromDataType', () => {
      it('fetchAttributeFromDataType calls setSelectedAttributeDataType', (done) => {
        store.dispatch(fetchAttributeFromDataType('AAA')).then(() => {
          const actions = store.getActions();
          expect(actions).toHaveLength(1);
          expect(actions[0]).toHaveProperty('type', SET_SELECTED_ATTRIBUTE_FOR_DATATYPE);
          done();
        }).catch(done.fail);
      });

      it('fetchAttributeFromDataType calls ADD_ERROR actions', (done) => {
        getAttributeFromDataType.mockImplementation(mockApi({ errors: true }));
        store.dispatch(fetchAttributeFromDataType('AAA')).then(() => {
          const actions = store.getActions();
          expect(actions).toHaveLength(1);
          expect(actions[0]).toHaveProperty('type', ADD_ERRORS);
          done();
        }).catch(done.fail);
      });
    });

    describe('sendPostAttributeFromDataType', () => {
      it('sendPostAttributeFromDataType calls goToRoute', (done) => {
        store.dispatch(sendPostAttributeFromDataType('AAA', {})).then(() => {
          expect(gotoRoute).toHaveBeenCalledWith(ROUTE_DATA_MODEL_LIST);
          done();
        }).catch(done.fail);
      });

      it('sendPostAttributeFromDataType calls ADD_ERROR actions', (done) => {
        postAttributeFromDataType.mockImplementation(mockApi({ errors: true }));
        store.dispatch(sendPostAttributeFromDataType('AAA')).then(() => {
          const actions = store.getActions();
          expect(actions).toHaveLength(1);
          expect(actions[0]).toHaveProperty('type', ADD_ERRORS);
          done();
        }).catch(done.fail);
      });
    });

    describe('sendPutAttributeFromDataType', () => {
      it('sendPutAttributeFromDataType calls goToRoute', (done) => {
        store.dispatch(sendPutAttributeFromDataType('AAA', {})).then(() => {
          expect(gotoRoute).toHaveBeenCalledWith(ROUTE_DATA_MODEL_LIST);
          done();
        }).catch(done.fail);
      });

      it('sendPutAttributeFromDataType calls ADD_ERROR actions', (done) => {
        putAttributeFromDataType.mockImplementation(mockApi({ errors: true }));
        store.dispatch(sendPutAttributeFromDataType('AAA')).then(() => {
          const actions = store.getActions();
          expect(actions).toHaveLength(1);
          expect(actions[0]).toHaveProperty('type', ADD_ERRORS);
          done();
        }).catch(done.fail);
      });
    });

    describe('sendDeleteAttributeFromDataType', () => {
      it('sendDeleteAttributeFromDataType calls setSelectedAttributeDataType', (done) => {
        store.dispatch(sendDeleteAttributeFromDataType('AAA', 'attr')).then(() => {
          const actions = store.getActions();
          expect(actions).toHaveLength(1);
          expect(actions[0]).toHaveProperty('type', REMOVE_ATTRIBUTE);
          expect(gotoRoute).toHaveBeenCalledWith(ROUTE_DATA_MODEL_LIST);
          done();
        }).catch(done.fail);
      });

      it('sendDeleteAttributeFromDataType calls ADD_ERROR actions', (done) => {
        deleteAttributeFromDataType.mockImplementation(mockApi({ errors: true }));
        store.dispatch(sendDeleteAttributeFromDataType('AAA', 'attr')).then(() => {
          const actions = store.getActions();
          expect(actions).toHaveLength(1);
          expect(actions[0]).toHaveProperty('type', ADD_ERRORS);
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
          expect(actions[0]).toHaveProperty('type', SET_SELECTED_ATTRIBUTE);
          expect(actions[0]).toHaveProperty('payload.attribute');
          expect(actions[0].payload.attribute).toMatchObject(DATA_TYPE_ATTRIBUTE);
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
