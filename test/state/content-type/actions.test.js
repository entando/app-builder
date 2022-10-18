import { isFSA } from 'flux-standard-action';
import { configEnzymeAdapter, createMockHistory } from 'test/legacyTestUtils';
import {
  mockApi,
  createMockStore,
} from 'test/testUtils';

import { METHODS } from '@entando/apimanager';

import { SET_PAGE } from 'state/pagination/types';

import {
  SET_CONTENT_TYPES,
  SET_SELECTED_CONTENT_TYPE,
  SET_SELECTED_ATTRIBUTE_FOR_CONTENTTYPE,
  SET_SELECTED_ATTRIBUTE,
  PUSH_PARENT_SELECTED_ATTRIBUTE,
  REMOVE_ATTRIBUTE,
  MOVE_ATTRIBUTE_UP,
  MOVE_ATTRIBUTE_DOWN,
  SET_ACTION_MODE,
  REMOVE_ATTRIBUTE_FROM_COMPOSITE,
  SET_NEW_ATTRIBUTE_COMPOSITE,
  SET_SELECTED_NESTED_ATTRIBUTE,
} from 'state/content-type/types';
import {
  getContentTypeSelectedAttributeType,
  getActionModeContentTypeSelectedAttribute,
  getFormTypeValue,
  getAttributeSelectFromContentType,
  getNewAttributeComposite,
} from 'state/content-type/selectors';
import {
  setContentTypeList,
  fetchContentType,
  fetchContentTypeListPaged,
  fetchAttributeFromContentType,
  sendPostAttributeFromContentType,
  sendPutAttributeFromContentType,
  sendPutAttributeFromContentTypeMonolist,
  sendDeleteAttributeFromContentType,
  setSelectedContentType,
  clearSelectedContentType,
  setSelectedAttributeRef,
  fetchContentTypeAttributeRef,
  sendMoveAttributeUp,
  sendMoveAttributeDown,
  setActionMode,
  removeAttributeFromComposite,
  setNewAttributeComposite,
  handlerAttributeFromContentType,
  setSelectedNestedAttribute,
  fetchNestedAttribute,
} from 'state/content-type/actions';
import {
  getContentType,
  getContentTypes,
  getAttributeFromContentType,
  postAttributeFromContentType,
  putAttributeFromContentType,
  deleteAttributeFromContentType,
  getContentTypeAttribute,
  moveAttributeUp,
  moveAttributeDown,
} from 'api/contentTypes';
import {
  GET_CONTENT_TYPE_RESPONSE_OK,
  GET_CONTENT_TYPES_RESPONSE_OK,
  CONTENT_TYPES_OK_PAGE,
  CONTENT_TYPE_ATTRIBUTE,
  ATTRIBUTE_MOVE_UP,
  ATTRIBUTE_MOVE_DOWN,
  ATTRIBUTE_COMPOSITE,
  ATTRIBUTE_MONOLIST_COMPOSITE,
} from 'test/mocks/contentType';

import {
  TYPE_COMPOSITE,
  MODE_ADD_ATTRIBUTE_COMPOSITE,
  TYPE_TEXT,
  MODE_ADD,
  MODE_EDIT,
  MODE_ADD_COMPOSITE,
  MODE_EDIT_COMPOSITE,
  MODE_ADD_MONOLIST_ATTRIBUTE_COMPOSITE,
} from 'state/content-type/const';

jest.mock('app-init/router', () => {
  const {
    ROUTE_CMS_CONTENTTYPE_EDIT,
    ROUTE_CMS_CONTENT_TYPE_ATTRIBUTE_MONOLIST_ADD,
    ROUTE_CMS_CONTENT_TYPE_ATTRIBUTE_EDIT,
  } = require.requireActual('app-init/router');
  return {
    ROUTE_CMS_CONTENTTYPE_EDIT,
    ROUTE_CMS_CONTENT_TYPE_ATTRIBUTE_MONOLIST_ADD,
    ROUTE_CMS_CONTENT_TYPE_ATTRIBUTE_EDIT,
    history: {
      push: jest.fn(),
    },
  };
});

