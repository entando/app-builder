import { combineReducers } from 'redux';
import { SET_VISIBLE_MODAL, SET_INFO } from 'state/modal/types';

export const visibleModal = (state = '', action = {}) => {
  switch (action.type) {
    case SET_VISIBLE_MODAL: {
      return action.payload.visibleModal;
    }
    default: return state;
  }
};

export const info = (state = {}, action = {}) => {
  switch (action.type) {
    case SET_INFO: {
      return action.payload.info;
    }
    default: return state;
  }
};

export default combineReducers({
  visibleModal,
  info,
});
