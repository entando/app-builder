import { addToast, addErrors, TOAST_ERROR, TOAST_SUCCESS } from '@entando/messages';

import { toggleLoading } from 'state/loading/actions';
import { setPage } from 'state/pagination/actions';
import { addRegistry, getBundlesFromRegistry, getRegistries, deleteRegistry, getBundleGroups, deployBundle, undeployBundle, getBundleStatuses } from 'api/component-repository/hub';
import {
  SET_ACTIVE_REGISTRY,
  SET_FETCHED_BUNDLES, SET_FETCHED_BUNDLE_GROUPS,
  SET_FETCHED_REGISTRIES, SET_BUNDLE_STATUSES, SET_SELECTED_BUNDLE_STATUS,
} from 'state/component-repository/hub/types';

export const FETCH_BUNDLES_LOADING_STATE = 'component-repository/hub/list/bundles';
const FETCH_REGISTRIES_LOADING_STATE = 'component-repository/hub/list/registries';


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

export const setSelectedBundleStatus = bundleStatuses => ({
  type: SET_SELECTED_BUNDLE_STATUS,
  payload: {
    bundleStatuses,
  },
});

export const fetchBundleStatuses = bundleIds => dispatch => (
  new Promise((resolve) => {
    getBundleStatuses(bundleIds).then((response) => {
      response.json().then((data) => {
        if (response.ok) {
          dispatch(setBundleStatuses(data.payload.bundlesStatuses));
        } else {
          dispatch(addErrors(data.errors.map(err => err.message)));
          data.errors.forEach(err => dispatch(addToast(err.message, TOAST_ERROR)));
        }
        resolve();
      });
    });
  })
);

export const fetchSelectedBundleStatus = bundleId => dispatch => (
  new Promise((resolve) => {
    getBundleStatuses([bundleId]).then((response) => {
      response.json().then((data) => {
        if (response.ok) {
          dispatch(setSelectedBundleStatus(data.payload.bundlesStatuses));
        } else {
          dispatch(addErrors(data.errors.map(err => err.message)));
          data.errors.forEach(err => dispatch(addToast(err.message, TOAST_ERROR)));
        }
        resolve();
      });
    });
  })
);


export const fetchBundlesFromRegistry = (url, page = { page: 1, pageSize: 10 }, params = '') => dispatch => (
  new Promise((resolve) => {
    dispatch(toggleLoading(FETCH_BUNDLES_LOADING_STATE));
    getBundlesFromRegistry(url, page, params).then((response) => {
      response.json().then((data) => {
        if (response.ok) {
          dispatch(fetchBundleStatuses(data.payload.map(bundle => bundle.gitRepoAddress)));
          dispatch(setFetchedBundlesFromRegistry(data.payload));
          dispatch(setPage(data.metaData));
        } else {
          dispatch(addErrors(data.errors.map(err => err.message)));
          data.errors.forEach(err => dispatch(addToast(err.message, TOAST_ERROR)));
        }
        resolve();
      });
    }).finally(() => {
      dispatch(toggleLoading(FETCH_BUNDLES_LOADING_STATE));
    });
  })
);

export const fetchRegistries = (params = '') => dispatch => (
  new Promise((resolve) => {
    dispatch(toggleLoading(FETCH_REGISTRIES_LOADING_STATE));
    getRegistries(params).then((response) => {
      response.json().then((data) => {
        if (response.ok) {
          dispatch(setFetchedRegistries(data.payload));
        } else {
          dispatch(addErrors(data.errors.map(err => err.message)));
          data.errors.forEach(err => dispatch(addToast(err.message, TOAST_ERROR)));
        }
        resolve();
      });
    }).finally(() => {
      dispatch(toggleLoading(FETCH_REGISTRIES_LOADING_STATE));
    });
  })
);