jest.mock('api/contentTypes', () => ({
  getContentType: jest.fn(mockApi({ payload: {} })),
  getContentTypes: jest.fn(mockApi({ payload: [] })),
  getAttributeFromContentType: jest.fn(mockApi({ payload: {} })),
  postAttributeFromContentType: jest.fn(mockApi({ payload: {} })),
  putAttributeFromContentType: jest.fn(mockApi({ payload: {} })),
  deleteAttributeFromContentType: jest.fn(mockApi({ payload: {} })),
  getContentTypeAttributes: jest.fn(mockApi({ payload: [] })),
  getContentTypeAttribute: jest.fn(mockApi({ payload: {} })),
  moveAttributeUp: jest.fn(mockApi({ payload: {} })),
  moveAttributeDown: jest.fn(mockApi({ payload: {} })),
}));

jest.mock('state/content-type/selectors', () => ({
  getContentTypeAttributesIdList: jest.fn(),
  getContentTypeSelectedAttributeType: jest.fn(),
  getSelectedContentType: jest.fn().mockReturnValue({ code: 'ContentType_code' }),
  getSelectedAttributeType: jest.fn(),
  getActionModeContentTypeSelectedAttribute: jest.fn(),
  getContentTypeSelectedAttribute: jest.fn(),
  getFormTypeValue: jest.fn(),
  getIsMonolistCompositeAttributeType: jest.fn(),
  getMonolistAttributeType: jest.fn(),
  getAttributeSelectFromContentType: jest.fn(),
  getNewAttributeComposite: jest.fn(),
}));

configEnzymeAdapter();

const ADD_ERRORS = 'errors/add-errors';

const CONTENT_TYPES_MOCK = CONTENT_TYPES_OK_PAGE.payload;

const INITIAL_STATE = {};

