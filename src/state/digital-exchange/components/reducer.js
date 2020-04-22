import { get, head, omit } from 'lodash';
import { combineReducers } from 'redux';
import {
  SET_SELECTED_DE_COMPONENT,
  SET_DE_COMPONENTS,
  SET_DE_COMPONENT_LIST_VIEW_MODE,
  SET_DE_FILTER,
  START_COMPONENT_INSTALLATION,
  FINISH_COMPONENT_INSTALLATION,
  COMPONENT_INSTALLATION_FAILED,
  COMPONENT_INSTALL_ONGOING_PROGRESS,
  START_COMPONENT_UNINSTALLATION,
  FINISH_COMPONENT_UNINSTALLATION,
  COMPONENT_UNINSTALLATION_FAILED,
  COMPONENT_UNINSTALL_ONGOING_PROGRESS,
  SET_COMPONENT_USAGE_LIST,
  CLEAR_DE_SEARCH_FILTER,
} from 'state/digital-exchange/components/types';

import {
  DE_COMPONENTS_GRID_VIEW,
  DE_COMPONENT_INSTALLATION_STATUS_IN_PROGRESS,
  DE_COMPONENT_UNINSTALLATION_STATUS_IN_PROGRESS,
  DE_COMPONENT_INSTALLATION_STATUS_ERROR,
} from 'state/digital-exchange/components/const';

import { findComponentInListById } from 'state/digital-exchange/components/selectors';

const selected = (state = {}, action = {}) => {
  switch (action.type) {
    case SET_SELECTED_DE_COMPONENT: {
      return action.payload.digitalExchangeComponent;
    }
    default: return state;
  }
};

const updateComponentInfo = (listState, componentIndex, newProps) => {
  const newListState = listState.slice();
  newListState.splice(componentIndex, 1, {
    ...listState[componentIndex],
    ...newProps,
  });
  return newListState;
};

const markComponentLastInstallStatus = (state, componentId, lastInstallStatus) => {
  const componentIndex = findComponentInListById(state, componentId);
  if (componentIndex === -1) {
    return state;
  }
  return updateComponentInfo(state, componentIndex, { lastInstallStatus });
};

const markComponentLastStatusAsClear = (state, componentId) => (
  markComponentLastInstallStatus(state, componentId, '')
);

const markComponentLastStatusAsError = (state, componentId) => (
  markComponentLastInstallStatus(state, componentId, DE_COMPONENT_INSTALLATION_STATUS_ERROR)
);

const markComponentLastStatusAsInstallInProgress = (state, componentId) => (
  markComponentLastInstallStatus(state, componentId, DE_COMPONENT_INSTALLATION_STATUS_IN_PROGRESS)
);

const markComponentLastStatusAsUninstallInProgress = (state, componentId) => (
  markComponentLastInstallStatus(state, componentId, DE_COMPONENT_UNINSTALLATION_STATUS_IN_PROGRESS)
);

const markComponentInstalledStatus = (state, componentId, installed) => {
  const componentIndex = findComponentInListById(state, componentId);
  if (componentIndex === -1) {
    return state;
  }
  return updateComponentInfo(state, componentIndex, { installed });
};

const markComponentAsInstalled = (state, componentId) => (
  markComponentInstalledStatus(state, componentId, true)
);
const markComponentAsUninstalled = (state, componentId) => (
  markComponentInstalledStatus(state, componentId, false)
);

const list = (state = [], action = {}) => {
  switch (action.type) {
    case SET_DE_COMPONENTS: {
      return action.payload.digitalExchangeComponents;
    }
    case START_COMPONENT_INSTALLATION:
    case START_COMPONENT_UNINSTALLATION: {
      return markComponentLastStatusAsClear(state, action.payload.id);
    }
    case FINISH_COMPONENT_INSTALLATION: {
      const newState = markComponentLastStatusAsClear(state, action.payload.id);
      return markComponentAsInstalled(newState, action.payload.id);
    }
    case FINISH_COMPONENT_UNINSTALLATION: {
      const newState = markComponentLastStatusAsClear(state, action.payload.id);
      return markComponentAsUninstalled(newState, action.payload.id);
    }
    case COMPONENT_INSTALLATION_FAILED:
    case COMPONENT_UNINSTALLATION_FAILED:
    {
      return markComponentLastStatusAsError(state, action.payload.id);
    }
    case COMPONENT_INSTALL_ONGOING_PROGRESS:
    {
      return markComponentLastStatusAsInstallInProgress(state, action.payload.id);
    }
    case COMPONENT_UNINSTALL_ONGOING_PROGRESS:
    {
      return markComponentLastStatusAsUninstallInProgress(state, action.payload.id);
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
  const stateSlice = state[category] || {};
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
    case CLEAR_DE_SEARCH_FILTER: {
      const category = action.payload.digitalExchangeCategory;
      const stateSlice = state[category] || {};
      const {
        id, name, description, version, ...formValuesWithoutSearch
      } = stateSlice.formValues;
      const {
        id: opId, name: opName, description: opDesc, version: opVersion, ...operatorsWithoutSearch
      } = stateSlice.operators;
      return {
        ...state,
        [category]: {
          formValues: formValuesWithoutSearch,
          operators: operatorsWithoutSearch,
        },
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

const installation = (state = {}, action = {}) => {
  switch (action.type) {
    case START_COMPONENT_INSTALLATION: {
      return {
        ...state,
        [action.payload.id]: DE_COMPONENT_INSTALLATION_STATUS_IN_PROGRESS,
      };
    }
    case FINISH_COMPONENT_INSTALLATION:
    case COMPONENT_INSTALLATION_FAILED: {
      return { ...omit(state, action.payload.id) };
    }
    default: return state;
  }
};

const uninstallation = (state = {}, action = {}) => {
  switch (action.type) {
    case START_COMPONENT_UNINSTALLATION: {
      return {
        ...state,
        [action.payload.id]: DE_COMPONENT_INSTALLATION_STATUS_IN_PROGRESS,
      };
    }
    case FINISH_COMPONENT_UNINSTALLATION:
    case COMPONENT_UNINSTALLATION_FAILED: {
      return { ...omit(state, action.payload.id) };
    }
    default: return state;
  }
};

const usageList = (state = [], action = {}) => {
  switch (action.type) {
    case SET_COMPONENT_USAGE_LIST: {
      return action.payload.usageList;
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
  uninstallation,
  usageList,
});
