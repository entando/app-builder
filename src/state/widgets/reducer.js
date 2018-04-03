import { combineReducers } from 'redux';
import { SET_WIDGET_LIST, SET_SELECTED_WIDGET } from 'state/widgets/types';

const list = (state = [], action = {}) => {
  switch (action.type) {
    case SET_WIDGET_LIST: {
      return action.payload.widgetList.map(item => item.code);
    }
    default: return state;
  }
};

const map = (state = [], action = {}) => {
  switch (action.type) {
    case SET_WIDGET_LIST: {
      return action.payload.widgetList.reduce((acc, item) => {
        acc[item.code] = item;
        return acc;
      }, {});
    }
    default: return state;
  }
};

const selected = (state = null, action = {}) => {
  switch (action.type) {
    case SET_SELECTED_WIDGET: {
      return action.payload.widget;
    }
    default: return state;
  }
};

export default combineReducers({
  list,
  map,
  selected,
});
