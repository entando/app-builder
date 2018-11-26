
import { combineReducers } from 'redux';
import { SET_SELECTED_DE_COMPONENT, SET_DE_COMPONENTS } from 'state/digital-exchange/components/types';


const selected = (state = {}, action = {}) => {
  switch (action.type) {
    case SET_SELECTED_DE_COMPONENT: {
      return action.payload.component;
    }
    default: return state;
  }
};

const list = (state = [], action = {}) => {
  switch (action.type) {
    case SET_DE_COMPONENTS: {
      return action.payload.components;
    }
    default: return state;
  }
};

export default combineReducers({
  selected,
  list,
});
