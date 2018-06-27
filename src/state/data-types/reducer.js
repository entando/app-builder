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
  SET_DATA_TYPE_REFERENCE_STATUS,
  SET_ACTION_MODE,
  REMOVE_ATTRIBUTE_FROM_COMPOSITE,
  MOVE_ATTRIBUTE_FROM_COMPOSITE,
} from 'state/data-types/types';

import { swapItems } from 'state/attributes/utils';

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
      const { attributeIndex } = action.payload;
      const { attributes } = state;
      const newState = { ...state };
      return {
        ...newState,
        attributes: swapItems(attributes, attributeIndex, true),
      };
    }
    case MOVE_ATTRIBUTE_DOWN: {
      const { attributeIndex } = action.payload;
      const { attributes } = state;
      const newState = { ...state };
      return {
        ...newState,
        attributes: swapItems(attributes, attributeIndex, false),
      };
    }
    case REMOVE_ATTRIBUTE: {
      const { attributeCode } = action.payload;
      const attributes =
        state.attributes.filter(f => f.code !== attributeCode);
      return { ...state, attributes };
    }
    case SET_ACTION_MODE: {
      return { ...state, actionMode: action.payload.actionMode };
    }
    case REMOVE_ATTRIBUTE_FROM_COMPOSITE: {
      const { attributeCode } = action.payload;
      const compositeAttributes =
        state.attributeSelected.compositeAttributes.filter(f => f.code !== attributeCode);
      return {
        ...state,
        attributeSelected: {
          ...state.attributeSelected,
          compositeAttributes,
        },
      };
    }
    case MOVE_ATTRIBUTE_FROM_COMPOSITE: {
      const { fromIndex, toIndex } = action.payload;
      const { compositeAttributes } = state.attributeSelected;
      const from = compositeAttributes.splice(fromIndex, 1)[0];
      compositeAttributes.splice(toIndex, 0, from);
      return {
        ...state,
        attributeSelected: {
          ...state.attributeSelected,
          compositeAttributes,
        },
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

export const status = (state = [], action = {}) => {
  switch (action.type) {
    case SET_DATA_TYPE_REFERENCE_STATUS: {
      return action.payload.dataTypeStatus;
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
  references: combineReducers({
    status,
  }),
});
