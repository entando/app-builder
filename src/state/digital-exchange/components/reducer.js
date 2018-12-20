import { isEmpty, get } from 'lodash';
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

const getFirstKey = obj => (
  obj && Object.keys(obj) && Object.keys(obj).length
    ? Object.keys(obj)[0]
    : null
);
const getFilterKey = filter => (
  filter && filter.formValues && filter.operators && getFirstKey(filter.formValues)
  && getFirstKey(filter.formValues) === getFirstKey(filter.operators)
    ? getFirstKey(filter.formValues) : null
);

const filters = (state = {}, action = {}) => {
  switch (action.type) {
    case SET_DE_FILTERS: {
      return action.payload.digitalExchangeFilters;
    }
    case ADD_DE_FILTER: {
      const filterToAdd = action.payload.digitalExchangeFilter;

      const filterKey = getFilterKey(filterToAdd);

      const noFilterToAdd = !filterKey;
      if (noFilterToAdd) {
        return state;
      }

      const hasFilterWithGivenKey = get(state, `formValues[${filterKey}]`) && get(state, `operators[${filterKey}]`)
        && state.operators[filterKey] === filterToAdd.operators[filterKey];

      if (hasFilterWithGivenKey) {
        const formValuesOfThatKind = [...new Set([
          ...state.formValues[filterKey],
          ...filterToAdd.formValues[filterKey],
        ])];

        const formValues = {
          ...state.formValues,
          [filterKey]: formValuesOfThatKind,
        };

        const operators = { ...state.operators, ...filterToAdd.operators };
        return { formValues, operators };
      }

      const formValues = { ...state.formValues, ...filterToAdd.formValues };
      const operators = { ...state.operators, ...filterToAdd.operators };
      return { formValues, operators };
    }
    case REMOVE_DE_FILTER: {
      const filterToRemove = action.payload.digitalExchangeFilter;

      const filterKey = getFilterKey(filterToRemove);
      const { formValues, operators } = state;

      const noFilterToRemove = !filterKey || !formValues[filterKey] || !operators[filterKey]
        || (operators[filterKey] !== filterToRemove.operators[filterKey]);
      if (noFilterToRemove) {
        return state;
      }

      const remainingFormValuesForFilterKey = formValues[filterKey].filter(value => (
        !filterToRemove.formValues[filterKey].includes(value)
      ));

      if (!remainingFormValuesForFilterKey.length) {
        const { [filterKey]: formValuesToRemove, ...otherFormValues } = formValues;
        const { [filterKey]: operatorsToRemove, ...otherOperators } = operators;
        return !isEmpty(otherFormValues) ? {
          formValues: otherFormValues,
          operators: otherOperators,
        } : {};
      }

      return {
        formValues: {
          ...formValues,
          [filterKey]: remainingFormValuesForFilterKey,
        },
        operators,
      };
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
