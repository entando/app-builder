import { combineReducers } from 'redux';

import {
  SET_ACTIVE_REGISTRY, SET_BUNDLE_STATUSES, SET_FETCHED_BUNDLES,
  SET_FETCHED_BUNDLE_GROUPS, SET_FETCHED_REGISTRIES,
  SET_SELECTED_BUNDLE_STATUS, SET_BUNDLE_GROUP_ID_FILTER,
} from 'state/component-repository/hub/types';

export const ECR_LOCAL_REGISTRY_NAME = 'Local Registry';

export const ECR_LOCAL_REGISTRY = {
  name: ECR_LOCAL_REGISTRY_NAME,
  url: '',
};

const selected = (state = ECR_LOCAL_REGISTRY, action = {}) => {
  switch (action.type) {
    case SET_ACTIVE_REGISTRY: {
      return action.payload.registry;
    }
    default: return state;
  }
};

const bundles = (state = [], action = {}) => {
  switch (action.type) {
    case SET_FETCHED_BUNDLES: {
      return action.payload.bundles;
    }
    default: return state;
  }
};

const registries = (state = [], action = {}) => {
  switch (action.type) {
    case SET_FETCHED_REGISTRIES: {
      return [ECR_LOCAL_REGISTRY, ...action.payload.registries];
    }
    default: return state;
  }
};
const bundleGroups = (state = [], action = {}) => {
  switch (action.type) {
    case SET_FETCHED_BUNDLE_GROUPS: {
      return action.payload.bundleGroups;
    }
    default: return state;
  }
};

const bundleStatuses = (state = [], action = {}) => {
  switch (action.type) {
    case SET_BUNDLE_STATUSES: {
      return action.payload.bundleStatuses;
    }
    case SET_SELECTED_BUNDLE_STATUS: {
      const filteredBundles = state.filter(b => b.id !== action.payload.bundleStatus.id);
      return [...filteredBundles, action.payload.bundleStatus];
    }
    default: return state;
  }
};

const selectedBundleStatus = (state = {}, action = {}) => {
  switch (action.type) {
    case SET_SELECTED_BUNDLE_STATUS: {
      return action.payload.bundleStatus;
    }
    default: return state;
  }
};

const bundleFilters = (state = {}, action = {}) => {
  switch (action.type) {
    case SET_BUNDLE_GROUP_ID_FILTER: {
      return { bundleGroupId: action.payload.value };
    }
    default: return state;
  }
};

export default combineReducers({
  selected,
  bundles,
  registries,
  bundleGroups,
  bundleStatuses,
  selectedBundleStatus,
  bundleFilters,
});
