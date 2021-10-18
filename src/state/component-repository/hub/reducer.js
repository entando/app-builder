import { combineReducers } from 'redux';

import { SET_ACTIVE_REGISTRY, SET_BUNDLE_STATUSES, SET_FETCHED_BUNDLES, SET_FETCHED_BUNDLE_GROUPS, SET_FETCHED_REGISTRIES, SET_SELECTED_BUNDLE_STATUS } from 'state/component-repository/hub/types';

export const ECR_LOCAL_REGISTRY_NAME = 'Local Registry';

const ECR_LOCAL_REGISTRY = {
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
    default: return state;
  }
};

const selectedBundleStatus = (state = [], action = {}) => {
  switch (action.type) {
    case SET_SELECTED_BUNDLE_STATUS: {
      return action.payload.bundleStatuses[0];
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
});
