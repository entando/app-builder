import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { config } from '@entando/apimanager';

import { mockApi } from 'test/testUtils';

import {
  setComponentRepositories,
  setSelectedComponentRepository,
  removeComponentRepository,
  fetchComponentRepositories,
  fetchComponentRepository,
  sendPostComponentRepository,
  sendPutComponentRepository,
  sendDeleteComponentRepository,
} from 'state/component-repository/component-repositories/actions';
import { LIST_COMPONENT_REPOSITORIES_OK, COMPONENT_REPOSITORY_OK } from 'test/mocks/component-repository/componentRepositories';
import {
  getComponentRepositories,
  getComponentRepository,
  postComponentRepository,
  putComponentRepository,
  deleteComponentRepository,
} from 'api/component-repository/componentRepositories';
import {
  SET_COMPONENT_REPOSITORIES,
  SET_SELECTED_COMPONENT_REPOSITORY,
  REMOVE_COMPONENT_REPOSITORY,
} from 'state/component-repository/component-repositories/types';


import { TOGGLE_LOADING } from 'state/loading/types';
import { SET_PAGE } from 'state/pagination/types';
import { ADD_TOAST, ADD_ERRORS, TOAST_ERROR, TOAST_SUCCESS } from '@entando/messages';
import { history, ROUTE_ECR_CONFIG_LIST } from 'app-init/router';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

config(mockStore({ api: { useMocks: true }, currentUser: { token: 'asdf' } }));


const INITIAL_STATE = {
  componentRepositories: {
    list: [],
  },
};

const COMPONENT_REPOSITORY_PAYLOAD = COMPONENT_REPOSITORY_OK.payload;

jest.mock('api/component-repository/componentRepositories');

jest.mock('app-init/router', () => ({
  history: {
    push: jest.fn(),
  },
}));


