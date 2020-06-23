import { get, head, omit } from 'lodash';
import { combineReducers } from 'redux';
import {
  SET_SELECTED_ECR_COMPONENT,
  SET_ECR_COMPONENTS,
  SET_ECR_COMPONENT_LIST_VIEW_MODE,
  SET_ECR_FILTER,
  START_COMPONENT_INSTALLATION,
  FINISH_COMPONENT_INSTALLATION,
  COMPONENT_INSTALLATION_FAILED,
  COMPONENT_INSTALL_ONGOING_PROGRESS,
  START_COMPONENT_UNINSTALLATION,
  FINISH_COMPONENT_UNINSTALLATION,
  COMPONENT_UNINSTALLATION_FAILED,
  COMPONENT_UNINSTALL_ONGOING_PROGRESS,
  SET_COMPONENT_USAGE_LIST,
  CLEAR_ECR_SEARCH_FILTER,
  SET_ECR_SEARCH_FILTER_TYPE,
} from 'state/component-repository/components/types';

import {
  ECR_COMPONENTS_GRID_VIEW,
  ECR_COMPONENT_INSTALLATION_STATUS_IN_PROGRESS,
  ECR_COMPONENT_UNINSTALLATION_STATUS_IN_PROGRESS,
  ECR_COMPONENT_INSTALLATION_STATUS_ERROR,
} from 'state/component-repository/components/const';

import { findComponentInListById } from 'state/component-repository/components/selectors';

const filtersDefaultState = {
  searchFilterType: {
    id: 'description',
    title: 'Description',
    placeholder: 'Filter by Description',
    filterType: 'text',
    value: '',
  },
};

const selected = (state = {}, action = {}) => {
  switch (action.type) {
    case SET_SELECTED_ECR_COMPONENT: {
      return action.payload.componentRepositoryComponent;
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
  markComponentLastInstallStatus(state, componentId, ECR_COMPONENT_INSTALLATION_STATUS_ERROR)
);

const markComponentLastStatusAsInstallInProgress = (state, componentId) => (
  markComponentLastInstallStatus(state, componentId, ECR_COMPONENT_INSTALLATION_STATUS_IN_PROGRESS)
);

const markComponentLastStatusAsUninstallInProgress = (state, componentId) => (
  markComponentLastInstallStatus(
    state,
    componentId,
    ECR_COMPONENT_UNINSTALLATION_STATUS_IN_PROGRESS,
  )
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
    case SET_ECR_COMPONENTS: {
      return action.payload.componentRepositoryComponents;
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

const filters = (state = filtersDefaultState, action = {}) => {
  switch (action.type) {
    case SET_ECR_FILTER: {
      const category = action.payload.componentRepositoryCategory;
      const filter = action.payload.componentRepositoryFilter;
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
    case CLEAR_ECR_SEARCH_FILTER: {
      const category = action.payload.componentRepositoryCategory;
      const stateSlice = state[category] || { formValues: {}, operators: {} };
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
    case SET_ECR_SEARCH_FILTER_TYPE: {
      return {
        ...state,
        searchFilterType: action.payload,
      };
    }
    default: return state;
  }
};

const componentListViewMode = (state = ECR_COMPONENTS_GRID_VIEW, action = {}) => {
  switch (action.type) {
    case SET_ECR_COMPONENT_LIST_VIEW_MODE: {
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
        [action.payload.id]: ECR_COMPONENT_INSTALLATION_STATUS_IN_PROGRESS,
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
        [action.payload.id]: ECR_COMPONENT_INSTALLATION_STATUS_IN_PROGRESS,
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
