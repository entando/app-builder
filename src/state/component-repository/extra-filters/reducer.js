import { combineReducers } from 'redux';
import { SET_SELECTED_ECR_EXTRA_FILTER, SET_ECR_EXTRA_FILTERS } from 'state/component-repository/extra-filters/types';

const selected = (state = 'explore', action = {}) => {
  switch (action.type) {
    case SET_SELECTED_ECR_EXTRA_FILTER: {
      return action.payload.componentRepositoryExtraFilter;
    }
    default: return state;
  }
};

const list = (state = [], action = {}) => {
  switch (action.type) {
    case SET_ECR_EXTRA_FILTERS: {
      return action.payload.componentRepositoryExtraFilters;
    }
    default: return state;
  }
};

export default combineReducers({
  selected,
  list,
});
