import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { config } from '@entando/apimanager';

import {
  setActiveRegistry,
  setFetchedBundlesFromRegistry,
  setFetchedRegistries,
  setFetchedBundleGroups,
  setBundleStatuses,
  setSelectedBundleStatus,
  setBundleGroupIdFilter,
  fetchBundleStatuses,
  fetchSelectedBundleStatus,
  fetchBundlesFromRegistry,
  fetchRegistries,
  fetchBundleGroups,
  fetchBundlesFromRegistryWithFilters,
  sendDeleteRegistry,
  sendPostRegistry,
  sendDeployBundle,
  sendUndeployBundle,
} from 'state/component-repository/hub/actions';

import {
  SET_ACTIVE_REGISTRY, SET_BUNDLE_GROUP_ID_FILTER,
  SET_FETCHED_BUNDLES, SET_FETCHED_BUNDLE_GROUPS,
  SET_FETCHED_REGISTRIES, SET_BUNDLE_STATUSES, SET_SELECTED_BUNDLE_STATUS,
} from 'state/component-repository/hub/types';

import { SET_ECR_COMPONENTS } from 'state/component-repository/components/types';

import {
  LIST_BUNDLES_FROM_REGISTRY_OK, LIST_REGISTRIES_OK,
  LIST_BUNDLE_GROUPS_OK, LIST_BUNDLE_STATUSES_OK,
  DELETE_REGISTRY_OK, ADD_REGISTRY_OK, DEPLOY_BUNDLE_OK,
  UNDEPLOY_BUNDLE_OK,
} from 'test/mocks/component-repository/hub';

import { mockApi } from 'test/testUtils';

import {
  getBundleStatuses,
  getBundlesFromRegistry,
  getRegistries,
  getBundleGroups,
  deleteRegistry,
  addRegistry,
  deployBundle,
  undeployBundle,
} from 'api/component-repository/hub';

import { TOGGLE_LOADING } from 'state/loading/types';
import { SET_PAGE } from 'state/pagination/types';
import { ADD_TOAST, ADD_ERRORS, TOAST_ERROR, TOAST_SUCCESS } from '@entando/messages';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

config(mockStore({ api: { useMocks: true }, currentUser: { token: 'asdf' } }));


const INITIAL_STATE = {
  hub: {
    bundleFilters: {},
  },
  componentRepositoryComponents: {
    list: [],
  },
};

jest.mock('api/component-repository/hub');