export const fetchBundleGroups = (url, page, params = '') => dispatch => (
  new Promise((resolve) => {
    getBundleGroups(url, page, params).then((response) => {
      response.json().then((data) => {
        if (response.ok) {
          dispatch(setFetchedBundleGroups(data.payload));
        } else {
          dispatch(addErrors(data.errors.map(err => err.message)));
          data.errors.forEach(err => dispatch(addToast(err.message, TOAST_ERROR)));
        }
        resolve();
      });
    }).finally(() => {
    });
  })
);

export const fetchBundlesFromRegistryWithFilters = (url, page, params = '') => dispatch => (
  new Promise((resolve) => {
    dispatch(toggleLoading(FETCH_BUNDLES_LOADING_STATE));
    getBundleGroups(url, page, params).then((response) => {
      response.json().then((data) => {
        if (response.ok) {
          dispatch(fetchBundleStatuses(data.payload.map(bundle => bundle.gitRepoAddress)));
          dispatch(setFetchedBundleGroups(data.payload));
          dispatch(setPage(data.metaData));
        } else {
          dispatch(addErrors(data.errors.map(err => err.message)));
          data.errors.forEach(err => dispatch(addToast(err.message, TOAST_ERROR)));
        }
        resolve();
      });
    }).finally(() => {
      dispatch(toggleLoading(FETCH_BUNDLES_LOADING_STATE));
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
        } else {
          dispatch(addErrors(data.errors.map(err => err.message)));
          data.errors.forEach(err => dispatch(addToast(err.message, TOAST_ERROR)));
        }
        resolve();
      });
    }).finally(() => {
    });
  })
);

export const sendAddRegistry = registryObject => dispatch => (
  new Promise((resolve) => {
    addRegistry(registryObject).then((response) => {
      response.json().then((data) => {
        if (response.ok) {
          dispatch(addToast(
            { id: 'app.created', values: { type: 'registry', code: data.payload.name } },
            TOAST_SUCCESS,
          ));
          dispatch(fetchRegistries());
        } else {
          dispatch(addErrors(data.errors.map(err => err.message)));
          data.errors.forEach(err => dispatch(addToast(err.message, TOAST_ERROR)));
        }
        resolve();
      });
    }).finally(() => {
    });
  })
);

export const sendDeployBundle = bundle => dispatch => (
  new Promise((resolve) => {
    dispatch(toggleLoading(`deployBundle${bundle.bundleId}`));
    deployBundle(bundle).then((response) => {
      response.json().then((data) => {
        if (response.ok) {
          dispatch(addToast(
            { id: 'app.deployed', values: { type: 'bundle', code: bundle.name } },
            TOAST_SUCCESS,
          ));
          dispatch(fetchSelectedBundleStatus(bundle.gitRepoAddress));
        } else {
          dispatch(addErrors(data.errors.map(err => err.message)));
          data.errors.forEach(err => dispatch(addToast(err.message, TOAST_ERROR)));
        }
        resolve();
      });
    }).finally(() => {
      dispatch(toggleLoading(`deployBundle${bundle.bundleId}`));
    });
  })
);

export const sendUndeployBundle = bundle => dispatch => (
  new Promise((resolve) => {
    // @TODO replace bundleId with id/code once changed
    dispatch(toggleLoading(`deployBundle${bundle.bundleId}`));
    undeployBundle(bundle).then((response) => {
      response.json().then((data) => {
        if (response.ok) {
          dispatch(addToast(
            { id: 'app.undeployed', values: { type: 'bundle', code: bundle.name } },
            TOAST_SUCCESS,
          ));
        } else {
          dispatch(addErrors(data.errors.map(err => err.message)));
          data.errors.forEach(err => dispatch(addToast(err.message, TOAST_ERROR)));
        }
        resolve();
      });
    }).finally(() => {
      // @TODO replace bundleId with id/code once changed
      dispatch(toggleLoading(`deployBundle${bundle.bundleId}`));
    });
  })
);
