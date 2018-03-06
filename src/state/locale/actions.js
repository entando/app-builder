import { setCurrentLocale } from 'frontend-common-components';
import { itLocale, enLocale } from 'app-init/locale';


import { SET_LANGUAGE } from 'state/locale/types';

export const setLanguage = langCode => ({
  type: SET_LANGUAGE,
  payload: {
    locale: langCode,
  },
});

export const setCurrentLanguage = langCode => (dispatch) => {
  const i18nConfig = (langCode === 'en') ? enLocale : itLocale;
  setCurrentLocale(i18nConfig);
  dispatch(setLanguage(langCode));
};
