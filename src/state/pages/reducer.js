
import { combineReducers } from 'redux';
import { ADD_PAGES, TOGGLE_PAGE_EXPANDED, SET_PAGE_LOADING, SET_PAGE_LOADED, SET_PAGE_PARENT, MOVE_PAGE } from './types';


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
    default: return state;
  }
};

const childrenMap = (state = {}, action = {}) => {
  switch (action.type) {
    case ADD_PAGES: {
      return {
        ...state,
        ...toMap(action.payload.pages, 'children'),
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
    default: return state;
  }
};

const statusMap = (state = {}, action = {}) => {
  switch (action.type) {
    case TOGGLE_PAGE_EXPANDED: {
      const { pageCode } = action.payload;
      const expanded = !(state[pageCode] && state[pageCode].expanded);
      return {
        ...state,
        [pageCode]: { ...state[pageCode], expanded },
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
    default: return state;
  }
};

export default combineReducers({
  map: reducer,
  childrenMap,
  titlesMap,
  statusMap,
});
