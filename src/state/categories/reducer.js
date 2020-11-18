import { combineReducers } from 'redux';
import {
  SET_CATEGORIES, TOGGLE_CATEGORY_EXPANDED, SET_CATEGORY_LOADING,
  SET_CATEGORY_LOADED, SET_SELECTED_CATEGORY, REMOVE_CATEGORY,
  SET_REFERENCES,
} from 'state/categories/types';

const toMap = (array, propKey) => array.reduce((acc, category) => {
  acc[category.code] = propKey ? category[propKey] : category;
  return acc;
}, {});

export const toIdList = array => array.map(category => category.code);

export const list = (state = [], action = {}) => {
  switch (action.type) {
    case SET_CATEGORIES: {
      return toIdList(action.payload.categories);
    }
    case REMOVE_CATEGORY: {
      const { categoryCode } = action.payload;
      return state.filter(category => category !== categoryCode);
    }
    default: return state;
  }
};

const categoryMap = (state = {}, action = {}) => {
  switch (action.type) {
    case SET_CATEGORIES: {
      const categories = action.payload.categories.map((category) => {
        const { children, ...result } = category;
        return result;
      });
      return {
        ...state,
        ...toMap(categories),
      };
    }
    case REMOVE_CATEGORY: {
      const { categoryCode } = action.payload;
      const newState = { ...state };
      delete newState[categoryCode];
      return newState;
    }
    default: return state;
  }
};

const childrenMap = (state = {}, action = {}) => {
  switch (action.type) {
    case SET_CATEGORIES: {
      return {
        ...state,
        ...toMap(action.payload.categories, 'children'),
      };
    }
    case REMOVE_CATEGORY: {
      const { categoryCode, parentCode } = action.payload;
      const newState = {
        ...state,
        [parentCode]: state[parentCode] && (
          state[parentCode].filter(child => child !== categoryCode)
        ),
      };
      delete newState[categoryCode];
      return newState;
    }
    default: return state;
  }
};

const titlesMap = (state = {}, action = {}) => {
  switch (action.type) {
    case SET_CATEGORIES: {
      return {
        ...state,
        ...toMap(action.payload.categories, 'titles'),
      };
    }
    case REMOVE_CATEGORY: {
      const { categoryCode } = action.payload;
      const newState = { ...state };
      delete newState[categoryCode];
      return newState;
    }
    default: return state;
  }
};

const statusMap = (state = {}, action = {}) => {
  switch (action.type) {
    case TOGGLE_CATEGORY_EXPANDED: {
      const { categoryCode, expanded } = action.payload;
      const expand = !(state[categoryCode] && state[categoryCode].expanded);
      return {
        ...state,
        [categoryCode]: {
          ...state[categoryCode],
          expanded: expanded !== undefined ? expanded : expand,
        },
      };
    }
    case SET_CATEGORY_LOADING: {
      const { categoryCode } = action.payload;
      return {
        ...state,
        [categoryCode]: { ...state[categoryCode], loading: true },
      };
    }
    case SET_CATEGORY_LOADED: {
      const { categoryCode } = action.payload;
      return {
        ...state,
        [categoryCode]: { ...state[categoryCode], loaded: true, loading: false },
      };
    }
    case REMOVE_CATEGORY: {
      const { categoryCode } = action.payload;
      const newState = { ...state };
      delete newState[categoryCode];
      return newState;
    }
    default: return state;
  }
};

const getRefKeyList = (category) => {
  const refKeyList = [];
  if (category.references) {
    const references = Object.keys(category.references);
    references.forEach((referenceKey) => {
      refKeyList.push(referenceKey);
    });
  }
  return refKeyList;
};

const selected = (state = {}, action = {}) => {
  switch (action.type) {
    case SET_SELECTED_CATEGORY: {
      return {
        ...action.payload.category,
        referenceKeyList: getRefKeyList(action.payload.category),
      };
    }
    case SET_REFERENCES: {
      return {
        ...state,
        referenceMap: { ...state.referenceMap, ...action.payload.references },
      };
    }
    default: return state;
  }
};

export default combineReducers({
  list,
  map: categoryMap,
  childrenMap,
  titlesMap,
  statusMap,
  selected,
});
