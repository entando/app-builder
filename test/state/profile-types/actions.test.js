import { isFSA } from 'flux-standard-action';
import configureMockStore from 'redux-mock-store';
import { createMockHistory } from 'test/legacyTestUtils';
import thunk from 'redux-thunk';
import { ADD_ERRORS, ADD_TOAST } from '@entando/messages';
import { METHODS } from '@entando/apimanager';

import { history, ROUTE_PROFILE_TYPE_LIST } from 'app-init/router';
import { mockApi } from 'test/testUtils';
import { SET_PAGE } from 'state/pagination/types';
import { TOGGLE_LOADING } from 'state/loading/types';

import {
  SET_PROFILE_TYPES,
  REMOVE_PROFILE_TYPE,
  SET_ATTRIBUTES,
  SET_SELECTED_PROFILE_TYPE,
  SET_SELECTED_ATTRIBUTE_FOR_PROFILETYPE,
  SET_SELECTED_ATTRIBUTE,
  REMOVE_ATTRIBUTE,
  SET_SELECTED_NESTED_ATTRIBUTE,
  SET_ACTION_MODE,
  REMOVE_ATTRIBUTE_FROM_COMPOSITE,
  SET_NEW_ATTRIBUTE_COMPOSITE,
  MOVE_ATTRIBUTE_UP,
  MOVE_ATTRIBUTE_DOWN,
} from 'state/profile-types/types';
import {
  TYPE_TEXT,
  MODE_EDIT,
  MODE_ADD_COMPOSITE,
  MODE_EDIT_COMPOSITE,
  MODE_ADD_ATTRIBUTE_COMPOSITE,
  MODE_ADD_MONOLIST_ATTRIBUTE_COMPOSITE,
} from 'state/profile-types/const';
import {
  getProfileTypeAttributesIdList,
  getProfileTypeSelectedAttributeType,
  getNewAttributeComposite,
  getAttributeSelectFromProfileType,
} from 'state/profile-types/selectors';
import {
  sendPostProfileType,
  sendPutProfileType,
  sendDeleteProfileType,
  setProfileTypes,
  removeProfileType,
  setSelectedNestedAttribute,
  setActionMode,
  removeAttributeFromComposite,
  setNewAttributeComposite,
  fetchProfileType,
  fetchProfileTypes,
  fetchAttributeFromProfileType,
  sendPostAttributeFromProfileType,
  sendPutAttributeFromProfileType,
  sendPutAttributeFromProfileTypeMonolist,
  sendDeleteAttributeFromProfileType,
  setSelectedProfileType,
  setProfileTypeAttributes,
  setSelectedAttribute,
  fetchProfileTypeAttributes,
  fetchProfileTypeAttribute,
  sendPostRefreshProfileType,
  handlerAttributeFromProfileType,
  sendMoveAttributeUp,
  sendMoveAttributeDown,
} from 'state/profile-types/actions';
import {
  postProfileType,
  putProfileType,
  deleteProfileType,
  getProfileType,
  getProfileTypes,
  getAttributeFromProfileType,
  postAttributeFromProfileType,
  putAttributeFromProfileType,
  deleteAttributeFromProfileType,
  getProfileTypeAttributes,
  getProfileTypeAttribute,
  postRefreshProfileType,
  moveAttributeUp,
  moveAttributeDown,
} from 'api/profileTypes';
import {
  PROFILE_TYPE,
  PROFILE_TYPES,
  PROFILE_TYPES_OK_PAGE_1,
  PROFILE_TYPES_ATTRIBUTES,
  PROFILE_TYPE_ATTRIBUTE,
  ATTRIBUTE_MOVE_UP,
  ATTRIBUTE_MOVE_DOWN,
  ATTRIBUTE_COMPOSITE,
  ATTRIBUTE_MONOLIST_COMPOSITE,
} from 'test/mocks/profileTypes';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const PROFILE_TYPES_MOCK = PROFILE_TYPES_OK_PAGE_1.payload;

const INITIAL_STATE = {};

jest.mock('state/profile-types/selectors', () => ({
  getProfileTypeAttributesIdList: jest.fn(),
  getProfileTypeSelectedAttribute: jest.fn(),
  getProfileTypeSelectedAttributeType: jest.fn(),
  getActionModeProfileTypeSelectedAttribute: jest.fn(),
  getIsMonolistCompositeAttributeType: jest.fn(),
  getAttributeTypeSelectFromProfileType: jest.fn(),
  getSelectedProfileType: jest.fn().mockReturnValue({ code: 'profileType_code' }),
  getAttributeSelectFromProfileType: jest.fn(),
  getNewAttributeComposite: jest.fn(),
}));

