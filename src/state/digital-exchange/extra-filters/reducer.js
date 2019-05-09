import { combineReducers } from 'redux';
import { SET_SELECTED_DE_EXTRA_FILTER, SET_DE_EXTRA_FILTERS } from 'state/digital-exchange/extra-filters/types';

const selected = (state = 'explore', action = {}) => {
  switch (action.type) {
    case SET_SELECTED_DE_EXTRA_FILTER: {
      return action.payload.digitalExchangeExtraFilter;
    }
    default: return state;
  }
};

const list = (state = [], action = {}) => {
  switch (action.type) {
    case SET_DE_EXTRA_FILTERS: {
      return action.payload.digitalExchangeExtraFilters;
    }
    default: return state;
  }
};

export default combineReducers({
  selected,
  list,
});
