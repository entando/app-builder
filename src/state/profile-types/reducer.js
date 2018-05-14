import { combineReducers } from 'redux';
import {
  SET_PROFILE_TYPES,
  REMOVE_PROFILE_TYPE,
  REMOVE_ATTRIBUTE,
  SET_ATTRIBUTES,
  SET_SELECTED_PROFILE_TYPE,
  SET_SELECTED_ATTRIBUTE_FOR_PROFILETYPE,
  SET_SELECTED_ATTRIBUTE,
} from 'state/profile-types/types';

const toMap = array => array.reduce((acc, profileType) => {
  acc[profileType.code] = profileType;
  return acc;
}, {});

const toIdList = array => array.map(profileType => profileType.code);

export const list = (state = [], action = {}) => {
  switch (action.type) {
    case SET_PROFILE_TYPES: {
      return toIdList(action.payload.profileTypes);
    }
    case REMOVE_PROFILE_TYPE: {
      const { profileTypeCode } = action.payload;
      return state.filter(item => item !== profileTypeCode);
    }
    default: return state;
  }
};

const profileTypeMap = (state = {}, action = {}) => {
  switch (action.type) {
    case SET_PROFILE_TYPES: {
      return toMap(action.payload.profileTypes);
    }
    case REMOVE_PROFILE_TYPE: {
      const { profileTypeCode } = action.payload;
      const newState = { ...state };
      delete newState[profileTypeCode];
      return newState;
    }
    case REMOVE_ATTRIBUTE: {
      const { profileTypeCode, attributeCode } = action.payload;
      const attributes =
        state[profileTypeCode]
          .attributes.filter(f => f.code !== attributeCode);
      return { ...state, [profileTypeCode]: { ...state[profileTypeCode], attributes } };
    }
    default: return state;
  }
};

export const attributeList = (state = [], action = {}) => {
  switch (action.type) {
    case SET_ATTRIBUTES: {
      return action.payload.attributes;
    }
    default: return state;
  }
};

export const selectedProfileType = (state = {}, action = {}) => {
  switch (action.type) {
    case SET_SELECTED_PROFILE_TYPE: {
      return action.payload.profileType;
    }
    case SET_SELECTED_ATTRIBUTE_FOR_PROFILETYPE: {
      return { ...state, attributeSelected: action.payload.attribute };
    }
    default: return state;
  }
};
export const selectedAttribute = (state = {}, action = {}) => {
  switch (action.type) {
    case SET_SELECTED_ATTRIBUTE: {
      return action.payload.attribute;
    }
    default: return state;
  }
};

export default combineReducers({
  list,
  map: profileTypeMap,
  selected: selectedProfileType,
  attributes: combineReducers({
    list: attributeList,
    selected: selectedAttribute,
  }),
});
