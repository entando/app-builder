import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { config } from 'api/apiManager';
import {
  fetchFragment, fetchFragmentDetail, fetchWidgetTypes, setFragments, fetchFragments,
  fetchPlugins, setWidgetTypes, setPlugins, setSelectedFragment,
} from 'state/fragments/actions';
import {
  WIDGET_TYPES_OK,
  PLUGINS_OK,
  GET_FRAGMENT_OK,
  LIST_FRAGMENTS_OK,
} from 'test/mocks/fragments';
import {
  SET_SELECTED, SET_WIDGET_TYPES,
  SET_PLUGINS, SET_FRAGMENTS,
} from 'state/fragments/types';

import { SET_PAGE } from 'state/pagination/types';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

config(mockStore({ api: { useMocks: true }, currentUser: { token: 'asdf' } }));
jest.unmock('api/fragments');

const GET_FRAGMENT_PAYLOAD = GET_FRAGMENT_OK.payload;
const WIDGET_TYPES_PAYLOAD = WIDGET_TYPES_OK.payload;
const PLUGINS_PAYLOAD = PLUGINS_OK.payload;

const FRAGMENT_CODE = 'myCode';

const INITIAL_STATE = {
  form: {},
  fragments: {
    list: [],
    widgetTypes: [],
    plugins: [],
  },
};

describe('fragment actions', () => {
  let store;

  beforeEach(() => {
    store = mockStore(INITIAL_STATE);
  });

  describe('fetchFragment', () => {
    it('action payload contains fragment information', (done) => {
      store.dispatch(fetchFragment(FRAGMENT_CODE)).then(() => {
        const actions = store.getActions();
        expect(actions[0].payload).toEqual(GET_FRAGMENT_PAYLOAD);
        done();
      });
    });

    it('action payload contains fragment information', (done) => {
      store.dispatch(fetchFragmentDetail(FRAGMENT_CODE)).then(() => {
        const actions = store.getActions();
        expect(actions[0].payload.fragment).toEqual(GET_FRAGMENT_PAYLOAD);
        done();
      });
    });
  });

  describe('setFragments', () => {
    it('test setFragments action sets the correct type', () => {
      const action = setFragments(LIST_FRAGMENTS_OK.payload);
      expect(action.type).toEqual(SET_FRAGMENTS);
    });
  });

  describe('fetchFragments', () => {
    it('fetchFragments calls setFragments and setPage actions', (done) => {
      store.dispatch(fetchFragments()).then(() => {
        const actions = store.getActions();
        expect(actions).toHaveLength(2);
        expect(actions[0].type).toEqual(SET_FRAGMENTS);
        expect(actions[1].type).toEqual(SET_PAGE);
        done();
      });
    });

    it('fragments is defined and properly valued', (done) => {
      store.dispatch(fetchFragments()).then(() => {
        const actionPayload = store.getActions()[0].payload;
        expect(actionPayload.fragments).toHaveLength(7);
        const fragment = actionPayload.fragments[0];
        expect(fragment).toHaveProperty('code', 'myCode');
        expect(fragment).toHaveProperty('isLocked');
        expect(fragment).toHaveProperty('widgetType');
        expect(fragment).toHaveProperty('pluginCode');
        done();
      });
    });

    it('fragments page two is retrieved correctly and properly valued', (done) => {
      store.dispatch(fetchFragments({ page: 2, pageSize: 2 })).then(() => {
        const actionPayload = store.getActions()[0].payload;
        expect(actionPayload.fragments).toHaveLength(2);
        expect(actionPayload.fragments[0]).toHaveProperty('code', 'myCode3');
        expect(actionPayload.fragments[1]).toHaveProperty('code', 'myCode4');
        done();
      });
    });

    it('page is defined and properly valued', (done) => {
      store.dispatch(fetchFragments()).then(() => {
        const actionPayload = store.getActions()[1].payload.page;
        expect(actionPayload).toHaveProperty('page', 1);
        expect(actionPayload).toHaveProperty('pageSize', 10);
        expect(actionPayload).toHaveProperty('lastPage', 1);
        expect(actionPayload).toHaveProperty('totalItems', 7);
        done();
      });
    });

    it('page 2 is defined and properly valued', (done) => {
      store.dispatch(fetchFragments({ page: 2, pageSize: 2 })).then(() => {
        const actionPayload = store.getActions()[1].payload.page;
        expect(actionPayload).toHaveProperty('page', 2);
        expect(actionPayload).toHaveProperty('pageSize', 2);
        expect(actionPayload).toHaveProperty('lastPage', 4);
        expect(actionPayload).toHaveProperty('totalItems', 7);
        done();
      });
    });
  });

  describe('test sync actions', () => {
    describe('test setWidgetTypes', () => {
      it('action payload contains widgetTypes list', () => {
        const action = setWidgetTypes(WIDGET_TYPES_PAYLOAD);
        expect(action.type).toBe(SET_WIDGET_TYPES);
        expect(action.payload.widgetTypes).toEqual(WIDGET_TYPES_PAYLOAD);
      });
    });
    describe('test setPlugins', () => {
      it('action payload contains plugins list', () => {
        const action = setPlugins(PLUGINS_PAYLOAD);
        expect(action.type).toBe(SET_PLUGINS);
        expect(action.payload.plugins).toEqual(PLUGINS_PAYLOAD);
      });
    });
    describe('test setSelectedFragment', () => {
      it('action payload contains selected fragment', () => {
        const action = setSelectedFragment(GET_FRAGMENT_PAYLOAD);
        expect(action.type).toBe(SET_SELECTED);
        expect(action.payload.fragment).toEqual(GET_FRAGMENT_PAYLOAD);
      });
    });
  });

  describe('test thunks', () => {
    describe('test fetchFragment', () => {
      it('action payload contains fragment information', () => {
        store.dispatch(fetchFragment(FRAGMENT_CODE)).then(() => {
          const actions = store.getActions();
          expect(actions[0].payload).toEqual(GET_FRAGMENT_PAYLOAD);
        });
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
        store.dispatch(fetchWidgetTypes()).then(() => {
          const actions = store.getActions();
          expect(actions[0].type).toEqual(SET_WIDGET_TYPES);
          expect(actions[0].payload.widgetTypes).toEqual(WIDGET_TYPES_PAYLOAD);
        });
      });
    });

    describe('test fetchPlugins', () => {
      it('action payload contains plugins list', () => {
        store.dispatch(fetchPlugins()).then(() => {
          const actions = store.getActions();
          expect(actions[0].type).toEqual(SET_PLUGINS);
          expect(actions[0].payload.plugins).toEqual(PLUGINS_PAYLOAD);
        });
      });
    });
  });
});
