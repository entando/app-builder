import { combineReducers } from 'redux';
import {
  SET_DATA_TYPES,
  REMOVE_DATA_TYPE,
  REMOVE_ATTRIBUTE,
  SET_ATTRIBUTES,
  SET_SELECTED_DATA_TYPE,
  SET_SELECTED_ATTRIBUTE_FOR_DATATYPE,
  SET_SELECTED_ATTRIBUTE,
  MOVE_ATTRIBUTE_UP,
  MOVE_ATTRIBUTE_DOWN,
} from 'state/data-types/types';

const toMap = array => array.reduce((acc, dataType) => {
  acc[dataType.code] = dataType;
  return acc;
}, {});

const toIdList = array => array.map(dataType => dataType.code);

const swapItems = (attributes, attributeCode, isMovableUp) => {
  const attributesArray = [...attributes];
  const attrIndex = attributes.indexOf(attributes.filter(item => (
    item.code === attributeCode))[0]);
  let swapIndex;
  if (isMovableUp) {
    swapIndex = attrIndex > 0 ? attrIndex - 1 : 0;
  } else {
    swapIndex = attrIndex < attributesArray.length ? attrIndex + 1 : attributesArray.length;
  }
  const temp = attributes[attrIndex];
  attributesArray[attrIndex] = attributes[swapIndex];
  attributesArray[swapIndex] = temp;

  return attributesArray;
};

export const list = (state = [], action = {}) => {
  switch (action.type) {
    case SET_DATA_TYPES: {
      return toIdList(action.payload.dataTypes);
    }
    case REMOVE_DATA_TYPE: {
      const { dataTypeCode } = action.payload;
      return state.filter(item => item !== dataTypeCode);
    }
    default: return state;
  }
};

const dataTypeMap = (state = {}, action = {}) => {
  switch (action.type) {
    case SET_DATA_TYPES: {
      return toMap(action.payload.dataTypes);
    }
    case REMOVE_DATA_TYPE: {
      const { dataTypeCode } = action.payload;
      const newState = { ...state };
      delete newState[dataTypeCode];
      return newState;
    }
    case REMOVE_ATTRIBUTE: {
      const { dataTypeCode, attributeCode } = action.payload;
      const attributes =
        state[dataTypeCode]
          .attributes.filter(f => f.code !== attributeCode);
      return { ...state, [dataTypeCode]: { ...state[dataTypeCode], attributes } };
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

export const selectedDataType = (state = {}, action = {}) => {
  switch (action.type) {
    case SET_SELECTED_DATA_TYPE: {
      return action.payload.dataType;
    }
    case SET_SELECTED_ATTRIBUTE_FOR_DATATYPE: {
      return { ...state, attributeSelected: action.payload.attribute };
    }
    case MOVE_ATTRIBUTE_UP: {
      const { attributeCode } = action.payload;
      const { attributes } = state;
      const newState = { ...state };
      return {
        ...newState,
        attributes: swapItems(attributes, attributeCode, true),
      };
    }
    case MOVE_ATTRIBUTE_DOWN: {
      const { attributeCode } = action.payload;
      const { attributes } = state;
      const newState = { ...state };
      return {
        ...newState,
        attributes: swapItems(attributes, attributeCode, false),
      };
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
  map: dataTypeMap,
  selected: selectedDataType,
  attributes: combineReducers({
    list: attributeList,
    selected: selectedAttribute,
  }),
});
