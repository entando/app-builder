import { combineReducers } from 'redux';

import { DEPLOY_BUNDLE, SET_ACTIVE_REGISTRY, SET_DEPLOYED_BUNDLES, SET_FETCHED_BUNDLES, SET_FETCHED_BUNDLE_GROUPS, SET_FETCHED_REGISTRIES, UNDEPLOY_BUNDLE } from 'state/component-repository/hub/types';

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

const deployedBundles = (state = [], action = {}) => {
  switch (action.type) {
    case SET_DEPLOYED_BUNDLES: {
      return action.payload.bundles;
    }
    case DEPLOY_BUNDLE: {
      return [...state, action.payload.bundle];
    }
    case UNDEPLOY_BUNDLE: {
      return state.filter(bundle => bundle.id !== action.payload.bundle.id);
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

export default combineReducers({
  selected,
  bundles,
  registries,
  bundleGroups,
  deployedBundles,
});
