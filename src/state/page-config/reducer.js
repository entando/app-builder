import { combineReducers } from 'redux';
import { SET_CONTENT_TOOLBAR } from 'state/page-config/types';

const initialValue = {
  content: 'WIDGET_LIST',
};

export const setContent = (state = initialValue, action = {}) => {
  switch (action.type) {
    case SET_CONTENT_TOOLBAR: {
      return action.payload.content;
    }
    default: return state;
  }
};


export default combineReducers({
  content: setContent,
});
