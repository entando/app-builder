import { get, head, omit } from 'lodash';
import { combineReducers } from 'redux';
import {
  SET_SELECTED_DE_COMPONENT,
  SET_DE_COMPONENTS,
  SET_DE_COMPONENT_LIST_VIEW_MODE,
  SET_DE_FILTER,
  START_COMPONENT_INSTALLATION,
  FINISH_COMPONENT_INSTALLATION,
  FAIL_COMPONENT_INSTALLATION,
} from 'state/digital-exchange/components/types';

import {
  DE_COMPONENTS_GRID_VIEW,
  DE_COMPONENT_INSTALLATION_STATUS_IN_PROGRESS,
  DE_COMPONENT_INSTALLATION_STATUS_ERROR,
} from 'state/digital-exchange/components/const';

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
    case FINISH_COMPONENT_INSTALLATION: {
      const componentIndex = state.findIndex(objectInArray => (
        objectInArray.id === action.payload.id
      ));

      if (componentIndex === -1) {
        return state;
      }
      const newState = state.slice();
      newState.splice(componentIndex, 1, {
        ...state[componentIndex],
        installed: true,
      });
      return newState;
    }
    default: return state;
  }
};

const getFirstKey = (obj) => {
  const keys = obj ? Object.keys(obj) : [];
  return head(keys);
};

const getFilterKey = (filter) => {
  const firstFormValuesKey = getFirstKey(get(filter, 'formValues'));
  const firstOperatorsKey = getFirstKey(get(filter, 'operators'));

  return firstFormValuesKey && firstOperatorsKey && firstFormValuesKey === firstOperatorsKey
    ? firstFormValuesKey
    : null;
};

const addOrUpdateFilter = (filter, state, category) => {
  const firstFilterOfThatCategory = !get(state, `${category}.formValues`);
  const newStateSlice = firstFilterOfThatCategory
    ? filter
    : {
      formValues: {
        ...state[category].formValues,
        ...filter.formValues,
      },
      operators: {
        ...state[category].operators,
        ...filter.operators,
      },
    };

  return {
    ...state,
    [category]: newStateSlice,
  };
};

const removeFilter = (filter, state, category) => {
  const filterKey = getFilterKey(filter);
  const stateSlice = state[category];
  const stateFormValues = get(stateSlice, 'formValues', {});
  const isTheOnlyFilter = Object.keys(stateFormValues).length === 1
    && getFilterKey(stateSlice) === filterKey;

  const newStateSlice = isTheOnlyFilter
    ? undefined
    : {
      formValues: omit(stateSlice.formValues, filterKey),
      operators: omit(stateSlice.operators, filterKey),
    };

  return {
    ...state,
    [category]: newStateSlice,
  };
};

const filters = (state = {}, action = {}) => {
  switch (action.type) {
    case SET_DE_FILTER: {
      const category = action.payload.digitalExchangeCategory;
      const filter = action.payload.digitalExchangeFilter;
      const filterKey = getFilterKey(filter);

      if (!filter || !filterKey || !category) {
        return state;
      }

      const filterValue = get(filter, `formValues.${filterKey}`);
      const willAddOrUpdateFilter = Array.isArray(filterValue)
        ? filterValue.length
        : (filterValue !== null && filterValue !== undefined);

      return willAddOrUpdateFilter
        ? addOrUpdateFilter(filter, state, category)
        : removeFilter(filter, state, category);
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

const installation = (state = {}, action = {}) => {
  switch (action.type) {
    case START_COMPONENT_INSTALLATION: {
      return {
        ...state,
        [action.payload.id]: DE_COMPONENT_INSTALLATION_STATUS_IN_PROGRESS,
      };
    }
    case FAIL_COMPONENT_INSTALLATION: {
      return {
        ...state,
        [action.payload.id]: DE_COMPONENT_INSTALLATION_STATUS_ERROR,
      };
    }
    case FINISH_COMPONENT_INSTALLATION: {
      return { ...omit(state, action.payload.id) };
    }
    default: return state;
  }
};

export default combineReducers({
  selected,
  list,
  filters,
  componentListViewMode,
  installation,
});
