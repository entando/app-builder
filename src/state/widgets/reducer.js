import { combineReducers } from 'redux';
import {
  SET_WIDGET_LIST,
  SET_SELECTED_WIDGET,
  REMOVE_WIDGET,
  SET_WIDGETS_TOTAL,
} from 'state/widgets/types';
import { getSelectedWidget } from 'state/widgets/selectors';

const list = (state = [], action = {}) => {
  switch (action.type) {
    case SET_WIDGET_LIST: {
      return action.payload.widgetList.map(item => item.code);
    }
    case REMOVE_WIDGET: {
      const { widgetCode } = action.payload;
      return state.filter(f => f !== widgetCode);
    }
    default: return state;
  }
};

const map = (state = {}, action = {}) => {
  switch (action.type) {
    case SET_WIDGET_LIST: {
      return action.payload.widgetList.reduce((acc, item) => {
        acc[item.code] = item;
        return acc;
      }, {});
    }
    case REMOVE_WIDGET: {
      const { widgetCode } = action.payload;
      const newState = { ...state };
      delete newState[widgetCode];
      return newState;
    }
    default: return state;
  }
};

const selected = (state = null, action = {}) => {
  switch (action.type) {
    case SET_SELECTED_WIDGET: {
      return action.payload.widget;
    }
    case REMOVE_WIDGET: {
      const { widgetCode } = action.payload;
      const widget = getSelectedWidget(state);
      return widget.code === widgetCode ? null : state;
    }
    default: return state;
  }
};

const total = (state = 0, action = {}) => {
  switch (action.type) {
    case SET_WIDGETS_TOTAL:
      return action.payload.widgetsTotal;
    default:
      return state;
  }
};

export default combineReducers({
  list,
  map,
  selected,
  total,
});