describe('state/content-type/actions ', () => {
  let store;
  let action;
  beforeEach(() => {
    store = createMockStore(INITIAL_STATE);
    jest.clearAllMocks();
  });

  describe('setContentTypeList', () => {
    beforeEach(() => {
      action = setContentTypeList(CONTENT_TYPES_MOCK);
    });
    it('is FSA compliant', () => {
      expect(isFSA(action)).toBe(true);
    });
    it('test setContentTypeList action sets the correct type', () => {
      expect(action.type).toBe(SET_CONTENT_TYPES);
    });
  });
  describe('setSelectedContentType', () => {
    beforeEach(() => {
      action = setSelectedContentType('AAA');
    });
    it('is FSA compliant', () => {
      expect(isFSA(action)).toBe(true);
    });
    it('test setSelectedContentType action sets the correct type', () => {
      expect(action.type).toBe(SET_SELECTED_CONTENT_TYPE);
    });
  });
  describe('clearSelectedContentType', () => {
    it('test clearSelectedContentType action', () => {
      action = clearSelectedContentType();
      expect(action.type).toBe(SET_SELECTED_CONTENT_TYPE);
      expect(action.payload).toEqual({ contentType: {} });
    });
  });
  describe('setSelectedAttributeRef', () => {
    beforeEach(() => {
      action = setSelectedAttributeRef(CONTENT_TYPE_ATTRIBUTE);
    });
    it('is FSA compliant', () => {
      expect(isFSA(action)).toBe(true);
    });
    it('test setSelectedAttributeRef action sets the correct type', () => {
      expect(action.type).toBe(SET_SELECTED_ATTRIBUTE);
    });
  });
  describe('setSelectedNestedAttribute', () => {
    beforeEach(() => {
      action = setSelectedNestedAttribute(CONTENT_TYPE_ATTRIBUTE);
    });
    it('is FSA compliant', () => {
      expect(isFSA(action)).toBe(true);
    });
    it('test setSelectedNestedAttribute action sets the correct type', () => {
      expect(action.type).toBe(SET_SELECTED_NESTED_ATTRIBUTE);
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
      action = setNewAttributeComposite(GET_CONTENT_TYPE_RESPONSE_OK);
    });
    it('is FSA compliant', () => {
      expect(isFSA(action)).toBe(true);
    });
    it('test setActionMode action sets the correct type', () => {
      expect(action.type).toBe(SET_NEW_ATTRIBUTE_COMPOSITE);
    });
  });

  describe('thunk', () => {
    describe('fetchContentType', () => {
      it('fetchContentType calls setSelectedContentType', (done) => {
        getContentType.mockImplementationOnce(mockApi({ payload: GET_CONTENT_TYPES_RESPONSE_OK }));
        store
          .dispatch(fetchContentType('AAA'))
          .then(() => {
            const actions = store.getActions();
            expect(actions).toHaveLength(2);
            expect(actions[0]).toHaveProperty('type', SET_SELECTED_CONTENT_TYPE);
            expect(actions[0]).toHaveProperty('payload');
            expect(actions[0].payload).toMatchObject({
              contentType: GET_CONTENT_TYPES_RESPONSE_OK,
            });
            done();
          })
          .catch(done.fail);
      });

      it('fetchContentType get error, should dispatch addError', (done) => {
        getContentType.mockImplementationOnce(mockApi({ errors: true }));
        store
          .dispatch(fetchContentType('AAA'))
          .catch(() => {
            const actions = store.getActions();
            expect(actions).toHaveLength(1);
            expect(actions[0]).toHaveProperty('type', ADD_ERRORS);
            done();
          });
      });
    });

    describe('fetchNestedAttribute', () => {
      it('fetchNestedAttribute calls setSelectedNestedAttribute', (done) => {
        getContentTypeAttribute.mockImplementationOnce(mockApi({
          payload: GET_CONTENT_TYPES_RESPONSE_OK,
        }));
        store
          .dispatch(fetchNestedAttribute('AAA', 'BBB'))
          .then(() => {
            const actions = store.getActions();
            expect(actions).toHaveLength(1);
            expect(actions[0]).toHaveProperty('type', SET_SELECTED_NESTED_ATTRIBUTE);
            expect(actions[0]).toHaveProperty('payload');
            done();
          })
          .catch(done.fail);
      });
    });

    describe('fetchContentTypeListPaged', () => {
      it('fetchContentTypeListPaged calls fetchContentTypeListPaged and setPage actions', (done) => {
        store
          .dispatch(fetchContentTypeListPaged())
          .then(() => {
            const actions = store.getActions();
            expect(actions).toHaveLength(4);
            expect(actions[1].type).toEqual(SET_CONTENT_TYPES);
            expect(actions[2].type).toEqual(SET_PAGE);
            done();
          })
          .catch(done.fail);
      });

      it('ContentTypes is defined and properly valued', (done) => {
        getContentTypes.mockImplementationOnce(mockApi({ payload: CONTENT_TYPES_MOCK }));
        store
          .dispatch(fetchContentTypeListPaged())
          .then(() => {
            const actions = store.getActions();
            const actionPayload = actions[1].payload;
            expect(actionPayload.list).toHaveLength(2);
            const ContentType = actionPayload.list[0];
            expect(ContentType).toHaveProperty('name', 'contentType1');
            expect(ContentType).toHaveProperty('code', 'ABC');
            expect(ContentType).toHaveProperty('status', '0');
            done();
          })
          .catch(done.fail);
      });

      it('fetchContentTypeListPaged calls ADD_ERROR actions', (done) => {
        getContentTypes.mockImplementationOnce(mockApi({ errors: true }));
        store
          .dispatch(fetchContentTypeListPaged())
          .then(() => {
            const actions = store.getActions();
            expect(actions).toHaveLength(3);
            expect(actions[1]).toHaveProperty('type', ADD_ERRORS);
            done();
          })
          .catch(done.fail);
      });
    });

    describe('fetchAttributeFromContentType', () => {
      it('fetchAttributeFromContentType calls setSelectedContentTypeAttribute', (done) => {
        getActionModeContentTypeSelectedAttribute.mockReturnValueOnce('edit');
        getAttributeFromContentType.mockImplementationOnce(mockApi({
          payload: GET_CONTENT_TYPES_RESPONSE_OK,
        }));
        store
          .dispatch(fetchAttributeFromContentType('attribute', 'AAA', 'Text'))
          .then(() => {
            expect(getAttributeFromContentType).toHaveBeenCalled();
            const actions = store.getActions();
            expect(actions).toHaveLength(2);
            expect(actions[0]).toHaveProperty('type', '@@redux-form/INITIALIZE');
            expect(actions[1]).toHaveProperty('type', SET_SELECTED_ATTRIBUTE_FOR_CONTENTTYPE);
            done();
          })
          .catch(done.fail);
      });

      it('fetchAttributeFromContentType with type date', (done) => {
        const rangeStartDate = new Date();
        rangeStartDate.setDate(rangeStartDate.getDate() - 1);
        const rangeEndDate = new Date();
        rangeEndDate.setDate(rangeEndDate.getDate() + 1);
        const equalDate = new Date();
        const ATTRIBUTE_TYPE_DATE = {
          code: 'mlstc',
          type: 'Date',
          name: 'Just a date',
          roles: [{ code: 'aw' }, { code: 'wa' }],
          disablingCodes: [],
          mandatory: true,
          listFilter: false,
          indexable: false,
          enumeratorStaticItems: null,
          enumeratorStaticItemsSeparator: null,
          enumeratorExtractorBean: null,
          validationRules: {
            rangeStartDate,
            rangeEndDate,
            equalDate,
            rangeStartDateAttribute: rangeStartDate,
            rangeEndDateAttribute: rangeEndDate,
            equalDateAttribute: equalDate,
          },
        };
        getAttributeFromContentType.mockImplementationOnce(mockApi({
          payload: ATTRIBUTE_TYPE_DATE,
        }));
        store
          .dispatch(fetchAttributeFromContentType('attribute', 'AAA', 'mlstc'))
          .then(() => {
            const actions = store.getActions();
            expect(actions).toHaveLength(2);
            expect(actions[1]).toHaveProperty('type', SET_SELECTED_ATTRIBUTE_FOR_CONTENTTYPE);
            expect(actions[1].payload.attribute.type).toEqual('Date');
            expect(actions[1].payload.attribute.code).toEqual('mlstc');
            done();
          })
          .catch(done.fail);
      });

      it('fetchAttributeFromContentType calls ADD_ERROR actions', (done) => {
        getAttributeFromContentType.mockImplementationOnce(mockApi({ errors: true }));
        store
          .dispatch(fetchAttributeFromContentType('AAA'))
          .then(() => {
            expect(getAttributeFromContentType).toHaveBeenCalled();
            const actions = store.getActions();
            expect(actions).toHaveLength(1);
            expect(actions[0]).toHaveProperty('type', ADD_ERRORS);
            done();
          })
          .catch(done.fail);
      });
    });

    describe('sendPostAttributeFromContentType', () => {
      let history;
      beforeEach(() => {
        history = createMockHistory();
      });
      it('sendPostAttributeFromContentType calls route ROUTE_ATTRIBUTE_MONOLIST_ADD', (done) => {
        getContentTypeSelectedAttributeType.mockReturnValue({ code: 'Monolist' });
        store
          .dispatch(sendPostAttributeFromContentType({ code: 'AAA' }, 'Monolist', history))
          .then(() => {
            expect(postAttributeFromContentType).toHaveBeenCalled();
            done();
          })
          .catch(done.fail);
      });

      it('sendPostAttributeFromContentType calls route ROUTE_CONTENT_TYPE_EDIT', (done) => {
        getContentTypeSelectedAttributeType.mockReturnValue(null);
        store
          .dispatch(sendPostAttributeFromContentType({ code: 'AAA' }, 'Monolist', history))
          .then(() => {
            expect(postAttributeFromContentType).toHaveBeenCalled();
            done();
          })
          .catch(done.fail);
      });

      it('sendPostAttributeFromContentType calls ADD_ERROR actions', (done) => {
        postAttributeFromContentType.mockImplementationOnce(mockApi({ errors: true }));
        store
          .dispatch(sendPostAttributeFromContentType('AAA'))
          .then(() => {
            const actions = store.getActions();
            expect(actions).toHaveLength(1);
            expect(actions[0]).toHaveProperty('type', ADD_ERRORS);
            done();
          })
          .catch(done.fail);
      });
    });

    describe('sendPutAttributeFromContentType', () => {
      let history;
      beforeEach(() => {
        history = createMockHistory();
      });
      it('sendPutAttributeFromContentType calls route ROUTE_ATTRIBUTE_MONOLIST_ADD', (done) => {
        putAttributeFromContentType.mockImplementationOnce(mockApi({
          payload: { type: 'Monolist' },
        }));
        store
          .dispatch(sendPutAttributeFromContentType({ code: 'AAA' }, 'Monolist', '', history))
          .then(() => {
            expect(putAttributeFromContentType).toHaveBeenCalled();
            done();
          })
          .catch(done.fail);
      });

      it('sendPutAttributeFromContentType calls route ROUTE_CONTENT_TYPE_EDIT', (done) => {
        putAttributeFromContentType.mockImplementationOnce(mockApi({
          payload: { type: 'Monotext' },
        }));
        store
          .dispatch(sendPutAttributeFromContentType({ code: 'AAA' }, 'Monotext', '', history))
          .then(() => {
            expect(putAttributeFromContentType).toHaveBeenCalled();
            done();
          })
          .catch(done.fail);
      });

      it('sendPutAttributeFromContentType calls ADD_ERROR actions', (done) => {
        putAttributeFromContentType.mockImplementationOnce(mockApi({ errors: true }));
        store
          .dispatch(sendPutAttributeFromContentType('AAA'), 'Monolist', '', history)
          .then(() => {
            const actions = store.getActions();
            expect(actions).toHaveLength(1);
            expect(actions[0]).toHaveProperty('type', ADD_ERRORS);
            done();
          })
          .catch(done.fail);
      });
    });

    describe('sendPutAttributeFromContentTypeMonolist', () => {
      let history;
      beforeEach(() => {
        history = createMockHistory();
      });

      const attribute = { code: 'AAA', nestedAttribute: {} };

      it('sendPutAttributeFromContentTypeMonolist calls router ROUTE_CONTENT_TYPE_EDIT', (done) => {
        putAttributeFromContentType.mockImplementationOnce(mockApi({
          payload: { type: 'Monolist' },
        }));
        store
          .dispatch(sendPutAttributeFromContentTypeMonolist(attribute, 'Monolist', history))
          .then(() => {
            expect(putAttributeFromContentType).toHaveBeenCalled();
            done();
          })
          .catch(done.fail);
      });

      it('sendPutAttributeFromContentTypeMonolist calls ADD_ERROR actions', (done) => {
        putAttributeFromContentType.mockImplementationOnce(mockApi({ errors: true }));
        store
          .dispatch(sendPutAttributeFromContentTypeMonolist(attribute))
          .then(() => {
            const actions = store.getActions();
            expect(actions).toHaveLength(1);
            expect(actions[0]).toHaveProperty('type', ADD_ERRORS);
            done();
          })
          .catch(done.fail);
      });
    });

    describe('sendDeleteAttributeFromContentType', () => {
      it('sendDeleteAttributeFromContentType calls setSelectedContentTypeAttribute', (done) => {
        store
          .dispatch(sendDeleteAttributeFromContentType('AAA', 'attr'))
          .then(() => {
            const actions = store.getActions();
            expect(actions).toHaveLength(1);
            expect(actions[0]).toHaveProperty('type', REMOVE_ATTRIBUTE);
            done();
          })
          .catch(done.fail);
      });

      it('sendDeleteAttributeFromContentType calls ADD_ERROR actions', (done) => {
        deleteAttributeFromContentType.mockImplementationOnce(mockApi({ errors: true }));
        store
          .dispatch(sendDeleteAttributeFromContentType('AAA', 'attr'))
          .then(() => {
            const actions = store.getActions();
            expect(actions).toHaveLength(1);
            expect(actions[0]).toHaveProperty('type', ADD_ERRORS);
            done();
          })
          .catch(done.fail);
      });
    });

    describe('fetchContentTypeAttributeRef', () => {
      it('fetchContentTypeAttributeRef calls setSelectedAttributeRef action', (done) => {
        getContentTypeAttribute.mockImplementationOnce(mockApi({
          payload: CONTENT_TYPE_ATTRIBUTE,
        }));
        store
          .dispatch(fetchContentTypeAttributeRef())
          .then(() => {
            const actions = store.getActions();
            expect(actions).toHaveLength(1);
            expect(actions[0]).toHaveProperty('type', SET_SELECTED_ATTRIBUTE);
            expect(actions[0]).toHaveProperty('payload.attribute');
            expect(actions[0].payload.attribute)
              .toMatchObject(expect.objectContaining(CONTENT_TYPE_ATTRIBUTE));
            done();
          })
          .catch(done.fail);
      });

      it('not call router if attribute is Composite and actionMode is AddCompositeAttribute ', (done) => {
        const routeFunc = jest.fn();

        getFormTypeValue.mockReturnValue(TYPE_COMPOSITE);
        getActionModeContentTypeSelectedAttribute.mockReturnValue(MODE_ADD_ATTRIBUTE_COMPOSITE);
        store
          .dispatch(fetchContentTypeAttributeRef('AA1', 'TYPE_COMPOSITE', routeFunc, TYPE_COMPOSITE))
          .then(() => {
            expect(getContentTypeAttribute).not.toHaveBeenCalled();
            const actions = store.getActions();
            expect(actions).toHaveLength(2);
            expect(actions[0]).toHaveProperty('type', SET_ACTION_MODE);
            expect(actions[0]).toHaveProperty('payload', {
              actionMode: MODE_ADD_ATTRIBUTE_COMPOSITE,
            });
            expect(actions[1]).toHaveProperty('type', PUSH_PARENT_SELECTED_ATTRIBUTE);
            expect(routeFunc).not.toHaveBeenCalled();
            done();
          })
          .catch(done.fail);
      });

      it('dispatch initialize if actionMode is AddCompositeAttribute ', (done) => {
        const routeFunc = () => {};
        getContentTypeAttribute.mockImplementationOnce(mockApi({
          payload: CONTENT_TYPE_ATTRIBUTE,
        }));
        getActionModeContentTypeSelectedAttribute.mockReturnValue(MODE_ADD_ATTRIBUTE_COMPOSITE);
        getFormTypeValue.mockReturnValueOnce(TYPE_COMPOSITE);
        store
          .dispatch(fetchContentTypeAttributeRef('AA1', 'attribute_code', routeFunc))
          .then(() => {
            const actions = store.getActions(MODE_ADD_ATTRIBUTE_COMPOSITE);
            expect(getContentTypeAttribute).toHaveBeenCalled();
            expect(actions).toHaveLength(2);
            expect(actions[0]).toHaveProperty('type', SET_SELECTED_ATTRIBUTE);
            expect(actions[1]).toHaveProperty('type', '@@redux-form/INITIALIZE');
            done();
          })
          .catch(done.fail);
      });

      it('fetchContentTypeAttributeRef calls router if route exists', (done) => {
        const routeFunc = jest.fn();
        getContentTypeAttribute.mockImplementation(mockApi({ payload: CONTENT_TYPE_ATTRIBUTE }));
        getActionModeContentTypeSelectedAttribute.mockReturnValue(MODE_ADD);
        store
          .dispatch(fetchContentTypeAttributeRef('AA1', 'attribute_code', routeFunc))
          .then(() => {
            expect(routeFunc).toHaveBeenCalled();
            done();
          })
          .catch(done.fail);
      });

      it('fetchContentTypeAttributeRef calls ADD_ERROR action', (done) => {
        getContentTypeAttribute.mockImplementationOnce(mockApi({ errors: true }));
        store
          .dispatch(fetchContentTypeAttributeRef())
          .then(() => {
            const actions = store.getActions();
            expect(actions).toHaveLength(1);
            expect(actions[0]).toHaveProperty('type', ADD_ERRORS);
            done();
          })
          .catch(done.fail);
      });
    });

    describe('sendMoveAttributeUp', () => {
      it('sendMoveAttributeUp calls moveAttributeUpSync actions', (done) => {
        moveAttributeUp.mockImplementationOnce(mockApi({ payload: ATTRIBUTE_MOVE_UP }));
        store
          .dispatch(sendMoveAttributeUp('attributeCode'))
          .then(() => {
            const actions = store.getActions();
            expect(actions).toHaveLength(1);
            expect(actions[0]).toHaveProperty('type', MOVE_ATTRIBUTE_UP);
            done();
          })
          .catch(done.fail);
      });

      it('sendMoveAttributeUp calls ADD_ERROR actions', (done) => {
        moveAttributeUp.mockImplementationOnce(mockApi({ errors: true }));
        store
          .dispatch(sendMoveAttributeUp({ attributeCode: 'attr_code', attributeIndex: 1 }))
          .then(() => {
            const actions = store.getActions();
            expect(actions).toHaveLength(1);
            expect(actions[0]).toHaveProperty('type', ADD_ERRORS);
            done();
          })
          .catch(done.fail);
      });
    });

    describe('sendMoveAttributeDown', () => {
      it('sendMoveAttributeDown calls moveAttributeUpSync actions', (done) => {
        moveAttributeDown.mockImplementationOnce(mockApi({ payload: ATTRIBUTE_MOVE_DOWN }));
        store
          .dispatch(sendMoveAttributeDown('attributeCode'))
          .then(() => {
            const actions = store.getActions();
            expect(actions).toHaveLength(1);
            expect(actions[0]).toHaveProperty('type', MOVE_ATTRIBUTE_DOWN);
            done();
          })
          .catch(done.fail);
      });

      it('sendMoveAttributeDown calls ADD_ERROR actions', (done) => {
        moveAttributeDown.mockImplementationOnce(mockApi({ errors: true }));
        store
          .dispatch(sendMoveAttributeDown({ attributeCode: 'attr_code', attributeIndex: 1 }))
          .then(() => {
            const actions = store.getActions();
            expect(actions).toHaveLength(1);
            expect(actions[0]).toHaveProperty('type', ADD_ERRORS);
            done();
          })
          .catch(done.fail);
      });
    });

    describe('handlerAttributeFromContentType', () => {
      const { allowedRoles } = CONTENT_TYPE_ATTRIBUTE;

      describe('action POST', () => {
        it('default action', (done) => {
          postAttributeFromContentType.mockImplementationOnce(mockApi({}));
          getAttributeSelectFromContentType.mockReturnValueOnce(TYPE_TEXT);
          store.dispatch(handlerAttributeFromContentType(
            METHODS.POST,
            CONTENT_TYPE_ATTRIBUTE,
            allowedRoles,
          ));
          expect(getNewAttributeComposite).toHaveBeenCalled();
          done();
        });

        it('action POST with type date', () => {
          const rangeStartDate = '2018-06-15 00:00:00';
          const rangeEndDate = '2019-10-15 00:00:00';
          const equalDate = '2019-09-17 00:00:00';
          const ATTRIBUTE_TYPE_DATE = {
            code: 'mlstc',
            type: 'Date',
            name: 'Just a date',
            joinRoles: [{ code: 'roleCode1' }],
            disablingCodes: [],
            mandatory: true,
            listFilter: false,
            indexable: false,
            enumeratorStaticItems: null,
            enumeratorStaticItemsSeparator: null,
            enumeratorExtractorBean: null,
            validationRules: {
              rangeStartDate,
              rangeEndDate,
              equalDate,
              rangeStartDateAttribute: rangeStartDate,
              rangeEndDateAttribute: rangeEndDate,
              equalDateAttribute: equalDate,
            },
          };
          postAttributeFromContentType.mockImplementationOnce(mockApi({}));
          store.dispatch(handlerAttributeFromContentType(
            METHODS.POST,
            ATTRIBUTE_TYPE_DATE,
            allowedRoles,
          ));
          expect(getNewAttributeComposite).toHaveBeenCalled();
        });

        it('action add sub attribute to Composite attribute', (done) => {
          postAttributeFromContentType.mockImplementationOnce(mockApi({}));
          getAttributeSelectFromContentType.mockReturnValueOnce(ATTRIBUTE_COMPOSITE);
          store.dispatch(handlerAttributeFromContentType(
            METHODS.POST,
            CONTENT_TYPE_ATTRIBUTE,
            allowedRoles,
            MODE_ADD_COMPOSITE,
          ));
          const actions = store.getActions();
          expect(actions).toHaveLength(1);
          expect(actions[0]).toHaveProperty('type', SET_ACTION_MODE);
          expect(actions[0]).toHaveProperty('payload', { actionMode: MODE_ADD_COMPOSITE });
          done();
        });

        it('action new Composite attribute', () => {
          postAttributeFromContentType.mockImplementationOnce(mockApi({}));
          getAttributeSelectFromContentType.mockReturnValueOnce(CONTENT_TYPE_ATTRIBUTE);
          store.dispatch(handlerAttributeFromContentType(
            METHODS.POST,
            ATTRIBUTE_COMPOSITE,
            allowedRoles,
          ));
          const actions = store.getActions();
          expect(actions).toHaveLength(2);
          expect(actions[0]).toHaveProperty('type', SET_ACTION_MODE);
          expect(actions[0]).toHaveProperty('payload', { actionMode: MODE_ADD_COMPOSITE });
          expect(actions[1]).toHaveProperty('type', SET_NEW_ATTRIBUTE_COMPOSITE);
        });

        it('action new Monolist Composite attribute', () => {
          const history = createMockHistory();
          postAttributeFromContentType.mockImplementationOnce(mockApi({}));
          getAttributeSelectFromContentType.mockReturnValueOnce(CONTENT_TYPE_ATTRIBUTE);
          store.dispatch(handlerAttributeFromContentType(
            METHODS.POST,
            ATTRIBUTE_MONOLIST_COMPOSITE,
            allowedRoles,
            'addComposite',
            'Monolist',
            history,
          ));
          const actions = store.getActions();
          expect(actions).toHaveLength(4);
          expect(actions[0]).toHaveProperty('type', SET_ACTION_MODE);
          expect(actions[0]).toHaveProperty('payload', { actionMode: MODE_ADD_COMPOSITE });
          expect(actions[1]).toHaveProperty('type', SET_NEW_ATTRIBUTE_COMPOSITE);
          expect(actions[2]).toHaveProperty('type', SET_ACTION_MODE);
          expect(actions[2]).toHaveProperty('payload', {
            actionMode: MODE_ADD_MONOLIST_ATTRIBUTE_COMPOSITE,
          });
        });
      });

      describe('action PUT', () => {
        it('default action', (done) => {
          putAttributeFromContentType.mockImplementationOnce(mockApi({}));
          getAttributeSelectFromContentType.mockReturnValue(TYPE_TEXT);
          store.dispatch(handlerAttributeFromContentType(
            METHODS.PUT,
            CONTENT_TYPE_ATTRIBUTE,
            allowedRoles,
          ));
          const actions = store.getActions();
          expect(actions).toHaveLength(1);
          expect(actions[0]).toHaveProperty('type', SET_ACTION_MODE);
          expect(actions[0]).toHaveProperty('payload', { actionMode: MODE_EDIT });
          expect(putAttributeFromContentType).toHaveBeenCalled();
          done();
        });

        it('Composite attribute', (done) => {
          getAttributeSelectFromContentType.mockReturnValueOnce(ATTRIBUTE_COMPOSITE);
          store.dispatch(handlerAttributeFromContentType(
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

        it('Composite attribute is mode is MODE_EDIT_COMPOSITE call sendPutAttributeFromContentType', (done) => {
          putAttributeFromContentType.mockImplementationOnce(mockApi({}));
          getAttributeSelectFromContentType.mockReturnValueOnce(ATTRIBUTE_COMPOSITE);
          store.dispatch(handlerAttributeFromContentType(
            METHODS.PUT,
            ATTRIBUTE_COMPOSITE,
            allowedRoles,
            MODE_EDIT_COMPOSITE,
          ));
          const actions = store.getActions();
          expect(actions).toHaveLength(2);
          expect(actions[0]).toHaveProperty('type', SET_ACTION_MODE);
          expect(actions[0]).toHaveProperty('payload', { actionMode: MODE_EDIT });
          expect(putAttributeFromContentType).toHaveBeenCalled();
          expect(actions[1]).toHaveProperty('type', SET_ACTION_MODE);
          expect(actions[1]).toHaveProperty('payload', { actionMode: MODE_EDIT_COMPOSITE });
          done();
        });

        it('if mode MODE_ADD_ATTRIBUTE_COMPOSITE dispatch setActionMode and sendPutAttributeFromContentType', (done) => {
          putAttributeFromContentType.mockImplementationOnce(mockApi({}));
          getAttributeSelectFromContentType.mockReturnValueOnce(ATTRIBUTE_COMPOSITE);
          store.dispatch(handlerAttributeFromContentType(
            METHODS.PUT,
            CONTENT_TYPE_ATTRIBUTE,
            allowedRoles,
            MODE_ADD_ATTRIBUTE_COMPOSITE,
          ));
          const actions = store.getActions();
          expect(actions).toHaveLength(2);
          expect(actions[0]).toHaveProperty('type', SET_ACTION_MODE);
          expect(actions[0]).toHaveProperty('payload', { actionMode: MODE_EDIT });
          expect(actions[1]).toHaveProperty('type', SET_ACTION_MODE);
          expect(actions[1]).toHaveProperty('payload', { actionMode: MODE_EDIT_COMPOSITE });
          expect(putAttributeFromContentType).toHaveBeenCalled();
          done();
        });
      });
    });
  });
});
