import { combineReducers } from 'redux';
import { SET_PROFILE_TYPES } from 'state/profile-types/types';

const toMap = array => array.reduce((acc, profileTypes) => {
  acc[profileTypes.code] = profileTypes;
  return acc;
}, {});

const toIdList = array => array.map(profileTypes => profileTypes.code);

export const list = (state = [], action = {}) => {
  switch (action.type) {
    case SET_PROFILE_TYPES: {
      return toIdList(action.payload.profileTypes);
    }
    default: return state;
  }
};

const profileTypesMap = (state = {}, action = {}) => {
  switch (action.type) {
    case SET_PROFILE_TYPES: {
      return toMap(action.payload.profileTypes);
    }
    default: return state;
  }
};


export default combineReducers({
  list,
  map: profileTypesMap,
});
