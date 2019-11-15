import { combineReducers } from 'redux';
import { SET_CONTENT_TYPES } from 'state/content-type/types';


export const toMap = array => array.reduce((acc, contentType) => {
  acc[contentType.code] = contentType;
  return acc;
}, {});

export const toIdList = array => array.map(contentType => contentType.code);

export const list = (state = [], action = {}) => {
  switch (action.type) {
    case SET_CONTENT_TYPES: {
      return toIdList(action.payload.list);
    }
    default:
      return state;
  }
};

const contentTypeMap = (state = {}, action = {}) => {
  switch (action.type) {
    case SET_CONTENT_TYPES: {
      return toMap(action.payload.list);
    }
    default:
      return state;
  }
};

export default combineReducers({
  list,
  map: contentTypeMap,
});
