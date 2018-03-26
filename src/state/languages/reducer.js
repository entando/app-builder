import { combineReducers } from 'redux';

import { SET_LANGUAGES, SET_LANGUAGE_ACTIVE } from 'state/languages/types';

const map = (state = {}, action = {}) => {
  switch (action.type) {
    case SET_LANGUAGES: {
      return action.payload.languages.reduce((acc, lang) => {
        acc[lang.code] = lang;
        return acc;
      }, {});
    }
    case SET_LANGUAGE_ACTIVE: {
      const { langCode, active } = action.payload;
      if (!state[langCode]) {
        return state;
      }
      const newLang = { ...state[langCode], isActive: active };
      return { ...state, [langCode]: newLang };
    }
    default: return state;
  }
};

const list = (state = [], action = {}) => {
  switch (action.type) {
    case SET_LANGUAGES:
      return action.payload.languages.map(lang => lang.code);
    default: return state;
  }
};

export default combineReducers({
  map,
  list,
});
