import {
  TOGGLE_PAGE_EXPANDED,
  SET_PAGE_LOADING,
  SET_PAGE_LOADED,
} from './types';

const initialState = {};


const reducer = (state = initialState, action = {}) => {
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
      const { pageCode, loading } = action.payload;
      return {
        ...state,
        [pageCode]: { ...state[pageCode], loading },
      };
    }
    case SET_PAGE_LOADED: {
      const { pageCode, loaded } = action.payload;
      return {
        ...state,
        [pageCode]: { ...state[pageCode], loaded },
      };
    }
    default: return state;
  }
};

export default reducer;
