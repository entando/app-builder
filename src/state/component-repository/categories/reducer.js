import { combineReducers } from 'redux';
import { SET_SELECTED_ECR_CATEGORY, SET_ECR_CATEGORIES } from 'state/component-repository/categories/types';
import { ALL_CATEGORIES_CATEGORY } from 'state/component-repository/categories/const';

const selected = (state = ALL_CATEGORIES_CATEGORY, action = {}) => {
  switch (action.type) {
    case SET_SELECTED_ECR_CATEGORY: {
      return action.payload.componentRepositoryCategory;
    }
    default: return state;
  }
};

const list = (state = [], action = {}) => {
  switch (action.type) {
    case SET_ECR_CATEGORIES: {
      return action.payload.componentRepositoryCategories;
    }
    default: return state;
  }
};

export default combineReducers({
  selected,
  list,
});
