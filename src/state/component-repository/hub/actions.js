import { addToast, addErrors, TOAST_ERROR, TOAST_SUCCESS } from '@entando/messages';

import { toggleLoading } from 'state/loading/actions';
import { setPage } from 'state/pagination/actions';
import { addRegistry, getBundlesFromRegistry, getRegistries, deleteRegistry, getBundleGroups, deployBundle, undeployBundle, getBundleStatuses, updateRegistry } from 'api/component-repository/hub';
import {
  SET_ACTIVE_REGISTRY, SET_BUNDLE_GROUP_ID_FILTER,
  SET_FETCHED_BUNDLES, SET_FETCHED_BUNDLE_GROUPS,
  SET_FETCHED_REGISTRIES, SET_BUNDLE_STATUSES, SET_SELECTED_BUNDLE_STATUS,
} from 'state/component-repository/hub/types';
import { setVisibleModal } from 'state/modal/actions';
import { getBundleFilters } from 'state/component-repository/hub/selectors';
import { getECRComponentList } from 'state/component-repository/components/selectors';
import { setECRComponents } from 'state/component-repository/components/actions';

export const FETCH_BUNDLES_LOADING_STATE = 'component-repository/hub/list/bundles';
const FETCH_REGISTRIES_LOADING_STATE = 'component-repository/hub/list/registries';

export const DEFAULT_BE_ERROR_MESSAGE = { id: 'componentRepository.components.genericError' };

export const BUNDLE_DESCRIPTOR_QUERY = 'descriptorVersions=v5&descriptorVersions=v1';

export const setActiveRegistry = registry => ({
  type: SET_ACTIVE_REGISTRY,
  payload: { registry },
});

export const setFetchedBundlesFromRegistry = bundles => ({
  type: SET_FETCHED_BUNDLES,
  payload: {
    bundles,
  },
});

export const setFetchedRegistries = registries => ({
  type: SET_FETCHED_REGISTRIES,
  payload: {
    registries,
  },
});

export const setFetchedBundleGroups = bundleGroups => ({
  type: SET_FETCHED_BUNDLE_GROUPS,
  payload: {
    bundleGroups,
  },
});

export const setBundleStatuses = bundleStatuses => ({
  type: SET_BUNDLE_STATUSES,
  payload: {
    bundleStatuses,
  },
});

export const setSelectedBundleStatus = bundleStatus => ({
  type: SET_SELECTED_BUNDLE_STATUS,
  payload: {
    bundleStatus,
  },
});

export const setBundleGroupIdFilter = value => ({
  type: SET_BUNDLE_GROUP_ID_FILTER,
  payload: {
    value,
  },
});


export const fetchBundleStatuses = bundleIds => dispatch => (
  new Promise((resolve) => {
    getBundleStatuses(bundleIds).then((response) => {
      response.json().then((data) => {
        if (response.ok) {
          dispatch(setBundleStatuses(data.payload.bundlesStatuses));
        } else if (data.errors) {
          dispatch(addErrors(data.errors.map(err => err.message)));
          data.errors.forEach(err =>
            dispatch(addToast(err.message || DEFAULT_BE_ERROR_MESSAGE, TOAST_ERROR)));
        }
        resolve();
      });
    }).catch(() => {
      dispatch(addToast(DEFAULT_BE_ERROR_MESSAGE, TOAST_ERROR));
      resolve();
    });
  })
);

export const fetchSelectedBundleStatus = bundleId => dispatch => (
  new Promise((resolve) => {
    getBundleStatuses([bundleId]).then((response) => {
      response.json().then((data) => {
        if (response.ok) {
          dispatch(setSelectedBundleStatus(data.payload.bundlesStatuses[0]));
        } else {
          dispatch(addErrors(data.errors.map(err => err.message)));
          data.errors.forEach(err =>
            dispatch(addToast(err.message || DEFAULT_BE_ERROR_MESSAGE, TOAST_ERROR)));
        }
        resolve();
      });
    }).catch(() => {
      dispatch(addToast(DEFAULT_BE_ERROR_MESSAGE, TOAST_ERROR));
      resolve();
    });
  })
);


