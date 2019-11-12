/* eslint-disable prefer-promise-reject-errors */
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { config } from '@entando/apimanager';

import { mockApi } from 'test/testUtils';

import pollApi from 'helpers/pollApi';

import {
  setDEComponents,
  fetchDEComponents,
  installDEComponent,
  uninstallDEComponent,
  setSelectedDEComponent,
  startComponentInstallation,
  finishComponentInstallation,
  startComponentUninstall,
  finishComponentUninstall,
} from 'state/digital-exchange/components/actions';
import {
  LIST_DE_COMPONENTS_OK,
  GET_DE_COMPONENT_OK,
  COMPONENT_INSTALLATION_CREATED,
  COMPONENT_INSTALLATION_COMPLETED,
  COMPONENT_UNINSTALLATION_CREATED,
  COMPONENT_UNINSTALLATION_COMPLETED,
} from 'test/mocks/digital-exchange/components';
import { getDEComponents, postDEComponentInstall, postDEComponentUninstall } from 'api/digital-exchange/components';
import {
  SET_DE_COMPONENTS,
  SET_SELECTED_DE_COMPONENT,
  START_COMPONENT_INSTALLATION,
  FINISH_COMPONENT_INSTALLATION,
  COMPONENT_INSTALLATION_FAILED,
  START_COMPONENT_UNINSTALLATION,
  FINISH_COMPONENT_UNINSTALLATION,
  COMPONENT_UNINSTALLATION_FAILED,
} from 'state/digital-exchange/components/types';

import { TOGGLE_LOADING } from 'state/loading/types';
import { SET_PAGE } from 'state/pagination/types';
import { ADD_ERRORS, ADD_TOAST } from '@entando/messages';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

config(mockStore({ api: { useMocks: true }, currentUser: { token: 'asdf' } }));

const INITIAL_STATE = {
  digitalExchangeComponents: {
    list: [],
  },
};

