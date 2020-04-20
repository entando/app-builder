/* eslint-disable prefer-promise-reject-errors */
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { config } from '@entando/apimanager';

import { mockApi } from 'test/testUtils';

import pollApi from 'helpers/pollApi';

import {
  setECRComponents,
  fetchECRComponents,
  installECRComponent,
  uninstallECRComponent,
  setSelectedECRComponent,
  startComponentInstallation,
  finishComponentInstallation,
  startComponentUninstall,
  finishComponentUninstall,
} from 'state/component-repository/components/actions';
import {
  LIST_ECR_COMPONENTS_OK,
  GET_ECR_COMPONENT_OK,
  COMPONENT_INSTALLATION_CREATED,
  COMPONENT_INSTALLATION_COMPLETED,
  COMPONENT_UNINSTALLATION_CREATED,
  COMPONENT_UNINSTALLATION_COMPLETED,
} from 'test/mocks/component-repository/components';
import { getECRComponents, postECRComponentInstall, postECRComponentUninstall } from 'api/component-repository/components';
import {
  SET_ECR_COMPONENTS,
  SET_SELECTED_ECR_COMPONENT,
  START_COMPONENT_INSTALLATION,
  FINISH_COMPONENT_INSTALLATION,
  COMPONENT_INSTALLATION_FAILED,
  START_COMPONENT_UNINSTALLATION,
  FINISH_COMPONENT_UNINSTALLATION,
  COMPONENT_UNINSTALLATION_FAILED,
} from 'state/component-repository/components/types';

import { TOGGLE_LOADING } from 'state/loading/types';
import { SET_PAGE } from 'state/pagination/types';
import { ADD_ERRORS, ADD_TOAST, CLEAR_ERRORS } from '@entando/messages';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

config(mockStore({ api: { useMocks: true }, currentUser: { token: 'asdf' } }));

const INITIAL_STATE = {
  componentRepositoryComponents: {
    list: [],
  },
};

jest.mock('api/component-repository/components');
jest.mock('helpers/pollApi');


