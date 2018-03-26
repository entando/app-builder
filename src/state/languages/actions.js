import { getLanguages, putLanguage } from 'api/languages';
import { setPage } from 'state/pagination/actions';
import { SET_LANGUAGE_ACTIVE, SET_LANGUAGES } from 'state/languages/types';
import { getLanguagesMap } from 'state/languages/selectors';

export const setLanguages = languages => ({
  type: SET_LANGUAGES,
  payload: {
    languages,
  },
});

export const setLanguageActiveSync = (langCode, active) => ({
  type: SET_LANGUAGE_ACTIVE,
  payload: {
    langCode,
    active,
  },
});


// thunks

export const fetchLanguages = (page = { page: 1, pageSize: 10 }, params = '') => dispatch => (
  new Promise((resolve) => {
    getLanguages(page, params).then((response) => {
      if (response.ok) {
        response.json().then((data) => {
          dispatch(setLanguages(data.payload));
          dispatch(setPage(data.metaData));
          resolve();
        });
      } else {
        resolve();
      }
    });
  })
);

const setLanguageActive = (langCode, active) => (dispatch, getState) => (
  new Promise((resolve) => {
    const langObject = getLanguagesMap(getState())[langCode];
    if (!langObject) {
      resolve();
      return;
    }
    langObject.isActive = active;
    putLanguage(langObject).then((response) => {
      if (response.ok) {
        response.json().then(() => {
          dispatch(setLanguageActiveSync(langCode, active));
          resolve();
        });
      } else {
        resolve();
      }
    });
  })
);

export const activateLanguage = langCode => (dispatch, getState) => (
  setLanguageActive(langCode, true)(dispatch, getState)
);

export const deactivateLanguage = langCode => (dispatch, getState) => (
  setLanguageActive(langCode, false)(dispatch, getState)
);