jest.mock('api/digital-exchange/components');
jest.mock('helpers/pollApi');


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

  describe('startComponentUninstall', () => {
    it('returns the correct object', () => {
      action = startComponentUninstall('my-component');
      expect(action).toHaveProperty('type', START_COMPONENT_UNINSTALLATION);
      expect(action).toHaveProperty('payload');
      expect(action).toHaveProperty('payload.id', 'my-component');
    });
  });

  describe('finishComponentUninstall', () => {
    it('returns the correct object', () => {
      action = finishComponentUninstall('my-component');
      expect(action).toHaveProperty('type', FINISH_COMPONENT_UNINSTALLATION);
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

  describe('installDEComponent', () => {
    beforeEach(() => {
      postDEComponentInstall.mockImplementation(mockApi({
        payload: COMPONENT_INSTALLATION_CREATED,
      }));
    });

    it('installDEComponent dispatches proper actions if component is installed', (done) => {
      pollApi.mockImplementation(() => Promise.resolve({
        payload: COMPONENT_INSTALLATION_COMPLETED,
      }));

      store.dispatch(installDEComponent(GET_DE_COMPONENT_OK)).then(() => {
        const actions = store.getActions();
        expect(actions).toHaveLength(2);
        expect(actions[0]).toHaveProperty('type', START_COMPONENT_INSTALLATION);
        expect(actions[1]).toHaveProperty('type', FINISH_COMPONENT_INSTALLATION);
        done();
      }).catch(done.fail);
    });

    it('installDEComponent dispatches proper actions if timeout', (done) => {
      pollApi.mockImplementation(() => Promise.reject({
        errors: [{ message: 'Polling timed out' }],
      }));

      store.dispatch(installDEComponent(GET_DE_COMPONENT_OK)).then(() => {
        const actions = store.getActions();
        expect(actions).toHaveLength(4);
        expect(actions[0]).toHaveProperty('type', START_COMPONENT_INSTALLATION);
        expect(actions[1]).toHaveProperty('type', ADD_TOAST);
        expect(actions[2]).toHaveProperty('type', COMPONENT_INSTALLATION_FAILED);
        expect(actions[3]).toHaveProperty('type', ADD_ERRORS);
        done();
      }).catch(done.fail);
    });

    it('installDEComponent dispatches proper actions if error', (done) => {
      postDEComponentInstall.mockImplementation(mockApi({ errors: true }));
      store.dispatch(installDEComponent(GET_DE_COMPONENT_OK)).then(() => {
        const actions = store.getActions();
        expect(actions).toHaveLength(1);
        expect(actions[0]).toHaveProperty('type', ADD_ERRORS);
        done();
      }).catch(done.fail);
    });
  });

  describe('uninstallDEComponent', () => {
    beforeEach(() => {
      postDEComponentUninstall.mockImplementation(mockApi({
        payload: COMPONENT_UNINSTALLATION_CREATED,
      }));
    });

    it('uninstallDEComponent dispatches proper actions if component is uninstalled', (done) => {
      pollApi.mockImplementation(() => Promise.resolve({
        payload: COMPONENT_UNINSTALLATION_COMPLETED,
      }));

      store.dispatch(uninstallDEComponent(GET_DE_COMPONENT_OK.id)).then(() => {
        const actions = store.getActions();
        expect(actions).toHaveLength(2);
        expect(actions[0]).toHaveProperty('type', START_COMPONENT_UNINSTALLATION);
        expect(actions[1]).toHaveProperty('type', FINISH_COMPONENT_UNINSTALLATION);
        done();
      }).catch(done.fail);
    });

    it('uninstallDEComponent dispatches proper actions if timeout', (done) => {
      pollApi.mockImplementation(() => Promise.reject({
        errors: [{ message: 'Polling timed out' }],
      }));

      store.dispatch(uninstallDEComponent(GET_DE_COMPONENT_OK.id)).then(() => {
        const actions = store.getActions();
        expect(actions).toHaveLength(4);
        expect(actions[0]).toHaveProperty('type', START_COMPONENT_UNINSTALLATION);
        expect(actions[1]).toHaveProperty('type', ADD_TOAST);
        expect(actions[2]).toHaveProperty('type', COMPONENT_UNINSTALLATION_FAILED);
        expect(actions[3]).toHaveProperty('type', ADD_ERRORS);
        done();
      }).catch(done.fail);
    });

    it('uninstallDEComponent dispatches proper actions if error', (done) => {
      postDEComponentUninstall.mockImplementation(mockApi({ errors: true }));
      store.dispatch(uninstallDEComponent(GET_DE_COMPONENT_OK.id)).then(() => {
        const actions = store.getActions();
        expect(actions).toHaveLength(1);
        expect(actions[0]).toHaveProperty('type', ADD_ERRORS);
        done();
      }).catch(done.fail);
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

    it('fetchDEComponents has error and dispatch ADD_ERRORS ', (done) => {
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

    it('components are defined and properly valued', (done) => {
      store.dispatch(fetchDEComponents()).then(() => {
        const actionPayload = store.getActions()[1].payload;
        expect(actionPayload.digitalExchangeComponents).toHaveLength(5);
        const digitalExchangeComponent = actionPayload.digitalExchangeComponents[1];
        expect(digitalExchangeComponent).toHaveProperty('id', 'a7233e30-e6f0-4c90-9786-e3667113be12');
        expect(digitalExchangeComponent).toHaveProperty('name', 'Avatar plugin');
        expect(digitalExchangeComponent).toHaveProperty('lastUpdate', '2018-08-22');
        expect(digitalExchangeComponent).toHaveProperty('digitalExchangeName', 'Entando');
        expect(digitalExchangeComponent).toHaveProperty('digitalExchangeId', 'entando');
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
        action = setSelectedDEComponent(GET_DE_COMPONENT_OK);
        expect(action).toHaveProperty('type', SET_SELECTED_DE_COMPONENT);
        expect(action.payload).toHaveProperty('digitalExchangeComponent', GET_DE_COMPONENT_OK);
      });
    });
  });
});
