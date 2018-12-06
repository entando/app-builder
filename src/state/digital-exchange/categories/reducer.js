import { combineReducers } from 'redux';
import { SET_SELECTED_DE_CATEGORY, SET_DE_CATEGORIES } from 'state/digital-exchange/categories/types';


const selected = (state = {}, action = {}) => {
  switch (action.type) {
    case SET_SELECTED_DE_CATEGORY: {
      return action.payload.digitalExchangeCategory;
    }
    default: return state;
  }
};

const list = (state = [], action = {}) => {
  switch (action.type) {
    case SET_DE_CATEGORIES: {
      return action.payload.digitalExchangeCategories;
    }
    default: return state;
  }
};

export default combineReducers({
  selected,
  list,
});
