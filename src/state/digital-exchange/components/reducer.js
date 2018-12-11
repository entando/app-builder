
import { combineReducers } from 'redux';
import {
  SET_SELECTED_DE_COMPONENT,
  SET_DE_COMPONENTS,
  SET_DE_COMPONENT_LIST_VIEW_MODE,
} from 'state/digital-exchange/components/types';


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

const listViewMode = (state = 'grid-view', action = {}) => {
  switch (action.type) {
    case SET_DE_COMPONENT_LIST_VIEW_MODE: {
      return action.payload.listViewMode;
    }
    default: return state;
  }
};

export default combineReducers({
  selected,
  list,
  listViewMode,
});
