import { combineReducers } from 'redux';
import {
  SET_SELECTED_COMPONENT_REPOSITORY,
  SET_COMPONENT_REPOSITORIES,
  REMOVE_COMPONENT_REPOSITORY,
} from 'state/component-repository/component-repositories/types';


const selected = (state = {}, action = {}) => {
  switch (action.type) {
    case SET_SELECTED_COMPONENT_REPOSITORY: {
      return action.payload.componentRepository;
    }
    case REMOVE_COMPONENT_REPOSITORY: {
      return state.id === action.payload.componentRepository ? {} : state;
    }
    default: return state;
  }
};

const list = (state = [], action = {}) => {
  switch (action.type) {
    case SET_COMPONENT_REPOSITORIES: {
      return action.payload.componentRepositories;
    }
    case REMOVE_COMPONENT_REPOSITORY: {
      const marketplaceIndex = state.findIndex(objectInArray => (
        objectInArray.id === action.payload.componentRepository
      ));

      if (marketplaceIndex === -1) {
        return state;
      }
      const newState = state.slice();
      newState.splice(marketplaceIndex, 1);
      return newState;
    }
    default: return state;
  }
};

export default combineReducers({
  selected,
  list,
});