history.push = jest.fn();

describe('state/profile-types/actions ', () => {
  let store;
  let action;
  beforeEach(() => {
    store = mockStore(INITIAL_STATE);
    jest.clearAllMocks();
  });

  describe('setProfileTypes', () => {
    beforeEach(() => {
      action = setProfileTypes(PROFILE_TYPES_MOCK);
    });
    it('is FSA compliant', () => {
      expect(isFSA(action)).toBe(true);
    });
    it('test setProfileTypes action sets the correct type', () => {
      expect(action).toHaveProperty('type', SET_PROFILE_TYPES);
    });
  });

  describe('removeProfileType', () => {
    beforeEach(() => {
      action = removeProfileType('AAA');
    });
    it('is FSA compliant', () => {
      expect(isFSA(action)).toBe(true);
    });
    it('test removeProfileType action sets the correct type', () => {
      expect(action.type).toBe(REMOVE_PROFILE_TYPE);
    });
  });


  describe('setProfileTypeAttributes', () => {
    beforeEach(() => {
      action = setProfileTypeAttributes(PROFILE_TYPES_ATTRIBUTES);
    });
    it('is FSA compliant', () => {
      expect(isFSA(action)).toBe(true);
    });
    it('test setProfileTypeAttributes action sets the correct type', () => {
      expect(action).toHaveProperty('type', SET_ATTRIBUTES);
    });
  });
  describe('setSelectedProfileType', () => {
    beforeEach(() => {
      action = setSelectedProfileType('AAA');
    });
    it('is FSA compliant', () => {
      expect(isFSA(action)).toBe(true);
    });
    it('test setSelectedProfileType action sets the correct type', () => {
      expect(action).toHaveProperty('type', SET_SELECTED_PROFILE_TYPE);
    });
  });
  describe('setSelectedAttribute', () => {
    beforeEach(() => {
      action = setSelectedAttribute(PROFILE_TYPE_ATTRIBUTE);
    });
    it('is FSA compliant', () => {
      expect(isFSA(action)).toBe(true);
    });
    it('test setSelectedAttribute action sets the correct type', () => {
      expect(action).toHaveProperty('type', SET_SELECTED_ATTRIBUTE);
    });
  });
  describe('setSelectedNestedAttribute', () => {
    beforeEach(() => {
      action = setSelectedNestedAttribute(PROFILE_TYPE_ATTRIBUTE);
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
      action = setNewAttributeComposite(PROFILE_TYPE);
    });
    it('is FSA compliant', () => {
      expect(isFSA(action)).toBe(true);
    });
    it('test setActionMode action sets the correct type', () => {
      expect(action.type).toBe(SET_NEW_ATTRIBUTE_COMPOSITE);
    });
  });


  describe('thunk', () => {
    describe('sendPostProfileType', () => {
      it('when postProfileType succeeds, should call api', (done) => {
        postProfileType.mockImplementationOnce(mockApi({ payload: PROFILE_TYPES }));
        store.dispatch(sendPostProfileType(PROFILE_TYPES)).then(() => {
          expect(postProfileType).toHaveBeenCalled();
          done();
        }).catch(done.fail);
      });

      it('when postProfileType get error, should dispatch addError', (done) => {
        postProfileType.mockImplementationOnce(mockApi({ errors: true }));
        store.dispatch(sendPostProfileType(PROFILE_TYPES)).then(() => {
          expect(postProfileType).toHaveBeenCalled();
          const actions = store.getActions();
          expect(actions).toHaveLength(2);
          expect(actions[1]).toHaveProperty('type', ADD_TOAST);
          expect(actions[1].payload).toHaveProperty('type', 'error');
          done();
        }).catch(done.fail);
      });
    });

    describe('sendPutProfileType', () => {
      it('when putProfileType succeeds, should call router', (done) => {
        putProfileType.mockImplementationOnce(mockApi({ payload: PROFILE_TYPES }));
        store.dispatch(sendPutProfileType(PROFILE_TYPES)).then(() => {
          expect(putProfileType).toHaveBeenCalled();
          expect(history.push).toHaveBeenCalledWith(ROUTE_PROFILE_TYPE_LIST);
          done();
        }).catch(done.fail);
      });

      it('when putProfileType get error, should dispatch addError', (done) => {
        putProfileType.mockImplementationOnce(mockApi({ errors: true }));
        store.dispatch(sendPutProfileType(PROFILE_TYPES)).then(() => {
          expect(putProfileType).toHaveBeenCalled();
          const actions = store.getActions();
          expect(actions).toHaveLength(2);
          expect(actions[0]).toHaveProperty('type', ADD_ERRORS);
          expect(actions[1]).toHaveProperty('type', ADD_TOAST);
          done();
        }).catch(done.fail);
      });
    });

    describe('sendPostRefreshProfileType', () => {
      it('when sendPostRefreshProfileType succeeds, should show toasts', (done) => {
        postRefreshProfileType.mockImplementationOnce(mockApi({ payload: {} }));
        store.dispatch(sendPostRefreshProfileType(1)).then(() => {
          expect(postRefreshProfileType).toHaveBeenCalled();
          const actions = store.getActions();
          expect(actions).toHaveLength(1);
          expect(actions[0]).toHaveProperty('type', ADD_TOAST);
          done();
        }).catch(done.fail);
      });

      it('when sendPostRefreshProfileType get error, should dispatch addError', (done) => {
        postRefreshProfileType.mockImplementationOnce(mockApi({ errors: true }));
        store.dispatch(sendPostRefreshProfileType(1)).then(() => {
          expect(postRefreshProfileType).toHaveBeenCalled();
          const actions = store.getActions();
          expect(actions).toHaveLength(2);
          expect(actions[0]).toHaveProperty('type', ADD_ERRORS);
          expect(actions[1]).toHaveProperty('type', ADD_TOAST);
          done();
        }).catch(done.fail);
      });
    });

    describe('sendDeleteProfileType', () => {
      it('when deleteProfileType succeeds, should call router', (done) => {
        deleteProfileType.mockImplementationOnce(mockApi({ payload: 'AAA' }));
        store.dispatch(sendDeleteProfileType('AAA')).then(() => {
          expect(deleteProfileType).toHaveBeenCalled();
          expect(history.push).toHaveBeenCalled();
          const actions = store.getActions();
          expect(actions[0]).toHaveProperty('type', REMOVE_PROFILE_TYPE);
          expect(actions[0]).toHaveProperty('payload', { profileTypeCode: 'AAA' });
          done();
        }).catch(done.fail);
      });

      it('when deleteProfileType get error, should dispatch addError', (done) => {
        deleteProfileType.mockImplementationOnce(mockApi({ errors: true }));
        store.dispatch(sendDeleteProfileType('AAA')).then(() => {
          expect(deleteProfileType).toHaveBeenCalled();
          const actions = store.getActions();
          expect(actions[0]).toHaveProperty('type', ADD_ERRORS);
          done();
        }).catch(done.fail);
      });
    });

    describe('fetchProfileType', () => {
      it('fetchProfileType calls setSelectedProfileType', (done) => {
        getProfileType.mockImplementationOnce(mockApi({ payload: PROFILE_TYPES }));
        store.dispatch(fetchProfileType('AAA')).then(() => {
          const actions = store.getActions();
          expect(actions).toHaveLength(2);
          expect(actions[0]).toHaveProperty('type', SET_SELECTED_PROFILE_TYPE);
          expect(actions[0]).toHaveProperty('payload');
          expect(actions[0].payload).toMatchObject({ profileType: PROFILE_TYPES });
          done();
        }).catch(done.fail);
      });

      it('fetchProfileType get error, should dispatch addError', (done) => {
        getProfileType.mockImplementationOnce(mockApi({ errors: true }));
        store.dispatch(fetchProfileType('AAA')).then(() => {
          const actions = store.getActions();
          expect(actions).toHaveLength(2);
          expect(actions[0]).toHaveProperty('type', ADD_ERRORS);
          expect(actions[1]).toHaveProperty('type', ADD_TOAST);
          done();
        }).catch(done.fail);
      });
    });

    describe('fetchProfileTypes', () => {
      it('fetchProfileTypes calls fetchProfileTypes and setPage actions', (done) => {
        store.dispatch(fetchProfileTypes()).then(() => {
          const actions = store.getActions();
          expect(actions).toHaveLength(4);
          expect(actions[0].type).toEqual(TOGGLE_LOADING);
          expect(actions[1].type).toEqual(SET_PROFILE_TYPES);
          expect(actions[2].type).toEqual(SET_PAGE);
          expect(actions[3].type).toEqual(TOGGLE_LOADING);
          done();
        }).catch(done.fail);
      });

      it('profileTypes is defined and properly valued', (done) => {
        getProfileTypes.mockImplementationOnce(mockApi({ payload: PROFILE_TYPES_MOCK }));
        store.dispatch(fetchProfileTypes()).then(() => {
          const actionPayload = store.getActions()[1].payload;
          expect(actionPayload.profileTypes).toHaveLength(2);
          const profileType = actionPayload.profileTypes[0];
          expect(profileType).toHaveProperty('name', 'profileType1');
          expect(profileType).toHaveProperty('code', 'ABC');
          expect(profileType).toHaveProperty('status', '0');
          done();
        }).catch(done.fail);
      });

      it('fetchProfileTypes calls ADD_ERROR actions', (done) => {
        getProfileTypes.mockImplementationOnce(mockApi({ errors: true }));
        store.dispatch(fetchProfileTypes()).then(() => {
          const actions = store.getActions();
          expect(actions).toHaveLength(4);
          expect(actions[0]).toHaveProperty('type', TOGGLE_LOADING);
          expect(actions[1]).toHaveProperty('type', ADD_ERRORS);
          expect(actions[2]).toHaveProperty('type', ADD_TOAST);
          expect(actions[3]).toHaveProperty('type', TOGGLE_LOADING);
          done();
        }).catch(done.fail);
      });
    });

    describe('fetchAttributeFromProfileType', () => {
      it('fetchAttributeFromProfileType calls setSelectedAttributeProfileType', (done) => {
        store.dispatch(fetchAttributeFromProfileType('attribute', 'AAA', 'Date')).then(() => {
          expect(getAttributeFromProfileType).toHaveBeenCalled();
          const actions = store.getActions();
          expect(actions).toHaveLength(2);
          expect(actions[0]).toHaveProperty('type', '@@redux-form/INITIALIZE');
          expect(actions[1]).toHaveProperty('type', SET_SELECTED_ATTRIBUTE_FOR_PROFILETYPE);
          done();
        }).catch(done.fail);
      });

      it('fetchAttributeFromProfileType calls ADD_ERROR actions', (done) => {
        getAttributeFromProfileType.mockImplementationOnce(mockApi({ errors: true }));
        store.dispatch(fetchAttributeFromProfileType('attribute', 'AAA', 'Date')).then(() => {
          const actions = store.getActions();
          expect(actions).toHaveLength(1);
          expect(actions[0]).toHaveProperty('type', ADD_ERRORS);
          done();
        }).catch(done.fail);
      });
    });

    describe('sendPostAttributeFromProfileType', () => {
      it('sendPostAttributeFromProfileType calls route ROUTE_ATTRIBUTE_MONOLIST_PROFILE_ADD', (done) => {
        getProfileTypeSelectedAttributeType.mockReturnValue({ code: 'Monolist' });
        store.dispatch(sendPostAttributeFromProfileType({ code: 'AAA' }, 'Monolist')).then(() => {
          expect(postAttributeFromProfileType).toHaveBeenCalled();
          expect(history.push).toHaveBeenCalledWith('/profiletype/attribute/Monolist/MonolistAdd/AAA');
          done();
        }).catch(done.fail);
      });

      it('sendPostAttributeFromProfileType calls route ROUTE_PROFILE_TYPE_EDIT', (done) => {
        getProfileTypeSelectedAttributeType.mockReturnValue(null);
        store.dispatch(sendPostAttributeFromProfileType({ code: 'AAA' }, 'Monolist')).then(() => {
          expect(postAttributeFromProfileType).toHaveBeenCalled();
          expect(history.push).toHaveBeenCalledWith('/profiletype/edit/Monolist');
          done();
        }).catch(done.fail);
      });

      it('sendPostAttributeFromProfileType calls ADD_ERROR actions', (done) => {
        postAttributeFromProfileType.mockImplementationOnce(mockApi({ errors: true }));
        store.dispatch(sendPostAttributeFromProfileType('AAA'), 'Monolist').then(() => {
          const actions = store.getActions();
          expect(actions).toHaveLength(1);
          expect(actions[0]).toHaveProperty('type', ADD_ERRORS);
          done();
        }).catch(done.fail);
      });
    });

    describe('sendPutAttributeFromProfileType', () => {
      it('sendPutAttributeFromProfileType calls route ROUTE_ATTRIBUTE_MONOLIST_PROFILE_ADD', (done) => {
        putAttributeFromProfileType.mockImplementationOnce(mockApi({ payload: { type: 'Monolist' } }));
        store.dispatch(sendPutAttributeFromProfileType({ code: 'AAA' }, 'Monolist')).then(() => {
          expect(putAttributeFromProfileType).toHaveBeenCalled();
          expect(history.push).toHaveBeenCalledWith('/profiletype/attribute/Monolist/MonolistAdd/AAA');
          done();
        }).catch(done.fail);
      });

      it('sendPutAttributeFromProfileType calls route ROUTE_PROFILE_TYPE_EDIT', (done) => {
        putAttributeFromProfileType.mockImplementationOnce(mockApi({ payload: { type: 'Monotext' } }));
        store.dispatch(sendPutAttributeFromProfileType({ code: 'AAA' }, 'Monotext')).then(() => {
          expect(putAttributeFromProfileType).toHaveBeenCalled();
          expect(history.push).toHaveBeenCalledWith('/profiletype/edit/Monotext');
          done();
        }).catch(done.fail);
      });

      it('sendPutAttributeFromProfileType calls ADD_ERROR actions', (done) => {
        putAttributeFromProfileType.mockImplementationOnce(mockApi({ errors: true }));
        store.dispatch(sendPutAttributeFromProfileType('AAA')).then(() => {
          const actions = store.getActions();
          expect(actions).toHaveLength(1);
          expect(actions[0]).toHaveProperty('type', ADD_ERRORS);
          done();
        }).catch(done.fail);
      });
    });

    describe('sendPutAttributeFromProfileTypeMonolist', () => {
      it('sendPutAttributeFromProfileTypeMonolist calls history.push ROUTE_PROFILE_TYPE_EDIT', (done) => {
        putAttributeFromProfileType.mockImplementationOnce(mockApi({ payload: { type: 'Monolist' } }));
        store.dispatch(sendPutAttributeFromProfileTypeMonolist({ code: 'AAA', nestedAttribute: { type: 'Text' } }, 'Monolist')).then(() => {
          expect(putAttributeFromProfileType).toHaveBeenCalled();
          expect(history.push).toHaveBeenCalledWith('/profiletype/edit/Monolist');
          done();
        }).catch(done.fail);
      });

      it('sendPutAttributeFromProfileTypeMonolist calls ADD_ERROR actions', (done) => {
        putAttributeFromProfileType.mockImplementationOnce(mockApi({ errors: true }));
        store.dispatch(sendPutAttributeFromProfileTypeMonolist({ code: 'AAA', nestedAttribute: { type: 'Text' } })).then(() => {
          const actions = store.getActions();
          expect(actions).toHaveLength(1);
          expect(actions[0]).toHaveProperty('type', ADD_ERRORS);
          done();
        }).catch(done.fail);
      });
    });

    describe('sendDeleteAttributeFromProfileType', () => {
      it('sendDeleteAttributeFromProfileType calls setSelectedAttributeProfileType', (done) => {
        store.dispatch(sendDeleteAttributeFromProfileType('AAA', 'attr')).then(() => {
          const actions = store.getActions();
          expect(actions).toHaveLength(1);
          expect(actions[0]).toHaveProperty('type', REMOVE_ATTRIBUTE);
          done();
        }).catch(done.fail);
      });

      it('sendDeleteAttributeFromProfileType calls ADD_ERROR actions', (done) => {
        deleteAttributeFromProfileType.mockImplementationOnce(mockApi({ errors: true }));
        store.dispatch(sendDeleteAttributeFromProfileType('AAA', 'attr')).then(() => {
          const actions = store.getActions();
          expect(actions).toHaveLength(2);
          expect(actions[0]).toHaveProperty('type', ADD_ERRORS);
          expect(actions[1]).toHaveProperty('type', ADD_TOAST);
          done();
        }).catch(done.fail);
      });
    });


    describe('fetchProfileTypeAttributes', () => {
      it('fetchProfileTypeAttributes call setAttributes actions', (done) => {
        getProfileTypeAttributes.mockImplementationOnce(mockApi({
          payload: PROFILE_TYPES_ATTRIBUTES,
        }));
        store.dispatch(fetchProfileTypeAttributes()).then(() => {
          const actions = store.getActions();
          expect(actions).toHaveLength(3);
          expect(actions[0]).toHaveProperty('type', TOGGLE_LOADING);
          expect(actions[1]).toHaveProperty('type', SET_ATTRIBUTES);
          expect(actions[1]).toHaveProperty('payload');
          expect(actions[1]).toHaveProperty('payload.attributes');
          expect(actions[1]).toHaveProperty('payload.attributes', PROFILE_TYPES_ATTRIBUTES);
          expect(actions[2]).toHaveProperty('type', TOGGLE_LOADING);
          done();
        }).catch(done.fail);
      });

      it('fetchProfileTypeAttributes not call setAttributes actions', (done) => {
        getProfileTypeAttributesIdList.mockReturnValue(PROFILE_TYPES_ATTRIBUTES);
        getProfileTypeAttributes.mockImplementationOnce(mockApi({
          payload: PROFILE_TYPES_ATTRIBUTES,
        }));
        store.dispatch(fetchProfileTypeAttributes()).then(() => {
          const actions = store.getActions();
          expect(actions).toHaveLength(2);
          expect(actions[0]).toHaveProperty('type', TOGGLE_LOADING);
          expect(actions[1]).toHaveProperty('type', TOGGLE_LOADING);
          done();
        }).catch(done.fail);
      });

      it('fetchProfileTypeAttributes calls ADD_ERROR actions', (done) => {
        getProfileTypeAttributes.mockImplementationOnce(mockApi({ errors: true }));
        store.dispatch(fetchProfileTypeAttributes()).then(() => {
          const actions = store.getActions();
          expect(actions).toHaveLength(4);
          expect(actions[0]).toHaveProperty('type', TOGGLE_LOADING);
          expect(actions[1]).toHaveProperty('type', ADD_ERRORS);
          expect(actions[2]).toHaveProperty('type', ADD_TOAST);
          expect(actions[3]).toHaveProperty('type', TOGGLE_LOADING);
          done();
        }).catch(done.fail);
      });
    });

    describe('fetchProfileTypeAttribute', () => {
      it('fetchProfileTypeAttribute calls setSelectedAttribute actions', (done) => {
        getProfileTypeAttribute.mockImplementationOnce(mockApi({
          payload: PROFILE_TYPE_ATTRIBUTE,
        }));
        store.dispatch(fetchProfileTypeAttribute()).then(() => {
          const actions = store.getActions();
          expect(actions).toHaveLength(1);
          expect(actions[0]).toHaveProperty('type', SET_SELECTED_ATTRIBUTE);
          expect(actions[0]).toHaveProperty('payload.attribute');
          expect(actions[0].payload.attribute)
            .toMatchObject(expect.objectContaining(PROFILE_TYPE_ATTRIBUTE));
          done();
        }).catch(done.fail);
      });

      it('fetchProfileTypeAttribute calls ADD_ERROR actions', (done) => {
        getProfileTypeAttribute.mockImplementationOnce(mockApi({ errors: true }));
        store.dispatch(fetchProfileTypeAttribute()).then(() => {
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
            expect(actions).toHaveLength(2);
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
            expect(actions).toHaveLength(2);
            expect(actions[0]).toHaveProperty('type', ADD_ERRORS);
            done();
          })
          .catch(done.fail);
      });
    });

    describe('handlerAttributeFromProfileType', () => {
      const { allowedRoles } = PROFILE_TYPE_ATTRIBUTE;

      describe('action POST', () => {
        it('default action', (done) => {
          postAttributeFromProfileType.mockImplementationOnce(mockApi({}));
          getAttributeSelectFromProfileType.mockReturnValueOnce(TYPE_TEXT);
          store.dispatch(handlerAttributeFromProfileType(
            METHODS.POST,
            PROFILE_TYPE_ATTRIBUTE,
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
          postAttributeFromProfileType.mockImplementationOnce(mockApi({}));
          store.dispatch(handlerAttributeFromProfileType(
            METHODS.POST,
            ATTRIBUTE_TYPE_DATE,
            allowedRoles,
          ));
          expect(getNewAttributeComposite).toHaveBeenCalled();
        });

        it('action add sub attribute to Composite attribute', (done) => {
          postAttributeFromProfileType.mockImplementationOnce(mockApi({}));
          getAttributeSelectFromProfileType.mockReturnValueOnce(ATTRIBUTE_COMPOSITE);
          store.dispatch(handlerAttributeFromProfileType(
            METHODS.POST,
            PROFILE_TYPE_ATTRIBUTE,
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
          postAttributeFromProfileType.mockImplementationOnce(mockApi({}));
          getAttributeSelectFromProfileType.mockReturnValueOnce(PROFILE_TYPE_ATTRIBUTE);
          store.dispatch(handlerAttributeFromProfileType(
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
          const hist = createMockHistory();
          postAttributeFromProfileType.mockImplementationOnce(mockApi({}));
          getAttributeSelectFromProfileType.mockReturnValueOnce(PROFILE_TYPE_ATTRIBUTE);
          store.dispatch(handlerAttributeFromProfileType(
            METHODS.POST,
            ATTRIBUTE_MONOLIST_COMPOSITE,
            allowedRoles,
            'addComposite',
            'Monolist',
            hist,
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
          putAttributeFromProfileType.mockImplementationOnce(mockApi({}));
          getAttributeSelectFromProfileType.mockReturnValue(TYPE_TEXT);
          store.dispatch(handlerAttributeFromProfileType(
            METHODS.PUT,
            PROFILE_TYPE_ATTRIBUTE,
            allowedRoles,
          ));
          const actions = store.getActions();
          expect(actions).toHaveLength(1);
          expect(actions[0]).toHaveProperty('type', SET_ACTION_MODE);
          expect(actions[0]).toHaveProperty('payload', { actionMode: MODE_EDIT });
          expect(putAttributeFromProfileType).toHaveBeenCalled();
          done();
        });

        it('Composite attribute', (done) => {
          getAttributeSelectFromProfileType.mockReturnValueOnce(ATTRIBUTE_COMPOSITE);
          store.dispatch(handlerAttributeFromProfileType(
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

        it('Composite attribute is mode is MODE_EDIT_COMPOSITE call sendPutAttributeFromProfileType', (done) => {
          putAttributeFromProfileType.mockImplementationOnce(mockApi({}));
          getAttributeSelectFromProfileType.mockReturnValueOnce(ATTRIBUTE_COMPOSITE);
          store.dispatch(handlerAttributeFromProfileType(
            METHODS.PUT,
            ATTRIBUTE_COMPOSITE,
            allowedRoles,
            MODE_EDIT_COMPOSITE,
          ));
          const actions = store.getActions();
          expect(actions).toHaveLength(2);
          expect(actions[0]).toHaveProperty('type', SET_ACTION_MODE);
          expect(actions[0]).toHaveProperty('payload', { actionMode: MODE_EDIT });
          expect(putAttributeFromProfileType).toHaveBeenCalled();
          expect(actions[1]).toHaveProperty('type', SET_ACTION_MODE);
          expect(actions[1]).toHaveProperty('payload', { actionMode: MODE_EDIT_COMPOSITE });
          done();
        });

        it('if mode MODE_ADD_ATTRIBUTE_COMPOSITE dispatch setActionMode and sendPutAttributeFromProfileType', (done) => {
          putAttributeFromProfileType.mockImplementationOnce(mockApi({}));
          getAttributeSelectFromProfileType.mockReturnValueOnce(ATTRIBUTE_COMPOSITE);
          store.dispatch(handlerAttributeFromProfileType(
            METHODS.PUT,
            PROFILE_TYPE_ATTRIBUTE,
            allowedRoles,
            MODE_ADD_ATTRIBUTE_COMPOSITE,
          ));
          const actions = store.getActions();
          expect(actions).toHaveLength(2);
          expect(actions[0]).toHaveProperty('type', SET_ACTION_MODE);
          expect(actions[0]).toHaveProperty('payload', { actionMode: MODE_EDIT });
          expect(actions[1]).toHaveProperty('type', SET_ACTION_MODE);
          expect(actions[1]).toHaveProperty('payload', { actionMode: MODE_EDIT_COMPOSITE });
          expect(putAttributeFromProfileType).toHaveBeenCalled();
          done();
        });
      });
    });
  });
});