describe('state/component-repository/component-repositories/actions', () => {
  let store;
  let action;

  beforeEach(() => {
    store = mockStore(INITIAL_STATE);
    jest.clearAllMocks();
    store.clearActions();
  });

  describe('setComponentRepositories', () => {
    it('test setComponentRepositories action sets the correct type', () => {
      action = setComponentRepositories(LIST_COMPONENT_REPOSITORIES_OK);
      expect(action).toHaveProperty('type', SET_COMPONENT_REPOSITORIES);
    });
  });

  describe('setSelectedComponentRepository', () => {
    it('action payload contains selected component repository', () => {
      action = setSelectedComponentRepository(COMPONENT_REPOSITORY_PAYLOAD);
      expect(action).toHaveProperty('type', SET_SELECTED_COMPONENT_REPOSITORY);
      expect(action.payload).toHaveProperty('componentRepository', COMPONENT_REPOSITORY_PAYLOAD);
    });
  });

  describe('removeComponentRepository', () => {
    it('action payload contains component repository id', () => {
      action = removeComponentRepository(12);
      expect(action).toHaveProperty('type', REMOVE_COMPONENT_REPOSITORY);
      expect(action.payload).toHaveProperty('componentRepository', 12);
    });
  });

  describe('fetchComponentRepositories', () => {
    beforeEach(() => {
      getComponentRepositories.mockImplementation(mockApi({ payload: LIST_COMPONENT_REPOSITORIES_OK }));
    });

    it('fetchComponentRepositories calls setComponentRepositories and setPage actions', (done) => {
      store.dispatch(fetchComponentRepositories()).then(() => {
        const actions = store.getActions();
        expect(actions).toHaveLength(4);
        expect(actions[0]).toHaveProperty('type', TOGGLE_LOADING);
        expect(actions[1]).toHaveProperty('type', SET_COMPONENT_REPOSITORIES);
        expect(actions[2]).toHaveProperty('type', SET_PAGE);
        expect(actions[3]).toHaveProperty('type', TOGGLE_LOADING);
        done();
      }).catch(done.fail);
    });

    it('fetchComponentRepositories errors and dispatch ADD_ERRORS ', (done) => {
      getComponentRepositories.mockImplementation(mockApi({ errors: true }));
      store.dispatch(fetchComponentRepositories()).then(() => {
        const actions = store.getActions();
        expect(actions).toHaveLength(3);
        expect(actions[0]).toHaveProperty('type', TOGGLE_LOADING);
        expect(actions[1]).toHaveProperty('type', ADD_ERRORS);
        expect(actions[2]).toHaveProperty('type', TOGGLE_LOADING);

        done();
      }).catch(done.fail);
    });

    it('componentRepositories is defined and properly valued', (done) => {
      store.dispatch(fetchComponentRepositories()).then(() => {
        const actionPayload = store.getActions()[1].payload;
        expect(actionPayload.componentRepositories).toHaveLength(3);
        const componentRepository = actionPayload.componentRepositories[0];
        expect(componentRepository.name).toBe('Entando');
        done();
      }).catch(done.fail);
    });
  });

  describe('fetchComponentRepository', () => {
    beforeEach(() => {
      getComponentRepository.mockImplementation(mockApi({ payload: COMPONENT_REPOSITORY_OK }));
    });

    it('fetchComponentRepository calls setSelectedComponentRepository', (done) => {
      store.dispatch(fetchComponentRepository(12)).then(() => {
        expect(getComponentRepository).toHaveBeenCalledWith(12);
        const actions = store.getActions();
        expect(actions).toHaveLength(1);
        expect(actions[0]).toHaveProperty('type', SET_SELECTED_COMPONENT_REPOSITORY);
        done();
      }).catch(done.fail);
    });

    it('prepopulates the form if initForm is true', (done) => {
      store.dispatch(fetchComponentRepository(12, true)).then(() => {
        expect(getComponentRepository).toHaveBeenCalledWith(12);
        const actions = store.getActions();
        expect(actions).toHaveLength(2);
        expect(actions[0]).toHaveProperty('type', SET_SELECTED_COMPONENT_REPOSITORY);
        expect(actions[1]).toHaveProperty('type', '@@redux-form/INITIALIZE');
        expect(actions[1]).toHaveProperty('meta.form', 'ecrSettings');
        done();
      }).catch(done.fail);
    });

    it('fetchComponentRepository errors and dispatch ADD_ERRORS ', (done) => {
      getComponentRepository.mockImplementation(mockApi({ errors: true }));
      store.dispatch(fetchComponentRepository(12)).then(() => {
        const actions = store.getActions();
        expect(actions).toHaveLength(1);
        expect(actions[0]).toHaveProperty('type', ADD_ERRORS);

        done();
      }).catch(done.fail);
    });

    it('componentRepositories is defined and properly valued', (done) => {
      store.dispatch(fetchComponentRepository(12)).then(() => {
        const actionPayload = store.getActions()[0].payload;
        expect(actionPayload).toHaveProperty('componentRepository.name', 'Entando');
        done();
      }).catch(done.fail);
    });
  });

  describe('sendDeleteComponentRepository', () => {
    it('calls deleteComponentRepository, ADD_TOAST and removeComponentRepository actions', (done) => {
      deleteComponentRepository.mockImplementationOnce(mockApi({ errors: false }));
      store.dispatch(sendDeleteComponentRepository(12)).then(() => {
        expect(deleteComponentRepository).toHaveBeenCalledWith(12);
        const actions = store.getActions();
        expect(actions).toHaveLength(2);
        expect(actions[0]).toHaveProperty('type', REMOVE_COMPONENT_REPOSITORY);
        expect(actions[0]).toHaveProperty('payload');
        expect(actions[0]).toHaveProperty('payload.componentRepository', 12);
        expect(actions[1]).toHaveProperty('type', ADD_TOAST);
        expect(actions[1]).toHaveProperty('payload');
        expect(actions[1]).toHaveProperty('payload.type', TOAST_SUCCESS);
        done();
      }).catch(done.fail);
    });

    it('should dispatch toastError when it errors', (done) => {
      deleteComponentRepository.mockImplementationOnce(mockApi({ errors: true }));
      store.dispatch(sendDeleteComponentRepository(12)).then(() => {
        expect(deleteComponentRepository).toHaveBeenCalled();
        const actions = store.getActions();
        expect(actions).toHaveLength(1);
        expect(actions[0]).toHaveProperty('type', ADD_TOAST);
        expect(actions[0].payload).toHaveProperty('message', 'Error!');
        expect(actions[0].payload).toHaveProperty('type', TOAST_ERROR);
        done();
      }).catch(done.fail);
    });
  });

  describe('sendPostComponentRepository', () => {
    it('calls postComponentRepository, ADD_TOAST and router actions ', (done) => {
      const data = { data: 1 };
      postComponentRepository.mockImplementationOnce(mockApi({ errors: false }));
      store.dispatch(sendPostComponentRepository(data)).then(() => {
        expect(postComponentRepository).toHaveBeenCalledWith(data);
        expect(history.push).toHaveBeenCalledWith(ROUTE_ECR_CONFIG_LIST);
        const actions = store.getActions();
        expect(actions).toHaveLength(1);
        expect(actions[0]).toHaveProperty('type', ADD_TOAST);
        expect(actions[0]).toHaveProperty('payload');
        expect(actions[0]).toHaveProperty('payload.type', TOAST_SUCCESS);
        done();
      }).catch(done.fail);
    });

    it('should dispatch toastError when it errors', (done) => {
      postComponentRepository.mockImplementationOnce(mockApi({ errors: true }));
      store.dispatch(sendPostComponentRepository()).then(() => {
        expect(postComponentRepository).toHaveBeenCalled();
        const actions = store.getActions();
        expect(actions).toHaveLength(1);
        expect(actions[0]).toHaveProperty('type', ADD_TOAST);
        expect(actions[0].payload).toHaveProperty('message', 'Error!');
        expect(actions[0].payload).toHaveProperty('type', TOAST_ERROR);
        done();
      }).catch(done.fail);
    });
  });

  describe('sendPutComponentRepository', () => {
    it('calls putComponentRepository, ADD_TOAST and router actions ', (done) => {
      const data = { id: 12, data: 1 };
      putComponentRepository.mockImplementationOnce(mockApi({ errors: false }));
      store.dispatch(sendPutComponentRepository(data)).then(() => {
        expect(putComponentRepository).toHaveBeenCalledWith(data);
        expect(history.push).toHaveBeenCalledWith(ROUTE_ECR_CONFIG_LIST);
        const actions = store.getActions();
        expect(actions).toHaveLength(1);
        expect(actions[0]).toHaveProperty('type', ADD_TOAST);
        expect(actions[0]).toHaveProperty('payload');
        expect(actions[0]).toHaveProperty('payload.type', TOAST_SUCCESS);
        done();
      }).catch(done.fail);
    });

    it('should dispatch toastError when it errors', (done) => {
      putComponentRepository.mockImplementationOnce(mockApi({ errors: true }));
      store.dispatch(sendPutComponentRepository()).then(() => {
        expect(putComponentRepository).toHaveBeenCalled();
        const actions = store.getActions();
        expect(actions).toHaveLength(1);
        expect(actions[0]).toHaveProperty('type', ADD_TOAST);
        expect(actions[0].payload).toHaveProperty('message', 'Error!');
        expect(actions[0].payload).toHaveProperty('type', TOAST_ERROR);
        done();
      }).catch(done.fail);
    });
  });
});
