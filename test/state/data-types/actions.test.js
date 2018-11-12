import { isFSA } from 'flux-standard-action';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { METHODS } from '@entando/apimanager';
import { gotoRoute, getParams } from '@entando/router';
import { ADD_ERRORS, ADD_TOAST } from '@entando/messages';

import {
  ROUTE_DATA_TYPE_LIST,
  ROUTE_DATA_TYPE_EDIT,
  ROUTE_ATTRIBUTE_MONOLIST_ADD,
} from 'app-init/router';
import { mockApi } from 'test/testUtils';
import { SET_PAGE } from 'state/pagination/types';
import { TOGGLE_LOADING } from 'state/loading/types';

import {
  SET_DATA_TYPES,
  REMOVE_DATA_TYPE,
  SET_ATTRIBUTES,
  SET_SELECTED_DATA_TYPE,
  SET_SELECTED_ATTRIBUTE_FOR_DATATYPE,
  SET_SELECTED_ATTRIBUTE,
  REMOVE_ATTRIBUTE,
  MOVE_ATTRIBUTE_UP,
  MOVE_ATTRIBUTE_DOWN,
  SET_DATA_TYPE_REFERENCE_STATUS,
  SET_ACTION_MODE,
  REMOVE_ATTRIBUTE_FROM_COMPOSITE,
  SET_NEW_ATTRIBUTE_COMPOSITE,
} from 'state/data-types/types';
import {
  getDataTypeAttributesIdList,
  getDataTypeSelectedAttributeType,
  getActionModeDataTypeSelectedAttribute,
  getFormTypeValue,
  getAttributeSelectFromDataType,
} from 'state/data-types/selectors';
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
  sendPutAttributeFromDataTypeMonolist,
  sendDeleteAttributeFromDataType,
  setSelectedDataType,
  setDataTypeAttributes,
  setSelectedAttribute,
  fetchDataTypeAttributes,
  fetchDataTypeAttribute,
  sendMoveAttributeUp,
  sendMoveAttributeDown,
  setDataTypeReferenceStatus,
  fetchDataTypeReferenceStatus,
  sendPostDataTypeReferenceStatus,
  setActionMode,
  removeAttributeFromComposite,
  setNewAttributeComposite,
  handlerAttributeFromDataType,
  sendPostRefreshDataTypes,
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
  moveAttributeUp,
  moveAttributeDown,
  getDataTypesStatus,
  postDataTypesStatus,
  postRefreshDataTypes,
} from 'api/dataTypes';
import {
  DATA_TYPES,
  DATA_TYPES_OK_PAGE_1,
  DATA_TYPES_ATTRIBUTES,
  DATA_TYPE_ATTRIBUTE,
  ATTRIBUTE_MOVE_UP,
  ATTRIBUTE_MOVE_DOWN,
  DATA_TYPE_REFERENCES_STATUS,
  ATTRIBUTE_COMPOSITE,
  ATTRIBUTE_MONOLIST_COMPOSITE,

} from 'test/mocks/dataTypes';

import {
  TYPE_COMPOSITE,
  MODE_ADD_ATTRIBUTE_COMPOSITE,
  TYPE_TEXT,
  MODE_ADD,
  MODE_EDIT,
  MODE_ADD_COMPOSITE,
  MODE_EDIT_COMPOSITE,
  MODE_ADD_MONOLIST_ATTRIBUTE_COMPOSITE,
} from 'state/data-types/const';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const DATA_TYPES_MOCK = DATA_TYPES_OK_PAGE_1.payload;

const INITIAL_STATE = {};

jest.mock('state/data-types/selectors', () => ({
  getDataTypeAttributesIdList: jest.fn(),
  getDataTypeSelectedAttributeType: jest.fn(),
  getSelectedDataType: jest.fn().mockReturnValue({ code: 'dataType_code' }),
  getSelectedAttributeType: jest.fn(),
  getActionModeDataTypeSelectedAttribute: jest.fn(),
  getFormTypeValue: jest.fn(),
  getIsMonolistComposteAttributeType: jest.fn(),
  getMonolistAttributeType: jest.fn(),
  getAttributeSelectFromDataType: jest.fn(),
  getNewAttributeComposite: jest.fn(),
}));

