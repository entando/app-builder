import { addToast, addErrors, TOAST_ERROR, TOAST_SUCCESS } from '@entando/messages';

import { toggleLoading } from 'state/loading/actions';
import { setPage } from 'state/pagination/actions';
import { addRegistry, getBundlesFromRegistry, getRegistries, deleteRegistry } from 'api/component-repository/hub';
import { SET_ACTIVE_REGISTRY, SET_FETCHED_BUNDLES, SET_FETCHED_REGISTRIES } from 'state/component-repository/hub/types';

const FETCH_BUNDLES_LOADING_STATE = 'component-repository/hub/list/bundles';
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

export const fetchBundlesFromRegistry = (page = { page: 1, pageSize: 10 }, params = '') => dispatch => (
  new Promise((resolve) => {
    dispatch(toggleLoading(FETCH_BUNDLES_LOADING_STATE));
    getBundlesFromRegistry(page, params).then((response) => {
      response.json().then((data) => {
        if (response.ok) {
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

export const sendDeleteRegistry = registryName => dispatch => (
  new Promise((resolve) => {
    deleteRegistry(registryName).then((response) => {
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
