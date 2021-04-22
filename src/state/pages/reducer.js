import { combineReducers } from 'redux';
import {
  ADD_PAGES,
  REMOVE_PAGE,
  SET_PAGE_EXPANDED,
  SET_PAGE_LOADING,
  SET_PAGE_LOADED,
  SET_PAGE_PARENT,
  MOVE_PAGE,
  SET_FREE_PAGES,
  SET_SELECTED_PAGE,
  SET_REFERENCES_SELECTED_PAGE,
  UPDATE_PAGE,
  SEARCH_PAGES,
  CLEAR_SEARCH,
  CLEAR_TREE,
  BATCH_TOGGLE_EXPANDED,
  COLLAPSE_ALL,
} from 'state/pages/types';

// creates a map from an array
const toMap = (array, propKey) => array.reduce((acc, page) => {
  acc[page.code] = propKey ? page[propKey] : page;
  return acc;
}, {});

// map reducer
const reducer = (state = {}, action = {}) => {
  switch (action.type) {
    case ADD_PAGES: {
      const pages = action.payload.pages.map((page) => {
        const { children, ...result } = page;
        return result;
      });
      return {
        ...state,
        ...toMap(pages),
      };
    }
    case SET_PAGE_PARENT: {
      // replace the parent code on the page and sets the new position
      const { newParentCode, pageCode } = action.payload;
      return {
        ...state,
        [pageCode]: {
          ...state[pageCode],
          parentCode: newParentCode,
        },
      };
    }
    case MOVE_PAGE: {
      // replace the parent code on the page and sets the new position
      const { newParentCode, pageCode } = action.payload;
      return {
        ...state,
        [pageCode]: {
          ...state[pageCode],
          parentCode: newParentCode,
        },
      };
    }
    case REMOVE_PAGE: {
      const { code } = action.payload.page;
      const newState = { ...state };
      delete newState[code];
      return newState;
    }
    case UPDATE_PAGE: {
      const { page } = action.payload;
      return { ...state, [page.code]: page };
    }
    case CLEAR_TREE: {
      return {};
    }
    default: return state;
  }
};

const childrenMap = (state = {}, action = {}) => {
  switch (action.type) {
    case ADD_PAGES: {
      const newValues = {};
      action.payload.pages.forEach((page) => {
        if (state[page.parentCode] && !state[page.parentCode].includes(page.code)) {
          newValues[page.parentCode] = [...state[page.parentCode]];
          newValues[page.parentCode].push(page.code);
        }
      });
      return {
        ...state,
        ...toMap(action.payload.pages, 'children'),
        ...newValues,
      };
    }
    case SET_PAGE_PARENT: {
      // adds the child to the new parent and removes it from the old parent
      const { oldParentCode, newParentCode, pageCode } = action.payload;
      return {
        ...state,
        [newParentCode]: [...state[newParentCode], pageCode],
        [oldParentCode]: state[oldParentCode].filter(code => code !== pageCode),
      };
    }
    case MOVE_PAGE: {
      const {
        oldParentCode, newParentCode, pageCode, newPosition,
      } = action.payload;
      // creates new states for new and old parent children
      const oldParentChildren = state[oldParentCode].filter(code => code !== pageCode);
      const newParentChildren = state[newParentCode].filter(code => code !== pageCode);
      const index = newPosition - 1;
      // insert pageCode at index
      newParentChildren.splice(index, 0, pageCode);
      return {
        ...state,
        [oldParentCode]: oldParentChildren,
        [newParentCode]: newParentChildren,
      };
    }
    case REMOVE_PAGE: {
      const { parentCode, code } = action.payload.page;
      const newState = { ...state };
      if (parentCode) {
        newState[parentCode] = newState[parentCode].filter(f => f !== code);
      }
      delete newState[code];
      return newState;
    }
    case CLEAR_TREE: {
      return {};
    }
    default: return state;
  }
};

const titlesMap = (state = {}, action = {}) => {
  switch (action.type) {
    case ADD_PAGES: {
      return {
        ...state,
        ...toMap(action.payload.pages, 'titles'),
      };
    }
    case UPDATE_PAGE: {
      const { page } = action.payload;
      return { ...state, ...toMap([page], 'titles') };
    }
    case REMOVE_PAGE: {
      const { code } = action.payload.page;
      const newState = { ...state };
      delete newState[code];
      return newState;
    }
    case CLEAR_TREE: {
      return {};
    }
    default: return state;
  }
};

const toggleBatchExpandedValues = (arr, toggleValue) => arr.reduce((currentState, pageCode) => (
  {
    ...currentState,
    [pageCode]: { loaded: true, loading: false, expanded: toggleValue },
  }
), {});

const statusMap = (state = {}, action = {}) => {
  switch (action.type) {
    case SET_PAGE_EXPANDED: {
      const { pageCode, expanded } = action.payload;
      return {
        ...state,
        [pageCode]: {
          ...state[pageCode],
          expanded: expanded !== undefined ? expanded : true,
        },
      };
    }
    case SET_PAGE_LOADING: {
      const { pageCode } = action.payload;
      return {
        ...state,
        [pageCode]: { ...state[pageCode], loading: true },
      };
    }
    case SET_PAGE_LOADED: {
      const { pageCode } = action.payload;
      return {
        ...state,
        [pageCode]: { ...state[pageCode], loaded: true, loading: false },
      };
    }
    case CLEAR_TREE: {
      return {};
    }
    case BATCH_TOGGLE_EXPANDED: {
      const pageCodes = action.payload;
      return toggleBatchExpandedValues(pageCodes, true);
    }
    case COLLAPSE_ALL: {
      const pageCodes = Object.keys(state);
      return pageCodes.reduce((currentState, pageCode) => {
        const { loaded } = state[pageCode];
        return {
          ...currentState,
          [pageCode]: { expanded: false, loading: false, loaded },
        };
      }, {});
    }
    default: return state;
  }
};

const freePages = (state = [], action = {}) => {
  switch (action.type) {
    case SET_FREE_PAGES: {
      return action.payload.freePages;
    }
    case CLEAR_TREE: {
      return [];
    }
    default: return state;
  }
};

const selected = (state = null, action = {}) => {
  switch (action.type) {
    case SET_SELECTED_PAGE: {
      return action.payload.page;
    }
    case SET_REFERENCES_SELECTED_PAGE: {
      const { references } = action.payload;
      return { ...state, ref: references || [] };
    }
    case REMOVE_PAGE: {
      const { code } = action.payload.page;
      return state && state.code === code ? null : state;
    }
    case CLEAR_TREE: {
      return null;
    }
    default: return state;
  }
};

export const search = (state = [], action = {}) => {
  switch (action.type) {
    case SEARCH_PAGES: {
      return action.payload.pages;
    }
    case REMOVE_PAGE: {
      if (state === null || state.length === 0) {
        return state;
      }
      const { code } = action.payload.page;
      return state.filter(item => item.code !== code);
    }
    case CLEAR_SEARCH: {
      return null;
    }
    default: return state;
  }
};

export default combineReducers({
  map: reducer,
  childrenMap,
  titlesMap,
  statusMap,
  freePages,
  selected,
  search,
});
