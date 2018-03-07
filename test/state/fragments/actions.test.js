
import {
  fetchFragment, fetchFragmentDetail, fetchWidgetTypes,
  fetchPlugins, setWidgetTypes, setPlugins, setSelectedFragment,
} from 'state/fragments/actions';
import { BODY_OK, WIDGET_TYPES_PAYLOAD, PLUGINS_PAYLOAD } from 'test/mocks/fragment';
import {
  SET_SELECTED, SET_WIDGET_TYPES,
  SET_PLUGINS,
} from 'state/fragments/types';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const FRAGMENT_MOCK = BODY_OK.payload;

const FRAGMENT_CODE = 'test_fragment';

const FORM_MOCK_INITIAL_STATE = {
  form: {},
};

const FRAGMENTS_INITIAL_STATE = {
  fragments: {},
};

describe('state/fragments/actions', () => {
  beforeEach(jest.clearAllMocks);

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
        const action = setSelectedFragment(FRAGMENT_MOCK);
        expect(action.type).toBe(SET_SELECTED);
        expect(action.payload.fragment).toEqual(FRAGMENT_MOCK);
      });
    });
  });

  describe('test thunks', () => {
    describe('test fetchFragment', () => {
      const store = mockStore(FORM_MOCK_INITIAL_STATE);
      it('action payload contains fragment information', () => {
        store.dispatch(fetchFragment(FRAGMENT_CODE)).then(() => {
          const actions = store.getActions();
          expect(actions[0].payload).toEqual(FRAGMENT_MOCK);
        });
      });

      it('action payload contains fragment information', () => {
        store.dispatch(fetchFragmentDetail(FRAGMENT_CODE)).then(() => {
          const actions = store.getActions();
          expect(actions[0].payload).toEqual(FRAGMENT_MOCK);
        });
      });
    });

    describe('test fetchWidgetTypes', () => {
      const store = mockStore(FRAGMENTS_INITIAL_STATE);
      it('action payload contains widgetTypes list', () => {
        store.dispatch(fetchWidgetTypes()).then(() => {
          const actions = store.getActions();
          expect(actions[0].type).toEqual(SET_WIDGET_TYPES);
          expect(actions[0].payload.widgetTypes).toEqual(WIDGET_TYPES_PAYLOAD);
        });
      });
    });

    describe('test fetchPlugins', () => {
      const store = mockStore(FRAGMENTS_INITIAL_STATE);
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
