import { combineReducers } from 'redux';
import { SET_WIDGET_LIST } from 'state/widgets/types';

const getList = (state = [], action = {}) => {
  switch (action.type) {
    case SET_WIDGET_LIST: {
      return action.payload.widgetList;
    }
    default: return state;
  }
};

export default combineReducers({
  list: getList,
});
