import { getLanguages, putLanguage } from 'api/languages';
import { addErrors } from 'state/errors/actions';
import { toggleLoading } from 'state/loading/actions';
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
    dispatch(toggleLoading('languages'));
    getLanguages(page, params).then((response) => {
      response.json().then((json) => {
        if (response.ok) {
          dispatch(setLanguages(json.payload));
        } else if (json && json.errors) {
          dispatch(addErrors(json.errors.map(err => err.message)));
        }
        dispatch(toggleLoading('languages'));
        resolve();
      });
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
