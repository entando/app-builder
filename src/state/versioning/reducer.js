import { combineReducers } from 'redux';
import {
  SET_VERSIONINGS, SET_SELECTED_VERSIONING_TYPE,
  SET_SINGLE_CONTENT_VERSION_DETAILS, SET_RESOURCE_VERSIONINGS,
  SET_VERSIONING_CONFIG,
} from 'state/versioning/types';

export const toMap = array => array.reduce((acc, versioning) => {
  acc[versioning.id] = versioning;
  return acc;
}, {});

export const toIdListVersioningList = array => array.map(versioning => versioning.id);

export const list = (state = [], action = {}) => {
  switch (action.type) {
    case SET_VERSIONINGS: {
      return toIdListVersioningList(action.payload.versionings);
    }
    default: return state;
  }
};

export const resourceList = (state = [], action = {}) => {
  switch (action.type) {
    case SET_RESOURCE_VERSIONINGS: {
      return toIdListVersioningList(action.payload.versionings);
    }
    default: return state;
  }
};

export const selected = (state = {}, action = {}) => {
  switch (action.type) {
    case SET_SELECTED_VERSIONING_TYPE: {
      return action.payload;
    }
    default: return state;
  }
};

export const versioningMap = (state = {}, action = {}) => {
  switch (action.type) {
    case SET_VERSIONINGS: {
      return toMap(action.payload.versionings);
    }
    default: return state;
  }
};

export const resourceVersioningMap = (state = {}, action = {}) => {
  switch (action.type) {
    case SET_RESOURCE_VERSIONINGS: {
      return toMap(action.payload.versionings);
    }
    default: return state;
  }
};

export const contentVersionDetails = (state = {}, action = {}) => {
  switch (action.type) {
    case SET_SINGLE_CONTENT_VERSION_DETAILS: {
      return action.payload;
    }
    default: return state;
  }
};

export const versioningConfig = (state = {}, action = {}) => {
  switch (action.type) {
    case SET_VERSIONING_CONFIG: {
      return action.payload;
    }
    default: return state;
  }
};

export default combineReducers({
  list,
  resourceList,
  map: versioningMap,
  resourceMap: resourceVersioningMap,
  selected,
  contentVersionDetails,
  versioningConfig,
});
