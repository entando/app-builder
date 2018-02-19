import { SET_LANGUAGE } from './types';

// eslint-disable-next-line
export const setLanguage = langCode => ({
  type: SET_LANGUAGE,
  payload: {
    locale: langCode,
  },
});
