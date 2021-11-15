import { combineReducers } from 'redux';

import {
  SET_PAGE_TEMPLATES,
  SET_SELECTED_PAGE_TEMPLATE,
  REMOVE_SELECTED_PAGE_TEMPLATE,
  REMOVE_PAGE_TEMPLATE,
  SET_SELECTED_PAGE_TEMPLATE_PAGE_REFS,
  SET_PAGE_TEMPLATES_TOTAL,
} from 'state/page-templates/types';


const idList = (state = [], action = {}) => {
  switch (action.type) {
    case SET_PAGE_TEMPLATES: {
      return action.payload.pageTemplates.map(pageTemplate => pageTemplate.code);
    }
    case REMOVE_PAGE_TEMPLATE: {
      const { pageTemplateCode } = action.payload;
      if (!state.includes(pageTemplateCode)) {
        return state;
      }
      return state.filter(code => code !== pageTemplateCode);
    }
    default: return state;
  }
};

const map = (state = {}, action = {}) => {
  switch (action.type) {
    case SET_PAGE_TEMPLATES: {
      return action.payload.pageTemplates.reduce((acc, pageTemplate) => {
        acc[pageTemplate.code] = pageTemplate;
        return acc;
      }, {});
    }
    case REMOVE_PAGE_TEMPLATE: {
      const { pageTemplateCode } = action.payload;
      if (!state[pageTemplateCode]) {
        return state;
      }
      const newState = { ...state };
      delete newState[pageTemplateCode];
      return newState;
    }
    default: return state;
  }
};

const selected = (state = null, action = {}) => {
  switch (action.type) {
    case SET_SELECTED_PAGE_TEMPLATE: {
      return { ...state, ...action.payload.pageTemplate };
    }
    case REMOVE_SELECTED_PAGE_TEMPLATE: {
      return null;
    }
    case SET_SELECTED_PAGE_TEMPLATE_PAGE_REFS: {
      return { ...state, pageReferences: action.payload.references };
    }
    default: return state;
  }
};

const total = (state = 0, action = {}) => {
  switch (action.type) {
    case SET_PAGE_TEMPLATES_TOTAL:
      return action.payload.pageTemplatesTotal;
    default:
      return state;
  }
};

export default combineReducers({
  idList,
  map,
  selected,
  total,
});
