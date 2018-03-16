import { combineReducers } from 'redux';
import {
  SET_CONTENT_TOOLBAR, SET_SEARCH_FILTER, CHANGE_VIEW_LIST,
  SET_PAGE_CONFIG, SET_PAGE_WIDGET, REMOVE_PAGE_WIDGET,
} from 'state/page-config/types';
import { WIDGET_LIST } from 'state/page-config/const';

export const content = (state = WIDGET_LIST, action = {}) => {
  switch (action.type) {
    case SET_CONTENT_TOOLBAR: {
      return action.payload.content;
    }
    default: return state;
  }
};

export const searchFilter = (state = null, action = {}) => {
  switch (action.type) {
    case SET_SEARCH_FILTER: {
      return action.payload.filter;
    }
    default: return state;
  }
};

export const viewList = (state = 'list', action = {}) => {
  switch (action.type) {
    case CHANGE_VIEW_LIST: {
      return action.payload.view;
    }
    default: return state;
  }
};

const configMap = (state = {}, action = {}) => {
  switch (action.type) {
    case SET_PAGE_CONFIG: {
      const { pageCode, pageConfig } = action.payload;
      return {
        ...state,
        [pageCode]: pageConfig,
      };
    }

    case SET_PAGE_WIDGET: {
      const {
        pageCode, widgetId, sourceFrameId, targetFrameId,
      } = action.payload;

      // verify we're not setting the widget on the same frame (do nothing)
      const isChangingFrame = Number.isInteger(sourceFrameId);
      if (isChangingFrame && sourceFrameId === targetFrameId) {
        return state;
      }

      const newConfig = [...state[pageCode]];
      const newWidget = isChangingFrame ? { ...newConfig[sourceFrameId] } : { type: widgetId };

      // find if there was another widget in the target frame
      const replacedWidget = newConfig[targetFrameId] ? { ...newConfig[targetFrameId] } : null;

      // set the new widgets in the right frames
      newConfig[targetFrameId] = newWidget;
      if (isChangingFrame) {
        newConfig[sourceFrameId] = replacedWidget;
      }

      return {
        ...state,
        [pageCode]: newConfig,
      };
    }

    case REMOVE_PAGE_WIDGET: {
      const { pageCode, frameId } = action.payload;
      const newPageWidgets = [...state[pageCode]];
      newPageWidgets[frameId] = null;
      return {
        ...state,
        [pageCode]: newPageWidgets,
      };
    }

    default: return state;
  }
};

export default combineReducers({
  content,
  searchFilter,
  viewList,
  configMap,
});