describe('state/component-repository/components/actions', () => {
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

  describe('setECRComponents', () => {
    it('test setECRComponents action sets the correct type', () => {
      action = setECRComponents(LIST_ECR_COMPONENTS_OK);
      expect(action).toHaveProperty('type', SET_ECR_COMPONENTS);
    });
  });

  describe('installECRComponent', () => {
    beforeEach(() => {
      postECRComponentInstall.mockImplementation(mockApi({
        payload: COMPONENT_INSTALLATION_CREATED,
      }));
    });

    it('installECRComponent dispatches proper actions if component is installed', (done) => {
      pollApi.mockImplementation(() => Promise.resolve({
        payload: COMPONENT_INSTALLATION_COMPLETED,
      }));

      store.dispatch(installECRComponent(GET_ECR_COMPONENT_OK)).then(() => {
        const actions = store.getActions();
        expect(actions).toHaveLength(4);
        expect(actions[0]).toHaveProperty('type', TOGGLE_LOADING);
        expect(actions[1]).toHaveProperty('type', START_COMPONENT_INSTALLATION);
        expect(actions[2]).toHaveProperty('type', TOGGLE_LOADING);
        expect(actions[3]).toHaveProperty('type', FINISH_COMPONENT_INSTALLATION);
        done();
      }).catch(done.fail);
    });

    it('installECRComponent dispatches proper actions if timeout', (done) => {
      pollApi.mockImplementation(() => Promise.reject({
        errors: [{ message: 'Polling timed out' }],
      }));

      store.dispatch(installECRComponent(GET_ECR_COMPONENT_OK)).then(() => {
        const actions = store.getActions();
        expect(actions).toHaveLength(6);
        expect(actions[0]).toHaveProperty('type', TOGGLE_LOADING);
        expect(actions[1]).toHaveProperty('type', START_COMPONENT_INSTALLATION);
        expect(actions[2]).toHaveProperty('type', TOGGLE_LOADING);
        expect(actions[3]).toHaveProperty('type', ADD_TOAST);
        expect(actions[4]).toHaveProperty('type', COMPONENT_INSTALLATION_FAILED);
        expect(actions[5]).toHaveProperty('type', ADD_ERRORS);
        done();
      }).catch(done.fail);
    });

    it('installECRComponent dispatches proper actions if error', (done) => {
      postECRComponentInstall.mockImplementation(mockApi({ errors: true }));
      store.dispatch(installECRComponent(GET_ECR_COMPONENT_OK)).then(() => {
        const actions = store.getActions();
        expect(actions).toHaveLength(3);
        expect(actions[0]).toHaveProperty('type', TOGGLE_LOADING);
        expect(actions[1]).toHaveProperty('type', ADD_ERRORS);
        expect(actions[2]).toHaveProperty('type', TOGGLE_LOADING);
        done();
      }).catch(done.fail);
    });
  });

  describe('uninstallECRComponent', () => {
    beforeEach(() => {
      postECRComponentUninstall.mockImplementation(mockApi({
        payload: COMPONENT_UNINSTALLATION_CREATED,
      }));
    });

    it('uninstallECRComponent dispatches proper actions if component is uninstalled', (done) => {
      pollApi.mockImplementation(() => Promise.resolve({
        payload: COMPONENT_UNINSTALLATION_COMPLETED,
      }));

      store.dispatch(uninstallECRComponent(GET_ECR_COMPONENT_OK.id)).then(() => {
        const actions = store.getActions();
        expect(actions).toHaveLength(4);
        expect(actions[0]).toHaveProperty('type', TOGGLE_LOADING);
        expect(actions[1]).toHaveProperty('type', START_COMPONENT_UNINSTALLATION);
        expect(actions[2]).toHaveProperty('type', TOGGLE_LOADING);
        expect(actions[3]).toHaveProperty('type', FINISH_COMPONENT_UNINSTALLATION);
        done();
      }).catch(done.fail);
    });

    it('uninstallECRComponent dispatches proper actions if timeout', (done) => {
      pollApi.mockImplementation(() => Promise.reject({
        errors: [{ message: 'Polling timed out' }],
      }));

      store.dispatch(uninstallECRComponent(GET_ECR_COMPONENT_OK.id)).then(() => {
        const actions = store.getActions();
        expect(actions).toHaveLength(6);
        expect(actions[0]).toHaveProperty('type', TOGGLE_LOADING);
        expect(actions[1]).toHaveProperty('type', START_COMPONENT_UNINSTALLATION);
        expect(actions[2]).toHaveProperty('type', TOGGLE_LOADING);
        expect(actions[3]).toHaveProperty('type', ADD_TOAST);
        expect(actions[4]).toHaveProperty('type', COMPONENT_UNINSTALLATION_FAILED);
        expect(actions[5]).toHaveProperty('type', ADD_ERRORS);
        done();
      }).catch(done.fail);
    });

    it('uninstallECRComponent dispatches proper actions if error', (done) => {
      postECRComponentUninstall.mockImplementation(mockApi({ errors: true }));
      store.dispatch(uninstallECRComponent(GET_ECR_COMPONENT_OK.id)).then(() => {
        const actions = store.getActions();
        expect(actions).toHaveLength(3);
        expect(actions[0]).toHaveProperty('type', TOGGLE_LOADING);
        expect(actions[1]).toHaveProperty('type', ADD_ERRORS);
        expect(actions[2]).toHaveProperty('type', TOGGLE_LOADING);
        done();
      }).catch(done.fail);
    });
  });

  describe('fetchECRComponents', () => {
    beforeEach(() => {
      getECRComponents.mockImplementation(mockApi({ payload: LIST_ECR_COMPONENTS_OK }));
    });
    it('fetchECRComponents calls setECRComponents and setPage actions', (done) => {
      store.dispatch(fetchECRComponents()).then(() => {
        const actions = store.getActions();
        expect(actions).toHaveLength(4);
        expect(actions[0]).toHaveProperty('type', TOGGLE_LOADING);
        expect(actions[1]).toHaveProperty('type', SET_ECR_COMPONENTS);
        expect(actions[2]).toHaveProperty('type', SET_PAGE);
        expect(actions[3]).toHaveProperty('type', TOGGLE_LOADING);
        done();
      }).catch(done.fail);
    });

    it('fetchECRComponents has error and dispatch ADD_ERRORS ', (done) => {
      getECRComponents.mockImplementation(mockApi({ errors: true }));
      store.dispatch(fetchECRComponents()).then(() => {
        const actions = store.getActions();
        expect(actions).toHaveLength(5);
        expect(actions[0]).toHaveProperty('type', TOGGLE_LOADING);
        expect(actions[1]).toHaveProperty('type', ADD_ERRORS);
        expect(actions[2]).toHaveProperty('type', ADD_TOAST);
        expect(actions[3]).toHaveProperty('type', CLEAR_ERRORS);
        expect(actions[4]).toHaveProperty('type', TOGGLE_LOADING);
        done();
      }).catch(done.fail);
    });

    it('components are defined and properly valued', (done) => {
      store.dispatch(fetchECRComponents()).then(() => {
        const actionPayload = store.getActions()[1].payload;
        expect(actionPayload.componentRepositoryComponents).toHaveLength(5);
        const componentRepositoryComponent = actionPayload.componentRepositoryComponents[1];
        expect(componentRepositoryComponent).toHaveProperty('id', 'a7233e30-e6f0-4c90-9786-e3667113be12');
        expect(componentRepositoryComponent).toHaveProperty('name', 'Avatar plugin');
        expect(componentRepositoryComponent).toHaveProperty('lastUpdate', '2018-08-22');
        expect(componentRepositoryComponent).toHaveProperty('digitalExchangeName', 'Entando');
        expect(componentRepositoryComponent).toHaveProperty('digitalExchangeId', 'entando');
        expect(componentRepositoryComponent).toHaveProperty('version', '5.1.0');
        expect(componentRepositoryComponent).toHaveProperty('type', 'widget');
        expect(componentRepositoryComponent).toHaveProperty('description', 'lorem ipsum');
        expect(componentRepositoryComponent).toHaveProperty('image', '');
        expect(componentRepositoryComponent).toHaveProperty('rating', 3.4);
        done();
      }).catch(done.fail);
    });

    describe('test sync actions', () => {
      it('action payload contains selected component', () => {
        action = setSelectedECRComponent(GET_ECR_COMPONENT_OK);
        expect(action).toHaveProperty('type', SET_SELECTED_ECR_COMPONENT);
        expect(action.payload).toHaveProperty('componentRepositoryComponent', GET_ECR_COMPONENT_OK);
      });
    });
  });
});
