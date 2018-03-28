import { createSelector } from 'reselect';

export const getLanguages = state => state.languages;
export const getLanguagesMap = state => state.languages.map;
export const getLanguagesList = state => state.languages.list;
export const getLanguagesIdList = state => state.languages.IdList;

export const getActiveLanguages = createSelector(
  [getLanguagesMap, getLanguagesList],
  (languagesMap, languagesList) => languagesList
    .filter(value => languagesMap[value].isActive)
    .map(languageId => (
      { code: languageId, name: languagesMap[languageId].description }
    )),
);

export const getDefaultLanguage = createSelector(
  [getLanguagesMap, getLanguagesIdList],
  (languagesMap, languageIdList) => (
    languageIdList.filter(value => languagesMap[value].isDefault).length > 0 ?
      languageIdList.filter(value => languagesMap[value].isDefault)[0] : ''
  ),
);