export const fetchBundlesFromRegistry = (registryId, page = { page: 1, pageSize: 10 }, params = '') => dispatch => (
  new Promise((resolve) => {
    dispatch(toggleLoading(FETCH_BUNDLES_LOADING_STATE));

    const currentParams = params ? `?${params}&${BUNDLE_DESCRIPTOR_QUERY}` : `?${BUNDLE_DESCRIPTOR_QUERY}`;

    getBundlesFromRegistry(registryId, page, currentParams).then((response) => {
      response.json().then((data) => {
        if (response.ok) {
          if (data.payload) {
            dispatch(fetchBundleStatuses(data.payload.map(bundle => bundle.gitRepoAddress)));
            dispatch(setFetchedBundlesFromRegistry(data.payload));
          }
          if (data.metadata) {
            dispatch(setPage(data.metadata));
          }
        } else if (data.errors) {
          dispatch(addErrors(data.errors.map(err => err.message)));
          data.errors.forEach(err =>
            dispatch(addToast(err.message || DEFAULT_BE_ERROR_MESSAGE, TOAST_ERROR)));
        } else {
          dispatch(addToast(data.message || DEFAULT_BE_ERROR_MESSAGE, TOAST_ERROR));
        }
        resolve();
      });
    }).catch(() => {
      dispatch(addToast(DEFAULT_BE_ERROR_MESSAGE, TOAST_ERROR));
    }).finally(() => {
      dispatch(toggleLoading(FETCH_BUNDLES_LOADING_STATE));
    });
  })
);

export const fetchBundlesFromRegistryWithFilters = (registryId, page) => (dispatch, getState) => {
  const state = getState();
  const filters = getBundleFilters(state);
  const params = Object.keys(filters)
    .map(k => (filters[k] ? `${k}=${filters[k]}` : ''))
    .join('&');
  return dispatch(fetchBundlesFromRegistry(registryId, page, params));
};

export const fetchRegistries = (params = '') => dispatch => (
  new Promise((resolve) => {
    dispatch(toggleLoading(FETCH_REGISTRIES_LOADING_STATE));
    getRegistries(params).then((response) => {
      response.json().then((data) => {
        if (response.ok) {
          dispatch(setFetchedRegistries(data.payload));
        } else if (data.errors) {
          dispatch(addErrors(data.errors.map(err => err.message)));
          data.errors.forEach(err =>
            dispatch(addToast(err.message || DEFAULT_BE_ERROR_MESSAGE, TOAST_ERROR)));
        } else {
          dispatch(addToast(data.message || DEFAULT_BE_ERROR_MESSAGE, TOAST_ERROR));
        }
        resolve();
      });
    }).catch(() => {
      dispatch(addToast(DEFAULT_BE_ERROR_MESSAGE, TOAST_ERROR));
    })
      .finally(() => {
        dispatch(toggleLoading(FETCH_REGISTRIES_LOADING_STATE));
      });
  })
);

export const fetchBundleGroups = (registryId, page = { page: 1, pageSize: 0 }, params = '') => dispatch => (
  new Promise((resolve) => {
    getBundleGroups(registryId, page, params).then((response) => {
      response.json().then((data) => {
        if (response.ok) {
          dispatch(setFetchedBundleGroups(data.payload));
        } else if (data.errors) {
          dispatch(addErrors(data.errors.map(err => err.message)));
          data.errors.forEach(err =>
            dispatch(addToast(err.message || DEFAULT_BE_ERROR_MESSAGE, TOAST_ERROR)));
        } else {
          dispatch(addToast(data.message || DEFAULT_BE_ERROR_MESSAGE, TOAST_ERROR));
        }
        resolve();
      });
    }).finally(() => {
    });
  })
);

export const sendDeleteRegistry = registryId => dispatch => (
  new Promise((resolve) => {
    deleteRegistry(registryId).then((response) => {
      response.json().then((data) => {
        if (response.ok) {
          dispatch(addToast(
            { id: 'app.deleted', values: { type: 'registry', code: data.payload.name } },
            TOAST_SUCCESS,
          ));
          dispatch(fetchRegistries());
        } else if (data.errors) {
          dispatch(addErrors(data.errors.map(err => err.message)));
          data.errors.forEach(err =>
            dispatch(addToast(err.message || DEFAULT_BE_ERROR_MESSAGE, TOAST_ERROR)));
        } else {
          dispatch(addToast(data.message || DEFAULT_BE_ERROR_MESSAGE, TOAST_ERROR));
        }
        resolve();
      });
    }).catch((err) => {
      dispatch(addToast(err.message || DEFAULT_BE_ERROR_MESSAGE, TOAST_ERROR));
    }).finally(() => {
    });
  })
);

