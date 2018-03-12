import { combineReducers } from 'redux';
import { SET_DATA_TYPES } from 'state/data-types/types';

const toMap = array => array.reduce((acc, dataType) => {
  acc[dataType.code] = dataType;
  return acc;
}, {});

const toIdList = array => array.map(dataType => dataType.code);

export const list = (state = [], action = {}) => {
  switch (action.type) {
    case SET_DATA_TYPES: {
      return toIdList(action.payload.dataTypes);
    }
    default: return state;
  }
};

const dataTypeMap = (state = {}, action = {}) => {
  switch (action.type) {
    case SET_DATA_TYPES: {
      return toMap(action.payload.dataTypes);
    }
    default: return state;
  }
};


export default combineReducers({
  list,
  map: dataTypeMap,
});