getParams.mockReturnValue({ list: 'Monolist', datatypeCode: 'Monolist', entityCode: 'Monolist' });

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
  describe('setDataTypeReferenceStatus', () => {
    beforeEach(() => {
      action = setDataTypeReferenceStatus(DATA_TYPE_REFERENCES_STATUS);
    });
    it('is FSA compliant', () => {
      expect(isFSA(action)).toBe(true);
    });
    it('test setDataTypeReferenceStatus action sets the correct type', () => {
      expect(action.type).toBe(SET_DATA_TYPE_REFERENCE_STATUS);
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
  describe('setActionMode', () => {
    beforeEach(() => {
      action = setActionMode(MODE_ADD_ATTRIBUTE_COMPOSITE);
    });
    it('is FSA compliant', () => {
      expect(isFSA(action)).toBe(true);
    });
    it('test setActionMode action sets the correct type', () => {
      expect(action.type).toBe(SET_ACTION_MODE);
    });
  });
  describe('setActionMode', () => {
    beforeEach(() => {
      action = setActionMode(MODE_ADD_ATTRIBUTE_COMPOSITE);
    });
    it('is FSA compliant', () => {
      expect(isFSA(action)).toBe(true);
    });
    it('test setActionMode action sets the correct type', () => {
      expect(action.type).toBe(SET_ACTION_MODE);
    });
  });
  describe('removeAttributeFromComposite', () => {
    beforeEach(() => {
      action = removeAttributeFromComposite('code');
    });
    it('is FSA compliant', () => {
      expect(isFSA(action)).toBe(true);
    });
    it('test setActionMode action sets the correct type', () => {
      expect(action.type).toBe(REMOVE_ATTRIBUTE_FROM_COMPOSITE);
    });
  });
  describe('setNewAttributeComposite', () => {
    beforeEach(() => {
      action = setNewAttributeComposite(DATA_TYPES);
    });
    it('is FSA compliant', () => {
      expect(isFSA(action)).toBe(true);
    });
    it('test setActionMode action sets the correct type', () => {
      expect(action.type).toBe(SET_NEW_ATTRIBUTE_COMPOSITE);
    });
  });

  describe('thunk', () => {
    describe('fetchDataTypeReferenceStatus', () => {
      it('when fetchDataTypeReferenceStatus succeeds, should dispatch SET_DATA_TYPE_REFERENCE_STATUS', (done) => {
        getDataTypesStatus
          .mockImplementationOnce(mockApi({ payload: DATA_TYPE_REFERENCES_STATUS }));
        store.dispatch(fetchDataTypeReferenceStatus(DATA_TYPES)).then(() => {
          expect(getDataTypesStatus).toHaveBeenCalled();
          const actions = store.getActions();
          expect(actions[0]).toHaveProperty('type', SET_DATA_TYPE_REFERENCE_STATUS);
          expect(actions[0]).toHaveProperty('payload.dataTypeStatus', DATA_TYPE_REFERENCES_STATUS);

          done();
        }).catch(done.fail);
      });

      it('when fetchDataTypeReferenceStatus get error, should dispatch addError', (done) => {
        getDataTypesStatus.mockImplementationOnce(mockApi({ errors: true }));
        store.dispatch(fetchDataTypeReferenceStatus(DATA_TYPE_REFERENCES_STATUS)).then(() => {
          expect(getDataTypesStatus).toHaveBeenCalled();
          const actions = store.getActions();
          expect(actions).toHaveLength(1);
          expect(actions[0]).toHaveProperty('type', ADD_ERRORS);
          done();
        }).catch(done.fail);
      });
    });

    describe('sendPostDataTypeReferenceStatus', () => {
      const datatypesCodes = ['AAA'];
      it('when sendPostDataTypeReferenceStatus succeeds, should dispatch gotoRoute', (done) => {
        postDataTypesStatus
          .mockImplementationOnce(mockApi({ payload: { datatypesCodes } }));
        store.dispatch(sendPostDataTypeReferenceStatus({ datatypesCodes })).then(() => {
          expect(postDataTypesStatus).toHaveBeenCalled();
          expect(gotoRoute).toHaveBeenCalledWith(ROUTE_DATA_TYPE_LIST);
          done();
        }).catch(done.fail);
      });

      it('when sendPostDataTypeReferenceStatus get error, should dispatch addError', (done) => {
        postDataTypesStatus.mockImplementationOnce(mockApi({ errors: true }));
        store.dispatch(sendPostDataTypeReferenceStatus({ datatypesCodes })).then(() => {
          expect(postDataTypesStatus).toHaveBeenCalled();
          const actions = store.getActions();
          expect(actions).toHaveLength(1);
          expect(actions[0]).toHaveProperty('type', ADD_ERRORS);
          done();
        }).catch(done.fail);
      });
    });

    describe('sendPostRefreshDataTypes', () => {
      const payload = { code: 'AAA' };

      it('when sendPostRefreshDataTypes succeeds, show toast message', (done) => {
        postRefreshDataTypes.mockImplementationOnce(mockApi({ payload }));
        store.dispatch(sendPostRefreshDataTypes(payload)).then(() => {
          expect(postRefreshDataTypes).toHaveBeenCalled();
          const actions = store.getActions();
          expect(actions).toHaveLength(1);
          expect(actions[0]).toHaveProperty('type', ADD_TOAST);
          expect(actions[0].payload).toHaveProperty('type', 'success');
          done();
        }).catch(done.fail);
      });

      it('when postDataType get error, should dispatch addError', (done) => {
        postRefreshDataTypes.mockImplementationOnce(mockApi({ errors: true }));
        store.dispatch(sendPostRefreshDataTypes(payload)).then(() => {
          expect(postRefreshDataTypes).toHaveBeenCalled();
          const actions = store.getActions();
          expect(actions).toHaveLength(3);
          expect(actions[0]).toHaveProperty('type', ADD_ERRORS);
          expect(actions[1]).toHaveProperty('type', ADD_TOAST);
          expect(actions[1].payload).toHaveProperty('type', 'error');
          expect(actions[2]).toHaveProperty('type', CLEAR_ERRORS);
          done();
        }).catch(done.fail);
      });
    });

    describe('sendPostDataType', () => {
      it('when postDataType succeeds, should dispatch gotoRoute', (done) => {
        postDataType.mockImplementationOnce(mockApi({ payload: DATA_TYPES }));
        store.dispatch(sendPostDataType(DATA_TYPES)).then(() => {
          expect(postDataType).toHaveBeenCalled();
          done();
        }).catch(done.fail);
      });

      it('when postDataType get error, should dispatch addError', (done) => {
        postDataType.mockImplementationOnce(mockApi({ errors: true }));
        store.dispatch(sendPostDataType(DATA_TYPES)).then(() => {
          expect(postDataType).toHaveBeenCalled();
          const actions = store.getActions();
          expect(actions).toHaveLength(3);
          expect(actions[1]).toHaveProperty('type', ADD_TOAST);
          expect(actions[1].payload).toHaveProperty('type', 'error');
          done();
        }).catch(done.fail);
      });
    });

    describe('sendPutDataType', () => {
      it('when putDataType succeeds, should dispatch gotoRoute', (done) => {
        putDataType.mockImplementationOnce(mockApi({ payload: DATA_TYPES }));
        store.dispatch(sendPutDataType(DATA_TYPES)).then(() => {
          expect(putDataType).toHaveBeenCalled();
          expect(gotoRoute).toHaveBeenCalledWith(ROUTE_DATA_TYPE_LIST);
          done();
        }).catch(done.fail);
      });

      it('when putDataType get error, should dispatch addError', (done) => {
        putDataType.mockImplementationOnce(mockApi({ errors: true }));
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
        deleteDataType.mockImplementationOnce(mockApi({ payload: 'AAA' }));
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
        deleteDataType.mockImplementationOnce(mockApi({ errors: true }));
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
        getDataType.mockImplementationOnce(mockApi({ payload: DATA_TYPES }));
        store.dispatch(fetchDataType('AAA')).then(() => {
          const actions = store.getActions();
          expect(actions).toHaveLength(2);
          expect(actions[0]).toHaveProperty('type', SET_SELECTED_DATA_TYPE);
          expect(actions[0]).toHaveProperty('payload');
          expect(actions[0].payload).toMatchObject({ dataType: DATA_TYPES });
          done();
        }).catch(done.fail);
      });

      it('fetchDataType get error, should dispatch addError', (done) => {
        getDataType.mockImplementationOnce(mockApi({ errors: true }));
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
          expect(actions[2].type).toEqual(SET_PAGE);
          expect(actions[3].type).toEqual(TOGGLE_LOADING);
          done();
        }).catch(done.fail);
      });

      it('dataTypes is defined and properly valued', (done) => {
        getDataTypes.mockImplementationOnce(mockApi({ payload: DATA_TYPES_MOCK }));
        store.dispatch(fetchDataTypes()).then(() => {
          const actionPayload = store.getActions()[1].payload;
          expect(actionPayload.dataTypes).toHaveLength(2);
          const dataType = actionPayload.dataTypes[0];
          expect(dataType).toHaveProperty('name', 'dataType1');
          expect(dataType).toHaveProperty('code', 'ABC');
          expect(dataType).toHaveProperty('status', '0');
          done();
        }).catch(done.fail);
      });

      it('fetchDataTypes calls ADD_ERROR actions', (done) => {
        getDataTypes.mockImplementationOnce(mockApi({ errors: true }));
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
        getActionModeDataTypeSelectedAttribute.mockReturnValueOnce('edit');
        getAttributeFromDataType.mockImplementationOnce(mockApi({ payload: DATA_TYPES }));
        store.dispatch(fetchAttributeFromDataType('attribute', 'AAA', 'Text')).then(() => {
          expect(getAttributeFromDataType).toHaveBeenCalled();
          const actions = store.getActions();
          expect(actions).toHaveLength(2);
          expect(actions[0]).toHaveProperty('type', '@@redux-form/INITIALIZE');
          expect(actions[1]).toHaveProperty('type', SET_SELECTED_ATTRIBUTE_FOR_DATATYPE);
          done();
        }).catch(done.fail);
      });

      it('fetchAttributeFromDataType calls ADD_ERROR actions', (done) => {
        getAttributeFromDataType.mockImplementationOnce(mockApi({ errors: true }));
        store.dispatch(fetchAttributeFromDataType('AAA')).then(() => {
          expect(getAttributeFromDataType).toHaveBeenCalled();
          const actions = store.getActions();
          expect(actions).toHaveLength(1);
          expect(actions[0]).toHaveProperty('type', ADD_ERRORS);
          done();
        }).catch(done.fail);
      });
    });

    describe('sendPostAttributeFromDataType', () => {
      it('sendPostAttributeFromDataType calls goToRoute ROUTE_ATTRIBUTE_MONOLIST_ADD', (done) => {
        getDataTypeSelectedAttributeType.mockReturnValue({ code: 'Monolist' });
        store.dispatch(sendPostAttributeFromDataType({ code: 'AAA' })).then(() => {
          expect(postAttributeFromDataType).toHaveBeenCalled();
          expect(gotoRoute).toHaveBeenCalledWith(ROUTE_ATTRIBUTE_MONOLIST_ADD, {
            entityCode: 'Monolist',
            attributeCode: 'AAA',
          });
          done();
        }).catch(done.fail);
      });

      it('sendPostAttributeFromDataType calls goToRoute ROUTE_DATA_TYPE_EDIT', (done) => {
        getDataTypeSelectedAttributeType.mockReturnValue(null);
        store.dispatch(sendPostAttributeFromDataType({ code: 'AAA' })).then(() => {
          expect(postAttributeFromDataType).toHaveBeenCalled();
          expect(gotoRoute).toHaveBeenCalledWith(ROUTE_DATA_TYPE_EDIT, {
            datatypeCode: 'Monolist',
          });
          done();
        }).catch(done.fail);
      });

      it('sendPostAttributeFromDataType calls ADD_ERROR actions', (done) => {
        postAttributeFromDataType.mockImplementationOnce(mockApi({ errors: true }));
        store.dispatch(sendPostAttributeFromDataType('AAA')).then(() => {
          const actions = store.getActions();
          expect(actions).toHaveLength(1);
          expect(actions[0]).toHaveProperty('type', ADD_ERRORS);
          done();
        }).catch(done.fail);
      });
    });

    describe('sendPutAttributeFromDataType', () => {
      it('sendPutAttributeFromDataType calls goToRoute ROUTE_ATTRIBUTE_MONOLIST_ADD', (done) => {
        putAttributeFromDataType.mockImplementationOnce(mockApi({ payload: { type: 'Monolist' } }));
        store.dispatch(sendPutAttributeFromDataType({ code: 'AAA' })).then(() => {
          expect(putAttributeFromDataType).toHaveBeenCalled();
          expect(gotoRoute).toHaveBeenCalledWith(ROUTE_ATTRIBUTE_MONOLIST_ADD, {
            entityCode: 'Monolist',
            attributeCode: 'AAA',
          });
          done();
        }).catch(done.fail);
      });

      it('sendPutAttributeFromDataType calls goToRoute ROUTE_DATA_TYPE_EDIT', (done) => {
        getParams.mockReturnValue({ entityCode: 'Monotext' });
        putAttributeFromDataType.mockImplementationOnce(mockApi({ payload: { type: 'Monotext' } }));
        store.dispatch(sendPutAttributeFromDataType({ code: 'AAA' })).then(() => {
          expect(putAttributeFromDataType).toHaveBeenCalled();
          expect(gotoRoute).toHaveBeenCalledWith(ROUTE_DATA_TYPE_EDIT, {
            datatypeCode: 'Monotext',
          });
          done();
        }).catch(done.fail);
      });

      it('sendPutAttributeFromDataType calls ADD_ERROR actions', (done) => {
        putAttributeFromDataType.mockImplementationOnce(mockApi({ errors: true }));
        store.dispatch(sendPutAttributeFromDataType('AAA')).then(() => {
          const actions = store.getActions();
          expect(actions).toHaveLength(1);
          expect(actions[0]).toHaveProperty('type', ADD_ERRORS);
          done();
        }).catch(done.fail);
      });
    });

    describe('sendPutAttributeFromDataTypeMonolist', () => {
      it('sendPutAttributeFromDataTypeMonolist calls goToRoute ROUTE_DATA_TYPE_EDIT', (done) => {
        getParams.mockReturnValue({ entityCode: 'Monolist' });
        putAttributeFromDataType.mockImplementationOnce(mockApi({ payload: { type: 'Monolist' } }));
        store.dispatch(sendPutAttributeFromDataTypeMonolist({ code: 'AAA' })).then(() => {
          expect(putAttributeFromDataType).toHaveBeenCalled();
          expect(gotoRoute).toHaveBeenCalledWith(ROUTE_DATA_TYPE_EDIT, {
            datatypeCode: 'Monolist',
          });
          done();
        }).catch(done.fail);
      });

      it('sendPutAttributeFromDataTypeMonolist calls ADD_ERROR actions', (done) => {
        putAttributeFromDataType.mockImplementationOnce(mockApi({ errors: true }));
        store.dispatch(sendPutAttributeFromDataTypeMonolist('AAA')).then(() => {
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
          done();
        }).catch(done.fail);
      });

      it('sendDeleteAttributeFromDataType calls ADD_ERROR actions', (done) => {
        deleteAttributeFromDataType.mockImplementationOnce(mockApi({ errors: true }));
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
        getDataTypeAttributes.mockImplementationOnce(mockApi({ payload: DATA_TYPES_ATTRIBUTES }));
        store.dispatch(fetchDataTypeAttributes()).then(() => {
          const actions = store.getActions();
          expect(actions).toHaveLength(3);
          expect(actions[0]).toHaveProperty('type', TOGGLE_LOADING);
          expect(actions[1]).toHaveProperty('type', SET_ATTRIBUTES);
          expect(actions[1]).toHaveProperty('payload');
          expect(actions[1]).toHaveProperty('payload.attributes');
          expect(actions[1]).toHaveProperty('payload.attributes', DATA_TYPES_ATTRIBUTES);
          expect(actions[2]).toHaveProperty('type', TOGGLE_LOADING);
          done();
        }).catch(done.fail);
      });

      it('fetchDataTypeAttributes not call setAttributes actions', (done) => {
        getDataTypeAttributesIdList.mockReturnValue(DATA_TYPES_ATTRIBUTES);
        getDataTypeAttributes.mockImplementationOnce(mockApi({ payload: DATA_TYPES_ATTRIBUTES }));
        store.dispatch(fetchDataTypeAttributes()).then(() => {
          const actions = store.getActions();
          expect(actions).toHaveLength(2);
          expect(actions[0]).toHaveProperty('type', TOGGLE_LOADING);
          expect(actions[1]).toHaveProperty('type', TOGGLE_LOADING);
          done();
        }).catch(done.fail);
      });

      it('fetchDataTypeAttributes calls ADD_ERROR actions', (done) => {
        getDataTypeAttributes.mockImplementationOnce(mockApi({ errors: true }));
        store.dispatch(fetchDataTypeAttributes()).then(() => {
          const actions = store.getActions();
          expect(actions).toHaveLength(3);
          expect(actions[0]).toHaveProperty('type', TOGGLE_LOADING);
          expect(actions[1]).toHaveProperty('type', ADD_ERRORS);
          expect(actions[2]).toHaveProperty('type', TOGGLE_LOADING);
          done();
        }).catch(done.fail);
      });
    });

    describe('fetchDataTypeAttribute', () => {
      it('fetchDataTypeAttribute calls setSelectedAttribute action', (done) => {
        getDataTypeAttribute.mockImplementationOnce(mockApi({ payload: DATA_TYPE_ATTRIBUTE }));
        store.dispatch(fetchDataTypeAttribute()).then(() => {
          const actions = store.getActions();
          expect(actions).toHaveLength(1);
          expect(actions[0]).toHaveProperty('type', SET_SELECTED_ATTRIBUTE);
          expect(actions[0]).toHaveProperty('payload.attribute');
          expect(actions[0].payload.attribute)
            .toMatchObject(expect.objectContaining(DATA_TYPE_ATTRIBUTE));
          done();
        }).catch(done.fail);
      });

      it('not call goToRoute if attribute is Composite and actionMode is AddCompositeAttribute ', (done) => {
        const ROUTE = { route: 'mocked_route', params: 'mocked_params' };

        getFormTypeValue.mockReturnValue(TYPE_COMPOSITE);
        getActionModeDataTypeSelectedAttribute.mockReturnValue(MODE_ADD_ATTRIBUTE_COMPOSITE);
        store.dispatch(fetchDataTypeAttribute('TYPE_COMPOSITE', ROUTE, TYPE_COMPOSITE)).then(() => {
          expect(getDataTypeAttribute).not.toHaveBeenCalled();
          const actions = store.getActions();
          expect(actions).toHaveLength(1);
          expect(actions[0]).toHaveProperty('type', SET_ACTION_MODE);
          expect(actions[0]).toHaveProperty('payload', { actionMode: MODE_ADD_ATTRIBUTE_COMPOSITE });
          done();
        }).catch(done.fail);
      });

      it('dispatch initialize if actionMode is AddCompositeAttribute ', (done) => {
        const ROUTE = { route: 'mocked_route', params: 'mocked_params' };
        getDataTypeAttribute.mockImplementationOnce(mockApi({ payload: DATA_TYPE_ATTRIBUTE }));
        getActionModeDataTypeSelectedAttribute.mockReturnValue(MODE_ADD_ATTRIBUTE_COMPOSITE);
        getFormTypeValue.mockReturnValueOnce(TYPE_COMPOSITE);
        store.dispatch(fetchDataTypeAttribute('attribute_code', ROUTE)).then(() => {
          const actions = store.getActions(MODE_ADD_ATTRIBUTE_COMPOSITE);
          expect(getDataTypeAttribute).toHaveBeenCalled();
          expect(actions).toHaveLength(2);
          expect(actions[0]).toHaveProperty('type', SET_SELECTED_ATTRIBUTE);
          expect(actions[1]).toHaveProperty('type', '@@redux-form/INITIALIZE');
          done();
        }).catch(done.fail);
      });

      it('fetchDataTypeAttribute calls gotoRoute if route exists', (done) => {
        const ROUTE = { route: 'mocked_route', params: 'mocked_params' };
        getDataTypeAttribute.mockImplementation(mockApi({ payload: DATA_TYPE_ATTRIBUTE }));
        getActionModeDataTypeSelectedAttribute.mockReturnValue(MODE_ADD);
        store.dispatch(fetchDataTypeAttribute('attribute_code', ROUTE)).then(() => {
          expect(gotoRoute).toHaveBeenCalledWith('mocked_route', 'mocked_params');
          done();
        }).catch(done.fail);
      });

      it('fetchDataTypeAttribute calls ADD_ERROR action', (done) => {
        getDataTypeAttribute.mockImplementationOnce(mockApi({ errors: true }));
        store.dispatch(fetchDataTypeAttribute()).then(() => {
          const actions = store.getActions();
          expect(actions).toHaveLength(1);
          expect(actions[0]).toHaveProperty('type', ADD_ERRORS);
          done();
        }).catch(done.fail);
      });
    });

    describe('sendMoveAttributeUp', () => {
      it('sendMoveAttributeUp calls moveAttributeUpSync actions', (done) => {
        moveAttributeUp.mockImplementationOnce(mockApi({ payload: ATTRIBUTE_MOVE_UP }));
        store.dispatch(sendMoveAttributeUp('attributeCode')).then(() => {
          const actions = store.getActions();
          expect(actions).toHaveLength(1);
          expect(actions[0]).toHaveProperty('type', MOVE_ATTRIBUTE_UP);
          done();
        }).catch(done.fail);
      });

      it('sendMoveAttributeUp calls ADD_ERROR actions', (done) => {
        moveAttributeUp.mockImplementationOnce(mockApi({ errors: true }));
        store.dispatch(sendMoveAttributeUp({ attributeCode: 'attr_code', attributeIndex: 1 })).then(() => {
          const actions = store.getActions();
          expect(actions).toHaveLength(1);
          expect(actions[0]).toHaveProperty('type', ADD_ERRORS);
          done();
        }).catch(done.fail);
      });
    });

    describe('sendMoveAttributeDown', () => {
      it('sendMoveAttributeDown calls moveAttributeUpSync actions', (done) => {
        moveAttributeDown.mockImplementationOnce(mockApi({ payload: ATTRIBUTE_MOVE_DOWN }));
        store.dispatch(sendMoveAttributeDown('attributeCode')).then(() => {
          const actions = store.getActions();
          expect(actions).toHaveLength(1);
          expect(actions[0]).toHaveProperty('type', MOVE_ATTRIBUTE_DOWN);
          done();
        }).catch(done.fail);
      });

      it('sendMoveAttributeDown calls ADD_ERROR actions', (done) => {
        moveAttributeDown.mockImplementationOnce(mockApi({ errors: true }));
        store.dispatch(sendMoveAttributeDown({ attributeCode: 'attr_code', attributeIndex: 1 })).then(() => {
          const actions = store.getActions();
          expect(actions).toHaveLength(1);
          expect(actions[0]).toHaveProperty('type', ADD_ERRORS);
          done();
        }).catch(done.fail);
      });
    });
  });
  describe('handlerAttributeFromDataType', () => {
    const { allowedRoles } = DATA_TYPE_ATTRIBUTE;
    describe('action POST', () => {
      it('default action', (done) => {
        postAttributeFromDataType.mockImplementationOnce(mockApi({ }));
        getAttributeSelectFromDataType.mockReturnValueOnce(TYPE_TEXT);
        store.dispatch(handlerAttributeFromDataType(
          METHODS.POST,
          DATA_TYPE_ATTRIBUTE,
          allowedRoles,
        ));
        const actions = store.getActions();
        expect(actions).toHaveLength(1);
        expect(actions[0]).toHaveProperty('type', SET_ACTION_MODE);
        expect(actions[0]).toHaveProperty('payload', { actionMode: MODE_ADD });
        expect(postAttributeFromDataType).toHaveBeenCalled();
        done();
      });

      it('action add sub attribute to Composite attribute', (done) => {
        postAttributeFromDataType.mockImplementationOnce(mockApi({ }));
        getAttributeSelectFromDataType.mockReturnValueOnce(ATTRIBUTE_COMPOSITE);
        store.dispatch(handlerAttributeFromDataType(
          METHODS.POST,
          DATA_TYPE_ATTRIBUTE,
          allowedRoles,
        ));
        const actions = store.getActions();
        expect(actions).toHaveLength(2);
        expect(actions[0]).toHaveProperty('type', SET_ACTION_MODE);
        expect(actions[0]).toHaveProperty('payload', { actionMode: MODE_ADD });
        expect(actions[1]).toHaveProperty('type', SET_ACTION_MODE);
        expect(actions[1]).toHaveProperty('payload', { actionMode: MODE_ADD_COMPOSITE });
        expect(putAttributeFromDataType).toHaveBeenCalled();
        done();
      });

      it('action new Composite attribute', () => {
        postAttributeFromDataType.mockImplementationOnce(mockApi({ }));
        getAttributeSelectFromDataType.mockReturnValueOnce(DATA_TYPE_ATTRIBUTE);
        store.dispatch(handlerAttributeFromDataType(
          METHODS.POST,
          ATTRIBUTE_COMPOSITE,
          allowedRoles,
        ));
        const actions = store.getActions();
        expect(actions).toHaveLength(3);
        expect(actions[0]).toHaveProperty('type', SET_ACTION_MODE);
        expect(actions[0]).toHaveProperty('payload', { actionMode: MODE_ADD });
        expect(actions[1]).toHaveProperty('type', SET_ACTION_MODE);
        expect(actions[1]).toHaveProperty('payload', { actionMode: MODE_ADD_COMPOSITE });
        expect(actions[2]).toHaveProperty('type', SET_NEW_ATTRIBUTE_COMPOSITE);
      });

      it('action new Monolist Composite attribute', () => {
        postAttributeFromDataType.mockImplementationOnce(mockApi({ }));
        getAttributeSelectFromDataType.mockReturnValueOnce(DATA_TYPE_ATTRIBUTE);
        store.dispatch(handlerAttributeFromDataType(
          METHODS.POST,
          ATTRIBUTE_MONOLIST_COMPOSITE,
          allowedRoles,
        ));
        const actions = store.getActions();
        expect(actions).toHaveLength(4);
        expect(actions[0]).toHaveProperty('type', SET_ACTION_MODE);
        expect(actions[0]).toHaveProperty('payload', { actionMode: MODE_ADD });
        expect(actions[1]).toHaveProperty('type', SET_ACTION_MODE);
        expect(actions[1]).toHaveProperty('payload', { actionMode: MODE_ADD_COMPOSITE });
        expect(actions[2]).toHaveProperty('type', SET_NEW_ATTRIBUTE_COMPOSITE);
        expect(actions[3]).toHaveProperty('type', SET_ACTION_MODE);
        expect(actions[3]).toHaveProperty('payload', { actionMode: MODE_ADD_MONOLIST_ATTRIBUTE_COMPOSITE });
        expect(gotoRoute).toHaveBeenCalledWith(ROUTE_ATTRIBUTE_MONOLIST_ADD, {
          attributeCode: 'mlstc', entityCode: 'Monolist',
        });
      });
    });

    describe('action PUT', () => {
      it('default action', (done) => {
        putAttributeFromDataType.mockImplementationOnce(mockApi({ }));
        getAttributeSelectFromDataType.mockReturnValue(TYPE_TEXT);
        store.dispatch(handlerAttributeFromDataType(
          METHODS.PUT,
          DATA_TYPE_ATTRIBUTE,
          allowedRoles,
        ));
        const actions = store.getActions();
        expect(actions).toHaveLength(1);
        expect(actions[0]).toHaveProperty('type', SET_ACTION_MODE);
        expect(actions[0]).toHaveProperty('payload', { actionMode: MODE_EDIT });
        expect(putAttributeFromDataType).toHaveBeenCalled();
        done();
      });

      it('Composite attribute', (done) => {
        getAttributeSelectFromDataType.mockReturnValueOnce(ATTRIBUTE_COMPOSITE);
        store.dispatch(handlerAttributeFromDataType(
          METHODS.PUT,
          ATTRIBUTE_COMPOSITE,
          allowedRoles,
        ));
        const actions = store.getActions();
        expect(actions).toHaveLength(2);
        expect(actions[0]).toHaveProperty('type', SET_ACTION_MODE);
        expect(actions[0]).toHaveProperty('payload', { actionMode: MODE_EDIT });
        expect(actions[1]).toHaveProperty('type', SET_ACTION_MODE);
        expect(actions[1]).toHaveProperty('payload', { actionMode: MODE_EDIT_COMPOSITE });
        done();
      });

      it('Composite attribute is mode is MODE_EDIT_COMPOSITE call sendPutAttributeFromDataType', (done) => {
        putAttributeFromDataType.mockImplementationOnce(mockApi({ }));
        getAttributeSelectFromDataType.mockReturnValueOnce(ATTRIBUTE_COMPOSITE);
        store.dispatch(handlerAttributeFromDataType(
          METHODS.PUT,
          ATTRIBUTE_COMPOSITE,
          allowedRoles,
          MODE_EDIT_COMPOSITE,
        ));
        const actions = store.getActions();
        expect(actions).toHaveLength(2);
        expect(actions[0]).toHaveProperty('type', SET_ACTION_MODE);
        expect(actions[0]).toHaveProperty('payload', { actionMode: MODE_EDIT });
        expect(putAttributeFromDataType).toHaveBeenCalled();
        expect(actions[1]).toHaveProperty('type', SET_ACTION_MODE);
        expect(actions[1]).toHaveProperty('payload', { actionMode: MODE_EDIT_COMPOSITE });
        done();
      });

      it('if mode MODE_ADD_ATTRIBUTE_COMPOSITE dispatch setActionMode and sendPutAttributeFromDataType', (done) => {
        putAttributeFromDataType.mockImplementationOnce(mockApi({ }));
        getAttributeSelectFromDataType.mockReturnValueOnce(ATTRIBUTE_COMPOSITE);
        store.dispatch(handlerAttributeFromDataType(
          METHODS.PUT,
          DATA_TYPE_ATTRIBUTE,
          allowedRoles,
          MODE_ADD_ATTRIBUTE_COMPOSITE,
        ));
        const actions = store.getActions();
        expect(actions).toHaveLength(2);
        expect(actions[0]).toHaveProperty('type', SET_ACTION_MODE);
        expect(actions[0]).toHaveProperty('payload', { actionMode: MODE_EDIT });
        expect(actions[1]).toHaveProperty('type', SET_ACTION_MODE);
        expect(actions[1]).toHaveProperty('payload', { actionMode: MODE_EDIT_COMPOSITE });
        expect(putAttributeFromDataType).toHaveBeenCalled();
        done();
      });
    });
  });
});
