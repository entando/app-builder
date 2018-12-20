
import { combineReducers } from 'redux';
import {
  SET_SELECTED_DE_COMPONENT,
  SET_DE_COMPONENTS,
  SET_DE_COMPONENT_LIST_VIEW_MODE,
  SET_DE_FILTERS,
  ADD_DE_FILTER,
  REMOVE_DE_FILTER,
} from 'state/digital-exchange/components/types';

import { DE_COMPONENTS_GRID_VIEW } from 'state/digital-exchange/components/const';

const selected = (state = {}, action = {}) => {
  switch (action.type) {
    case SET_SELECTED_DE_COMPONENT: {
      return action.payload.digitalExchangeComponent;
    }
    default: return state;
  }
};

const list = (state = [], action = {}) => {
  switch (action.type) {
    case SET_DE_COMPONENTS: {
      return action.payload.digitalExchangeComponents;
    }
    default: return state;
  }
};

const filters = (state = {}, action = {}) => {
  switch (action.type) {
    case SET_DE_FILTERS: {
      return action.payload.digitalExchangeFilters;
    }
    case ADD_DE_FILTER: {
      const filterToAdd = action.payload.digitalExchangeFilter;
      const formValues = { ...state.formValues, ...filterToAdd.formValues };
      const operators = { ...state.operators, ...filterToAdd.operators };
      return { formValues, operators };
    }
    case REMOVE_DE_FILTER: {
      const filterToRemove = action.payload.digitalExchangeFilter;
      // we assume there's only one key in the filterToRemove object
      // because we can only add/remove one filter per time
      const filterKey = Object.keys(filterToRemove.formValues)[0];
      const { formValues, operators } = state;
      if (formValues[filterKey] && operators[filterKey]) {
        const values = formValues[filterKey].filter(x => (
          !filterToRemove.formValues[filterKey].includes(x)
        ));

        if (!values.length) {
          const { [filterKey]: omit1, ...rest1 } = formValues;
          const { [filterKey]: omit2, ...rest2 } = operators;
          return Object.keys(rest1).length ? {
            formValues: rest1,
            operators: rest2,
          } : {};
        }

        return {
          formValues: {
            ...formValues,
            [filterKey]: values,
          },
          operators,
        };
      }

      return state;
    }
    default: return state;
  }
};

const componentListViewMode = (state = DE_COMPONENTS_GRID_VIEW, action = {}) => {
  switch (action.type) {
    case SET_DE_COMPONENT_LIST_VIEW_MODE: {
      return action.payload.componentListViewMode;
    }
    default: return state;
  }
};

export default combineReducers({
  selected,
  list,
  filters,
  componentListViewMode,
});
