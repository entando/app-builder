import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { config } from '@entando/apimanager';

import { mockApi } from 'test/testUtils';

import {
  setDEComponents,
  fetchDEComponents,
  setSelectedDEComponent,
  startComponentInstallation,
  finishComponentInstallation,
  failComponentInstallation,
} from 'state/digital-exchange/components/actions';
import { LIST_DE_COMPONENTS_OK, GET_DE_COMPONENT_OK } from 'test/mocks/digital-exchange/components';
import { getDEComponents } from 'api/digital-exchange/components';
import {
  SET_DE_COMPONENTS,
  SET_SELECTED_DE_COMPONENT,
  START_COMPONENT_INSTALLATION,
  FINISH_COMPONENT_INSTALLATION,
  FAIL_COMPONENT_INSTALLATION,
} from 'state/digital-exchange/components/types';

import { TOGGLE_LOADING } from 'state/loading/types';
import { SET_PAGE } from 'state/pagination/types';
import { ADD_ERRORS } from '@entando/messages';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

config(mockStore({ api: { useMocks: true }, currentUser: { token: 'asdf' } }));


const INITIAL_STATE = {
  digitalExchangeComponents: {
    list: [],
  },
};

const GET_DE_COMPONENT_PAYLOAD = GET_DE_COMPONENT_OK.payload;

jest.mock('api/digital-exchange/components');


describe('state/digital-exchange/components/actions', () => {
  let store;
  let action;

  beforeEach(() => {
    store = mockStore(INITIAL_STATE);
    jest.clearAllMocks();
    store.clearActions();
  });

  describe('startComponentInstallation', () => {
    it('returns the correct object', () => {
      action = startComponentInstallation('my-component');
      expect(action).toHaveProperty('type', START_COMPONENT_INSTALLATION);
      expect(action).toHaveProperty('payload');
      expect(action).toHaveProperty('payload.id', 'my-component');
    });
  });

  describe('finishComponentInstallation', () => {
    it('returns the correct object', () => {
      action = finishComponentInstallation('my-component');
      expect(action).toHaveProperty('type', FINISH_COMPONENT_INSTALLATION);
      expect(action).toHaveProperty('payload');
      expect(action).toHaveProperty('payload.id', 'my-component');
    });
  });

  describe('failComponentInstallation', () => {
    it('returns the correct object', () => {
      action = failComponentInstallation('my-component');
      expect(action).toHaveProperty('type', FAIL_COMPONENT_INSTALLATION);
      expect(action).toHaveProperty('payload');
      expect(action).toHaveProperty('payload.id', 'my-component');
    });
  });

  describe('setDEComponents', () => {
    it('test setDEComponents action sets the correct type', () => {
      action = setDEComponents(LIST_DE_COMPONENTS_OK);
      expect(action).toHaveProperty('type', SET_DE_COMPONENTS);
    });
  });

  describe('fetchDEComponents', () => {
    beforeEach(() => {
      getDEComponents.mockImplementation(mockApi({ payload: LIST_DE_COMPONENTS_OK }));
    });
    it('fetchDEComponents calls setDEComponents and setPage actions', (done) => {
      store.dispatch(fetchDEComponents()).then(() => {
        const actions = store.getActions();
        expect(actions).toHaveLength(4);
        expect(actions[0]).toHaveProperty('type', TOGGLE_LOADING);
        expect(actions[1]).toHaveProperty('type', SET_DE_COMPONENTS);
        expect(actions[2]).toHaveProperty('type', SET_PAGE);
        expect(actions[3]).toHaveProperty('type', TOGGLE_LOADING);
        done();
      }).catch(done.fail);
    });

    it('fetchDEComponents as error and dispatch ADD_ERRORS ', (done) => {
      getDEComponents.mockImplementation(mockApi({ errors: true }));
      store.dispatch(fetchDEComponents()).then(() => {
        const actions = store.getActions();
        expect(actions).toHaveLength(3);
        expect(actions[0]).toHaveProperty('type', TOGGLE_LOADING);
        expect(actions[1]).toHaveProperty('type', ADD_ERRORS);
        expect(actions[2]).toHaveProperty('type', TOGGLE_LOADING);
        done();
      }).catch(done.fail);
    });

    it('components is defined and properly valued', (done) => {
      store.dispatch(fetchDEComponents()).then(() => {
        const actionPayload = store.getActions()[1].payload;
        expect(actionPayload.digitalExchangeComponents).toHaveLength(5);
        const digitalExchangeComponent = actionPayload.digitalExchangeComponents[1];
        expect(digitalExchangeComponent).toHaveProperty('id', 'a7233e30-e6f0-4c90-9786-e3667113be12');
        expect(digitalExchangeComponent).toHaveProperty('name', 'Avatar plugin');
        expect(digitalExchangeComponent).toHaveProperty('lastUpdate', '2018-08-22');
        expect(digitalExchangeComponent).toHaveProperty('digitalExchange', 'Entando');
        expect(digitalExchangeComponent).toHaveProperty('version', '5.1.0');
        expect(digitalExchangeComponent).toHaveProperty('type', 'widget');
        expect(digitalExchangeComponent).toHaveProperty('description', 'lorem ipsum');
        expect(digitalExchangeComponent).toHaveProperty('image', '');
        expect(digitalExchangeComponent).toHaveProperty('rating', 3.4);
        done();
      }).catch(done.fail);
    });

    describe('test sync actions', () => {
      it('action payload contains selected component', () => {
        action = setSelectedDEComponent(GET_DE_COMPONENT_PAYLOAD);
        expect(action).toHaveProperty('type', SET_SELECTED_DE_COMPONENT);
        expect(action.payload).toHaveProperty('component', GET_DE_COMPONENT_PAYLOAD);
      });
    });
  });
});
