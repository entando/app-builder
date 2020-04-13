import { addToast, addErrors, TOAST_SUCCESS, TOAST_ERROR } from '@entando/messages';

import { getLanguages, putLanguage } from 'api/languages';
import { toggleLoading } from 'state/loading/actions';
import { getLanguagesMap } from 'state/languages/selectors';
import { SET_LANGUAGE_ACTIVE, SET_LANGUAGES } from 'state/languages/types';

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
    }).catch(() => {});
  })
);

const setLanguageActive = (langCode, active, messageId) => (dispatch, getState) => (
  new Promise((resolve) => {
    const langObject = { ...getLanguagesMap(getState())[langCode] };
    if (!langObject) {
      resolve();
      return;
    }
    langObject.isActive = active;
    putLanguage(langObject).then((response) => {
      response.json().then((json) => {
        if (response.ok) {
          dispatch(setLanguageActiveSync(langCode, active));
          dispatch(addToast({ id: messageId }, TOAST_SUCCESS));
          resolve();
        } else {
          dispatch(addErrors(json.errors.map(err => err.message)));
          json.errors.forEach(err => dispatch(addToast(err.message, TOAST_ERROR)));
          resolve();
        }
      });
    }).catch(() => {});
  })
);

export const activateLanguage = langCode => (dispatch, getState) => (
  setLanguageActive(langCode, true, 'language.active.add')(dispatch, getState)
);

export const deactivateLanguage = langCode => (dispatch, getState) => (
  setLanguageActive(langCode, false, 'language.active.delete')(dispatch, getState)
);