export const sendPostRegistry = registryObject => dispatch => (
  new Promise((resolve, reject) => {
    addRegistry(registryObject).then((response) => {
      response.json().then((data) => {
        if (response.ok) {
          dispatch(addToast(
            { id: 'app.created', values: { type: 'registry', code: data.payload.name } },
            TOAST_SUCCESS,
          ));
          dispatch(fetchRegistries());
        } else if (data.errors) {
          dispatch(addErrors(data.errors.map(err => err.message)));
          data.errors.forEach(err =>
            dispatch(addToast(err.message || DEFAULT_BE_ERROR_MESSAGE, TOAST_ERROR)));
        } else {
          dispatch(addToast(data.message || DEFAULT_BE_ERROR_MESSAGE, TOAST_ERROR));
        }
        resolve(response.ok);
      });
    }).catch((err) => {
      dispatch(addToast(err.message || DEFAULT_BE_ERROR_MESSAGE, TOAST_ERROR));
      reject();
    });
  })
);

export const sendPutRegistry = registryObject => dispatch => (
  new Promise((resolve, reject) => {
    updateRegistry(registryObject).then((response) => {
      response.json().then((data) => {
        if (response.ok) {
          dispatch(addToast(
            { id: 'app.updated', values: { type: 'registry', code: data.payload.name } },
            TOAST_SUCCESS,
          ));
          dispatch(fetchRegistries());
        } else if (data.errors) {
          dispatch(addErrors(data.errors.map(err => err.message)));
          data.errors.forEach(err =>
            dispatch(addToast(err.message || DEFAULT_BE_ERROR_MESSAGE, TOAST_ERROR)));
        } else {
          dispatch(addToast(data.message || DEFAULT_BE_ERROR_MESSAGE, TOAST_ERROR));
        }
        resolve(response.ok);
      });
    }).catch((err) => {
      dispatch(addToast(err.message || DEFAULT_BE_ERROR_MESSAGE, TOAST_ERROR));
      reject();
    });
  })
);

export const sendDeployBundle = (bundle, successMessageId = 'app.deployed', isRedeploy = false) => (dispatch, getState) => (
  new Promise((resolve) => {
    dispatch(toggleLoading(`deployBundle${bundle.gitRepoAddress}`));
    deployBundle(bundle).then((response) => {
      response.json().then((data) => {
        if (response.ok) {
          dispatch(addToast(
            { id: successMessageId, values: { type: 'bundle', code: bundle.name } },
            TOAST_SUCCESS,
          ));
          dispatch(fetchSelectedBundleStatus(bundle.gitRepoAddress));
          const state = getState();
          const components = getECRComponentList(state);
          if (!isRedeploy) {
            dispatch(setECRComponents([...components, data.payload]));
          } else {
            dispatch(setECRComponents([...(components || [])
              .filter((c) => {
                const gitId = c.gitRepoAddress || c.repoUrl;
                const bundleGitId = data.payload &&
                  (data.payload.gitRepoAddress || data.payload.repoUrl);
                return gitId !== bundleGitId;
              }), data.payload]));
          }
        } else {
          dispatch(addToast(data.message || DEFAULT_BE_ERROR_MESSAGE, TOAST_ERROR));
        }
        resolve();
      });
    }).catch((err) => {
      dispatch(addToast(err.message || DEFAULT_BE_ERROR_MESSAGE, TOAST_ERROR));
    })
      .finally(() => {
        dispatch(toggleLoading(`deployBundle${bundle.gitRepoAddress}`));
      });
  })
);

export const sendUndeployBundle = bundle => (dispatch, getState) => (
  new Promise((resolve) => {
    dispatch(toggleLoading(`undeployBundle${bundle.gitRepoAddress}`));
    undeployBundle(bundle.componentCode).then((response) => {
      response.json().then((data) => {
        if (response.ok) {
          dispatch(addToast(
            { id: 'app.undeployed', values: { type: 'bundle', code: bundle.name } },
            TOAST_SUCCESS,
          ));
          dispatch(fetchSelectedBundleStatus(bundle.gitRepoAddress || bundle.componentUrl));
          const state = getState();
          const components = getECRComponentList(state);
          dispatch(setECRComponents(components.filter(c => c.code !== bundle.componentCode)));
          // if we are undeploying from ECR we need to close modal
          if (bundle.triggeredFromLocal) {
            dispatch(setVisibleModal(''));
          }
        } else {
          dispatch(addToast(data.message || DEFAULT_BE_ERROR_MESSAGE, TOAST_ERROR));
        }
        resolve();
      });
    }).catch((err) => {
      dispatch(addToast(err.message || DEFAULT_BE_ERROR_MESSAGE, TOAST_ERROR));
    }).finally(() => {
      dispatch(toggleLoading(`undeployBundle${bundle.gitRepoAddress}`));
    });
  })
);

export const fetchSelectedBundleStatusWithCode = componentCode => (dispatch, getState) => {
  const state = getState();
  const components = getECRComponentList(state);
  const component = components.find(c => c.code === componentCode) || {};
  return dispatch(fetchSelectedBundleStatus(component.repoUrl || ''));
};
