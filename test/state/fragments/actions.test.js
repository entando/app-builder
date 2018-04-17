import { isFSA } from 'flux-standard-action';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { initialize } from 'redux-form';

import { mockApi } from 'test/testUtils';

import { config } from '@entando/apimanager';
import {
  fetchFragment, fetchFragmentDetail, fetchWidgetTypes, setFragments, fetchFragments,
  fetchPlugins, setWidgetTypes, setPlugins, setSelectedFragment, fetchFragmentSettings,
  updateFragmentSettings, removeFragment, sendDeleteFragment,
} from 'state/fragments/actions';
import {
  WIDGET_TYPES_OK,
  PLUGINS_OK,
  GET_FRAGMENT_OK,
  LIST_FRAGMENTS_OK,
} from 'test/mocks/fragments';

import {
  getFragmentSettings,
  putFragmentSettings,
  getFragment,
  getFragments,
  getWidgetTypes,
  getPlugins,
  deleteFragment,
} from 'api/fragments';

import {
  SET_SELECTED, SET_WIDGET_TYPES,
  SET_PLUGINS, SET_FRAGMENTS, REMOVE_FRAGMENT,
} from 'state/fragments/types';
import { ADD_ERRORS } from 'state/errors/types';
import { TOGGLE_LOADING } from 'state/loading/types';
import { SET_PAGE } from 'state/pagination/types';
import { ADD_ALERT } from 'state/alerts/types';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

config(mockStore({ api: { useMocks: true }, currentUser: { token: 'asdf' } }));

const GET_FRAGMENT_PAYLOAD = GET_FRAGMENT_OK.payload;
const WIDGET_TYPES_PAYLOAD = WIDGET_TYPES_OK;
const PLUGINS_PAYLOAD = PLUGINS_OK;

const FRAGMENT_CODE = 'myCode';
const FRAGMENT_SETTINGS = { enableEditingWhenEmptyDefaultGui: true };

const INITIAL_STATE = {
  form: {},
  fragments: {
    list: [],
    widgetTypes: [],
    plugins: [],
  },
};


