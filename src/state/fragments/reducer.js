
import { combineReducers } from 'redux';
import { SET_SELECTED } from 'state/fragments/types';


const selected = (state = {}, action = {}) => {
  switch (action.type) {
    case SET_SELECTED: {
      return action.payload.fragment;
    }
    default: return state;
  }
};


export default combineReducers({
  selected,
});