describe('state/component-repository/component-repositories/actions', () => {
  let store;
  let action;

  beforeEach(() => {
    store = mockStore(INITIAL_STATE);
    jest.clearAllMocks();
    store.clearActions();
  });

  describe('setActiveRegistry', () => {
    it('test setActiveRegistry action sets the correct type', () => {
      const registry = { name: 'registryName', url: 'registryUrl' };
      action = setActiveRegistry(registry);
      expect(action).toHaveProperty('type', SET_ACTIVE_REGISTRY);
      expect(action.payload).toHaveProperty('registry', registry);
    });
  });

  describe('setFetchedBundlesFromRegistry', () => {
    it('test setFetchedBundlesFromRegistry action sets the correct type', () => {
      action = setFetchedBundlesFromRegistry(LIST_BUNDLES_FROM_REGISTRY_OK);
      expect(action).toHaveProperty('type', SET_FETCHED_BUNDLES);
      expect(action.payload).toHaveProperty('bundles', LIST_BUNDLES_FROM_REGISTRY_OK);
    });
  });

  describe('setFetchedRegistries', () => {
    it('test setFetchedRegistries action sets the correct type', () => {
      action = setFetchedRegistries(LIST_REGISTRIES_OK);
      expect(action).toHaveProperty('type', SET_FETCHED_REGISTRIES);
      expect(action.payload).toHaveProperty('registries', LIST_REGISTRIES_OK);
    });
  });

  describe('setFetchedBundleGroups', () => {
    it('test setFetchedBundleGroups action sets the correct type', () => {
      action = setFetchedBundleGroups(LIST_BUNDLE_GROUPS_OK);
      expect(action).toHaveProperty('type', SET_FETCHED_BUNDLE_GROUPS);
      expect(action.payload).toHaveProperty('bundleGroups', LIST_BUNDLE_GROUPS_OK);
    });
  });

  describe('setBundleStatuses', () => {
    it('test setBundleStatuses action sets the correct type', () => {
      action = setBundleStatuses(LIST_BUNDLE_STATUSES_OK);
      expect(action).toHaveProperty('type', SET_BUNDLE_STATUSES);
      expect(action.payload).toHaveProperty('bundleStatuses', LIST_BUNDLE_STATUSES_OK);
    });
  });

  describe('setSelectedBundleStatus', () => {
    it('test setSelectedBundleStatus action sets the correct type', () => {
      action = setSelectedBundleStatus(LIST_BUNDLE_STATUSES_OK);
      expect(action).toHaveProperty('type', SET_SELECTED_BUNDLE_STATUS);
      expect(action.payload).toHaveProperty('bundleStatus', LIST_BUNDLE_STATUSES_OK);
    });
  });

  describe('setBundleGroupIdFilter', () => {
    it('test setBundleGroupIdFilter action sets the correct type', () => {
      const val = 'bundle group filter value';
      action = setBundleGroupIdFilter(val);
      expect(action).toHaveProperty('type', SET_BUNDLE_GROUP_ID_FILTER);
      expect(action.payload).toHaveProperty('value', val);
    });
  });

  describe('fetchBundleStatuses', () => {
    it('calls getBundleStatuses and appropriate actions ', (done) => {
      const bundleIds = ['id1', 'id2'];
      getBundleStatuses.mockImplementationOnce(mockApi({
        errors: false,
        payload: LIST_BUNDLE_STATUSES_OK,
      }));
      store.dispatch(fetchBundleStatuses(bundleIds)).then(() => {
        expect(getBundleStatuses).toHaveBeenCalledWith(bundleIds);
        const actions = store.getActions();
        expect(actions).toHaveLength(1);
        expect(actions[0]).toHaveProperty('type', SET_BUNDLE_STATUSES);
        expect(actions[0]).toHaveProperty('payload');
        expect(actions[0]).toHaveProperty('payload.bundleStatuses', LIST_BUNDLE_STATUSES_OK.bundlesStatuses);
        done();
      }).catch(done.fail);
    });

    it('should dispatch toastError when it errors', (done) => {
      getBundleStatuses.mockImplementationOnce(mockApi({ errors: true }));
      store.dispatch(fetchBundleStatuses()).then(() => {
        expect(getBundleStatuses).toHaveBeenCalled();
        const actions = store.getActions();
        expect(actions).toHaveLength(2);
        expect(actions[0]).toHaveProperty('type', ADD_ERRORS);
        expect(actions[0].payload).toHaveProperty('errors', ['Error!']);
        expect(actions[1]).toHaveProperty('type', ADD_TOAST);
        expect(actions[1].payload).toHaveProperty('message', 'Error!');
        expect(actions[1].payload).toHaveProperty('type', TOAST_ERROR);
        done();
      }).catch(done.fail);
    });
  });

  describe('fetchSelectedBundleStatus', () => {
    it('calls getBundleStatuses and appropriate actions', (done) => {
      const bundleId = 'id1';
      getBundleStatuses.mockImplementationOnce(mockApi({
        errors: false,
        payload: LIST_BUNDLE_STATUSES_OK,
      }));
      store.dispatch(fetchSelectedBundleStatus(bundleId)).then(() => {
        expect(getBundleStatuses).toHaveBeenCalledWith([bundleId]);
        const actions = store.getActions();
        expect(actions).toHaveLength(1);
        expect(actions[0]).toHaveProperty('type', SET_SELECTED_BUNDLE_STATUS);
        expect(actions[0]).toHaveProperty('payload');
        expect(actions[0]).toHaveProperty('payload.bundleStatus', LIST_BUNDLE_STATUSES_OK.bundlesStatuses[0]);
        done();
      }).catch(done.fail);
    });

    it('should dispatch toastError when it errors', (done) => {
      getBundleStatuses.mockImplementationOnce(mockApi({ errors: true }));
      store.dispatch(fetchSelectedBundleStatus()).then(() => {
        expect(getBundleStatuses).toHaveBeenCalled();
        const actions = store.getActions();
        expect(actions).toHaveLength(2);
        expect(actions[0]).toHaveProperty('type', ADD_ERRORS);
        expect(actions[0].payload).toHaveProperty('errors', ['Error!']);
        expect(actions[1]).toHaveProperty('type', ADD_TOAST);
        expect(actions[1].payload).toHaveProperty('message', 'Error!');
        expect(actions[1].payload).toHaveProperty('type', TOAST_ERROR);
        done();
      }).catch(done.fail);
    });
  });

  describe('fetchBundlesFromRegistry', () => {
    it('calls getBundlesFromRegistry and appropriate actions', (done) => {
      const registryUrl = 'http://registry.url/';
      getBundlesFromRegistry.mockImplementationOnce(mockApi({
        errors: false,
        payload: LIST_BUNDLES_FROM_REGISTRY_OK,
        metadata: { page: 1, pageSize: 10 },
      }));
      getBundleStatuses.mockImplementationOnce(mockApi({
        errors: false,
        payload: LIST_BUNDLE_STATUSES_OK,
      }));
      store.dispatch(fetchBundlesFromRegistry(registryUrl)).then(() => {
        expect(getBundlesFromRegistry).toHaveBeenCalledWith(registryUrl, { page: 1, pageSize: 10 }, '');
        const actions = store.getActions();
        expect(actions).toHaveLength(3);
        expect(actions[0]).toHaveProperty('type', TOGGLE_LOADING);
        expect(actions[1]).toHaveProperty('type', TOGGLE_LOADING);
        expect(actions[2]).toHaveProperty('payload.bundles', LIST_BUNDLES_FROM_REGISTRY_OK);
        expect(actions[2]).toHaveProperty('type', SET_FETCHED_BUNDLES);
        done();
      }).catch(done.fail);
    });

    it('should dispatch toastError when it errors', (done) => {
      getBundlesFromRegistry.mockImplementationOnce(mockApi({ errors: true }));
      store.dispatch(fetchBundlesFromRegistry()).then(() => {
        expect(getBundlesFromRegistry).toHaveBeenCalled();
        const actions = store.getActions();
        expect(actions).toHaveLength(4);
        expect(actions[0]).toHaveProperty('type', TOGGLE_LOADING);
        expect(actions[1]).toHaveProperty('type', TOGGLE_LOADING);
        expect(actions[2]).toHaveProperty('type', ADD_ERRORS);
        expect(actions[2].payload).toHaveProperty('errors', ['Error!']);
        expect(actions[3]).toHaveProperty('type', ADD_TOAST);
        expect(actions[3].payload).toHaveProperty('message', 'Error!');
        expect(actions[3].payload).toHaveProperty('type', TOAST_ERROR);
        done();
      }).catch(done.fail);
    });
  });

  describe('fetchRegistries', () => {
    it('calls getRegistries and appropriate actions', (done) => {
      getRegistries.mockImplementationOnce(mockApi({
        errors: false,
        payload: LIST_REGISTRIES_OK,
      }));
      store.dispatch(fetchRegistries()).then(() => {
        expect(getRegistries).toHaveBeenCalledWith('');
        const actions = store.getActions();
        expect(actions).toHaveLength(3);
        expect(actions[0]).toHaveProperty('type', TOGGLE_LOADING);
        expect(actions[1]).toHaveProperty('type', TOGGLE_LOADING);
        expect(actions[2]).toHaveProperty('payload.registries', LIST_REGISTRIES_OK);
        expect(actions[2]).toHaveProperty('type', SET_FETCHED_REGISTRIES);
        done();
      }).catch(done.fail);
    });

    it('should dispatch toastError when it errors', (done) => {
      getRegistries.mockImplementationOnce(mockApi({ errors: true }));
      store.dispatch(fetchRegistries()).then(() => {
        expect(getRegistries).toHaveBeenCalled();
        const actions = store.getActions();
        expect(actions).toHaveLength(4);
        expect(actions[0]).toHaveProperty('type', TOGGLE_LOADING);
        expect(actions[1]).toHaveProperty('type', TOGGLE_LOADING);
        expect(actions[2]).toHaveProperty('type', ADD_ERRORS);
        expect(actions[2].payload).toHaveProperty('errors', ['Error!']);
        expect(actions[3]).toHaveProperty('type', ADD_TOAST);
        expect(actions[3].payload).toHaveProperty('message', 'Error!');
        expect(actions[3].payload).toHaveProperty('type', TOAST_ERROR);
        done();
      }).catch(done.fail);
    });
  });

  describe('fetchBundleGroups', () => {
    it('calls getBundleGroups and appropriate actions', (done) => {
      getBundleGroups.mockImplementationOnce(mockApi({
        errors: false,
        payload: LIST_BUNDLE_GROUPS_OK,
      }));
      const url = 'url';
      store.dispatch(fetchBundleGroups(url)).then(() => {
        expect(getBundleGroups).toHaveBeenCalledWith(url, { page: 1, pageSize: 0 }, '');
        const actions = store.getActions();
        expect(actions).toHaveLength(1);
        expect(actions[0]).toHaveProperty('payload.bundleGroups', LIST_BUNDLE_GROUPS_OK);
        expect(actions[0]).toHaveProperty('type', SET_FETCHED_BUNDLE_GROUPS);
        done();
      }).catch(done.fail);
    });

    it('should dispatch toastError when it errors', (done) => {
      getBundleGroups.mockImplementationOnce(mockApi({ errors: true }));
      store.dispatch(fetchBundleGroups()).then(() => {
        expect(getBundleGroups).toHaveBeenCalled();
        const actions = store.getActions();
        expect(actions).toHaveLength(2);
        expect(actions[0]).toHaveProperty('type', ADD_ERRORS);
        expect(actions[0].payload).toHaveProperty('errors', ['Error!']);
        expect(actions[1]).toHaveProperty('type', ADD_TOAST);
        expect(actions[1].payload).toHaveProperty('message', 'Error!');
        expect(actions[1].payload).toHaveProperty('type', TOAST_ERROR);
        done();
      }).catch(done.fail);
    });
  });

  describe('fetchBundlesFromRegistryWithFilters', () => {
    it('calls getBundlesFromRegistry and appropriate actions', (done) => {
      const registryUrl = 'http://registry.url/';
      getBundlesFromRegistry.mockImplementationOnce(mockApi({
        errors: false,
        payload: LIST_BUNDLES_FROM_REGISTRY_OK,
        metadata: { page: 1, pageSize: 10 },
      }));
      getBundleStatuses.mockImplementationOnce(mockApi({
        errors: false,
        payload: LIST_BUNDLE_STATUSES_OK,
      }));
      store.dispatch(fetchBundlesFromRegistryWithFilters(
        registryUrl,
        { page: 1, pageSize: 10 },
      )).then(() => {
        expect(getBundlesFromRegistry).toHaveBeenCalledWith(registryUrl, { page: 1, pageSize: 10 }, '?');
        const actions = store.getActions();
        expect(actions).toHaveLength(4);
        expect(actions[0]).toHaveProperty('type', TOGGLE_LOADING);
        expect(actions[1]).toHaveProperty('type', TOGGLE_LOADING);
        expect(actions[2]).toHaveProperty('payload.bundles', LIST_BUNDLES_FROM_REGISTRY_OK);
        expect(actions[2]).toHaveProperty('type', SET_FETCHED_BUNDLES);
        expect(actions[3]).toHaveProperty('type', SET_PAGE);
        done();
      }).catch(done.fail);
    });

    it('should dispatch toastError when it errors', (done) => {
      getBundlesFromRegistry.mockImplementationOnce(mockApi({ errors: true }));
      store.dispatch(fetchBundlesFromRegistryWithFilters()).then(() => {
        expect(getBundlesFromRegistry).toHaveBeenCalled();
        const actions = store.getActions();
        expect(actions).toHaveLength(4);
        expect(actions[0]).toHaveProperty('type', TOGGLE_LOADING);
        expect(actions[1]).toHaveProperty('type', TOGGLE_LOADING);
        expect(actions[2]).toHaveProperty('type', ADD_ERRORS);
        expect(actions[2].payload).toHaveProperty('errors', ['Error!']);
        expect(actions[3]).toHaveProperty('type', ADD_TOAST);
        expect(actions[3].payload).toHaveProperty('message', 'Error!');
        expect(actions[3].payload).toHaveProperty('type', TOAST_ERROR);
        done();
      }).catch(done.fail);
    });
  });

  describe('sendDeleteRegistry', () => {
    it('calls getRegistries and appropriate actions', (done) => {
      deleteRegistry.mockImplementationOnce(mockApi({
        errors: false,
        payload: DELETE_REGISTRY_OK,
      }));
      getRegistries.mockImplementationOnce(mockApi({
        errors: false,
        payload: LIST_REGISTRIES_OK,
      }));
      store.dispatch(sendDeleteRegistry('id1')).then(() => {
        expect(deleteRegistry).toHaveBeenCalledWith('id1');
        expect(getRegistries).toHaveBeenCalledWith('');
        const actions = store.getActions();
        expect(actions).toHaveLength(2);
        expect(actions[0]).toHaveProperty('type', ADD_TOAST);
        expect(actions[0].payload).toHaveProperty('type', TOAST_SUCCESS);
        expect(actions[1]).toHaveProperty('type', TOGGLE_LOADING);
        done();
      }).catch(done.fail);
    });

    it('should dispatch toastError when it errors', (done) => {
      deleteRegistry.mockImplementationOnce(mockApi({ errors: true }));
      store.dispatch(sendDeleteRegistry()).then(() => {
        expect(deleteRegistry).toHaveBeenCalled();
        const actions = store.getActions();
        expect(actions).toHaveLength(2);
        expect(actions[0]).toHaveProperty('type', ADD_ERRORS);
        expect(actions[0].payload).toHaveProperty('errors', ['Error!']);
        expect(actions[1]).toHaveProperty('type', ADD_TOAST);
        expect(actions[1].payload).toHaveProperty('message', 'Error!');
        expect(actions[1].payload).toHaveProperty('type', TOAST_ERROR);
        done();
      }).catch(done.fail);
    });
  });

  describe('sendPostRegistry', () => {
    it('calls getRegistries and appropriate actions', (done) => {
      addRegistry.mockImplementationOnce(mockApi({
        errors: false,
        payload: ADD_REGISTRY_OK,
      }));
      getRegistries.mockImplementationOnce(mockApi({
        errors: false,
        payload: LIST_REGISTRIES_OK,
      }));
      store.dispatch(sendPostRegistry({ name: 'id1', url: 'url' })).then(() => {
        expect(addRegistry).toHaveBeenCalledWith({ name: 'id1', url: 'url' });
        expect(getRegistries).toHaveBeenCalledWith('');
        const actions = store.getActions();
        expect(actions).toHaveLength(2);
        expect(actions[0]).toHaveProperty('type', ADD_TOAST);
        expect(actions[0].payload).toHaveProperty('type', TOAST_SUCCESS);
        expect(actions[1]).toHaveProperty('type', TOGGLE_LOADING);
        done();
      }).catch(done.fail);
    });

    it('should dispatch toastError when it errors', (done) => {
      addRegistry.mockImplementationOnce(mockApi({ errors: true }));
      store.dispatch(sendPostRegistry()).then(() => {
        expect(addRegistry).toHaveBeenCalled();
        const actions = store.getActions();
        expect(actions).toHaveLength(2);
        expect(actions[0]).toHaveProperty('type', ADD_ERRORS);
        expect(actions[0].payload).toHaveProperty('errors', ['Error!']);
        expect(actions[1]).toHaveProperty('type', ADD_TOAST);
        expect(actions[1].payload).toHaveProperty('message', 'Error!');
        expect(actions[1].payload).toHaveProperty('type', TOAST_ERROR);
        done();
      }).catch(done.fail);
    });
  });

  describe('sendDeployBundle', () => {
    it('calls deployBundle and appropriate actions', (done) => {
      deployBundle.mockImplementationOnce(mockApi({
        errors: false,
        payload: DEPLOY_BUNDLE_OK,
      }));
      getBundleStatuses.mockImplementationOnce(mockApi({
        errors: false,
        payload: LIST_BUNDLE_STATUSES_OK,
      }));
      store.dispatch(sendDeployBundle({ name: 'id1', gitRepoAddress: 'url' })).then(() => {
        expect(deployBundle).toHaveBeenCalledWith({ name: 'id1', gitRepoAddress: 'url' });
        const actions = store.getActions();
        expect(actions).toHaveLength(4);
        expect(actions[0]).toHaveProperty('type', TOGGLE_LOADING);
        expect(actions[1]).toHaveProperty('type', TOGGLE_LOADING);
        expect(actions[2]).toHaveProperty('type', ADD_TOAST);
        expect(actions[2].payload).toHaveProperty('type', TOAST_SUCCESS);
        expect(actions[3]).toHaveProperty('type', SET_ECR_COMPONENTS);
        done();
      }).catch(done.fail);
    });

    it('should dispatch toastError when it errors', (done) => {
      deployBundle.mockImplementationOnce(mockApi({ errors: true }));
      store.dispatch(sendDeployBundle({ gitRepoAddress: 'address' })).then(() => {
        expect(deployBundle).toHaveBeenCalled();
        const actions = store.getActions();
        expect(actions).toHaveLength(3);
        expect(actions[0]).toHaveProperty('type', TOGGLE_LOADING);
        expect(actions[1]).toHaveProperty('type', TOGGLE_LOADING);
        expect(actions[2]).toHaveProperty('type', ADD_TOAST);
        done();
      }).catch(done.fail);
    });
  });

  describe('sendUndeployBundle', () => {
    it('calls undeployBundle and appropriate actions', (done) => {
      undeployBundle.mockImplementationOnce(mockApi({
        errors: false,
        payload: UNDEPLOY_BUNDLE_OK,
      }));
      getBundleStatuses.mockImplementationOnce(mockApi({
        errors: false,
        payload: LIST_BUNDLE_STATUSES_OK,
      }));
      store.dispatch(sendUndeployBundle({ name: 'id1', gitRepoAddress: 'url', componentCode: 'code' })).then(() => {
        expect(undeployBundle).toHaveBeenCalledWith('code');
        const actions = store.getActions();
        expect(actions).toHaveLength(4);
        expect(actions[0]).toHaveProperty('type', TOGGLE_LOADING);
        expect(actions[1]).toHaveProperty('type', TOGGLE_LOADING);
        expect(actions[2]).toHaveProperty('type', ADD_TOAST);
        expect(actions[2].payload).toHaveProperty('type', TOAST_SUCCESS);
        expect(actions[3]).toHaveProperty('type', SET_ECR_COMPONENTS);
        done();
      }).catch(done.fail);
    });

    it('should dispatch toastError when it errors', (done) => {
      undeployBundle.mockImplementationOnce(mockApi({ errors: true }));
      store.dispatch(sendUndeployBundle({ gitRepoAddress: 'address', name: 'comp1', componentCode: 'code' })).then(() => {
        expect(undeployBundle).toHaveBeenCalled();
        const actions = store.getActions();
        expect(actions).toHaveLength(3);
        expect(actions[0]).toHaveProperty('type', TOGGLE_LOADING);
        expect(actions[1]).toHaveProperty('type', TOGGLE_LOADING);
        expect(actions[2]).toHaveProperty('type', ADD_TOAST);
        done();
      }).catch(done.fail);
    });
  });
});