describe('state/fragments/actions', () => {
  let store;
  let action;

  beforeEach(() => {
    store = mockStore(INITIAL_STATE);
    jest.clearAllMocks();
    store.clearActions();
  });

  describe('setFragments', () => {
    it('test setFragments action sets the correct type', () => {
      action = setFragments(LIST_FRAGMENTS_OK.payload);
      expect(action.type).toEqual(SET_FRAGMENTS);
    });
  });

  describe('fetchFragments', () => {
    beforeEach(() => {
      getFragments.mockImplementation(mockApi({ payload: LIST_FRAGMENTS_OK }));
    });
    it('fetchFragments calls setFragments and setPage actions', (done) => {
      store.dispatch(fetchFragments()).then(() => {
        const actions = store.getActions();
        expect(actions).toHaveLength(4);
        expect(actions[0].type).toEqual(TOGGLE_LOADING);
        expect(actions[1].type).toEqual(SET_FRAGMENTS);
        expect(actions[2].type).toEqual(TOGGLE_LOADING);
        expect(actions[3].type).toEqual(SET_PAGE);
        done();
      }).catch(done.fail);
    });

    it('fetchFragments as error and dispatch ADD_ERRORS ', (done) => {
      getFragments.mockImplementation(mockApi({ errors: true }));
      store.dispatch(fetchFragments()).then(() => {
        const actions = store.getActions();
        expect(actions).toHaveLength(3);
        expect(actions[0].type).toEqual(TOGGLE_LOADING);
        expect(actions[1].type).toEqual(ADD_ERRORS);
        expect(actions[2].type).toEqual(TOGGLE_LOADING);

        done();
      }).catch(done.fail);
    });

    it('fragments is defined and properly valued', (done) => {
      store.dispatch(fetchFragments()).then(() => {
        const actionPayload = store.getActions()[1].payload;
        expect(actionPayload.fragments).toHaveLength(7);
        const fragment = actionPayload.fragments[0];
        expect(fragment).toHaveProperty('code', 'myCode');
        expect(fragment).toHaveProperty('isLocked');
        expect(fragment).toHaveProperty('widgetType');
        expect(fragment).toHaveProperty('pluginCode');
        done();
      }).catch(done.fail);
    });
  });

  describe('test sync actions', () => {
    describe('test setWidgetTypes', () => {
      it('action payload contains widgetTypes list', () => {
        action = setWidgetTypes(WIDGET_TYPES_PAYLOAD);
        expect(action.type).toBe(SET_WIDGET_TYPES);
        expect(action.payload.widgetTypes).toEqual(WIDGET_TYPES_PAYLOAD);
      });
    });
    describe('test setPlugins', () => {
      it('action payload contains plugins list', () => {
        action = setPlugins(PLUGINS_PAYLOAD);
        expect(action.type).toBe(SET_PLUGINS);
        expect(action.payload.plugins).toEqual(PLUGINS_PAYLOAD);
      });
    });
    describe('test setSelectedFragment', () => {
      it('action payload contains selected fragment', () => {
        action = setSelectedFragment(GET_FRAGMENT_PAYLOAD);
        expect(action.type).toBe(SET_SELECTED);
        expect(action.payload.fragment).toEqual(GET_FRAGMENT_PAYLOAD);
      });
    });

    describe('removeFragment', () => {
      beforeEach(() => {
        action = removeFragment('CODE');
      });

      it('is FSA compliant', () => {
        expect(isFSA(action)).toBe(true);
      });

      it('actions is correct setup ', () => {
        expect(action).toHaveProperty('type', REMOVE_FRAGMENT);
        expect(action).toHaveProperty('payload.fragmentCode', 'CODE');
      });
    });
  });

  describe('test thunks', () => {
    describe('test fetchFragment', () => {
      beforeEach(() => {
        getFragment.mockImplementation(mockApi({ payload: GET_FRAGMENT_OK }));
      });

      it('if API response ok, initializes fragment information', (done) => {
        store.dispatch(fetchFragment(FRAGMENT_CODE)).then(() => {
          expect(initialize).toHaveBeenCalledWith('fragment', GET_FRAGMENT_OK);
          done();
        }).catch(done.fail);
      });

      it('if API response is not ok, dispatch ADD_ERRORS', (done) => {
        getFragment.mockImplementation(mockApi({ errors: true }));
        store.dispatch(fetchFragment(FRAGMENT_CODE)).then(() => {
          expect(store.getActions()).toHaveLength(1);
          expect(store.getActions()[0]).toHaveProperty('type', ADD_ERRORS);
          done();
        }).catch(done.fail);
      });
    });

    describe('test fetchFragmentDetail', () => {
      it('action payload contains fragment information', (done) => {
        store.dispatch(fetchFragmentDetail(FRAGMENT_CODE)).then(() => {
          const actions = store.getActions();
          expect(actions[0].payload.fragment).toEqual(GET_FRAGMENT_PAYLOAD);
          done();
        }).catch(done.fail);
      });

      it('action payload contains fragment information', () => {
        store.dispatch(fetchFragmentDetail(FRAGMENT_CODE)).then(() => {
          const actions = store.getActions();
          expect(actions[0].payload.fragment).toEqual(GET_FRAGMENT_PAYLOAD);
        });
      });
    });

    describe('test fetchWidgetTypes', () => {
      it('action payload contains widgetTypes list', () => {
        getWidgetTypes.mockReturnValue(new Promise(resolve => resolve(WIDGET_TYPES_PAYLOAD)));
        store.dispatch(fetchWidgetTypes()).then(() => {
          const actions = store.getActions();
          expect(actions[0].type).toEqual(SET_WIDGET_TYPES);
          expect(actions[0].payload.widgetTypes).toEqual(WIDGET_TYPES_PAYLOAD.payload);
        });
      });
    });

    describe('test fetchPlugins', () => {
      it('action payload contains plugins list', () => {
        getPlugins.mockReturnValue(new Promise(resolve => resolve(PLUGINS_PAYLOAD)));
        store.dispatch(fetchPlugins()).then(() => {
          const actions = store.getActions();
          expect(actions[0].type).toEqual(SET_PLUGINS);
          expect(actions[0].payload.plugins).toEqual(PLUGINS_PAYLOAD.payload);
        });
      });
    });
    describe('fetchFragmentSettings', () => {
      it('if API response is ok, initializes the form with fragmentSettings information', (done) => {
        store.dispatch(fetchFragmentSettings()).then(() => {
          expect(initialize).toHaveBeenCalled();
          done();
        }).catch(done.fail);
      });

      it('if API response is not ok, dispatch ADD_ERRORS', (done) => {
        getFragmentSettings.mockImplementation(mockApi({ errors: true }));
        store.dispatch(fetchFragmentSettings()).then(() => {
          expect(store.getActions()).toHaveLength(1);
          expect(store.getActions()[0]).toHaveProperty('type', ADD_ERRORS);
          done();
        }).catch(done.fail);
      });
    });

    describe('updateFragmentSettings', () => {
      beforeEach(() => {
        putFragmentSettings.mockImplementation(mockApi({ payload: FRAGMENT_SETTINGS }));
      });

      it('action payload contains fragment settings information', (done) => {
        store.dispatch(updateFragmentSettings(FRAGMENT_SETTINGS)).then(() => {
          const actions = store.getActions();
          expect(initialize).toHaveBeenCalled();
          expect(actions).toHaveLength(2);
          expect(actions[0]).toHaveProperty('payload', FRAGMENT_SETTINGS);
          expect(actions[1]).toHaveProperty('type', ADD_ALERT);
          done();
        }).catch(done.fail);
      });

      it('if API response ok, initializes the form with reponse data information', (done) => {
        store.dispatch(updateFragmentSettings(FRAGMENT_SETTINGS)).then(() => {
          expect(initialize).toHaveBeenCalledWith('fragmentSettings', FRAGMENT_SETTINGS);
          done();
        }).catch(done.fail);
      });

      it('if API response is not ok, dispatch ADD_ERRORS', (done) => {
        putFragmentSettings.mockImplementation(mockApi({ errors: true }));
        store.dispatch(updateFragmentSettings()).then(() => {
          const actions = store.getActions();
          expect(actions).toHaveLength(2);
          expect(actions[0]).toHaveProperty('type', ADD_ERRORS);
          expect(actions[1]).toHaveProperty('type', ADD_ALERT);
          done();
        }).catch(done.fail);
      });
    });
    describe('sendDeleteFragment', () => {
      it('calls deleteFragment and dispatch action REMOVE_FRAGMENT', (done) => {
        store.dispatch(sendDeleteFragment('CODE')).then(() => {
          expect(deleteFragment).toHaveBeenCalled();
          const actions = store.getActions();
          expect(actions).toHaveLength(1);
          expect(actions[0]).toHaveProperty('type', REMOVE_FRAGMENT);
          done();
        }).catch(done.fail);
      });

      it('if API response is not ok, dispatch ADD_ERRORS', (done) => {
        deleteFragment.mockImplementation(mockApi({ errors: true }));
        store.dispatch(sendDeleteFragment()).then(() => {
          expect(deleteFragment).toHaveBeenCalled();
          const actions = store.getActions();
          expect(actions).toHaveLength(1);
          expect(actions[0]).toHaveProperty('type', ADD_ERRORS);
          done();
        }).catch(done.fail);
      });
    });
  });
});
