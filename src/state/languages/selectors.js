import { createSelector } from 'reselect';

export const getLanguages = state => state.languages;
export const getLanguagesMap = state => state.languages.map;
export const getLanguagesIdList = state => state.languages.list;

export const getLanguagesList = createSelector(
  [getLanguagesMap, getLanguagesIdList],
  (map, idList) => idList.map(id => (map[id])),
);

export const getLanguagesOptions = createSelector(
  [getLanguagesMap, getLanguagesIdList],
  (languagesMap, languageIdList) => languageIdList
    .filter(value => (!languagesMap[value].isActive))
    .map(languageId => (
      { value: languageId, text: languagesMap[languageId].description }
    )),
);

export const getActiveLanguages = createSelector(
  [getLanguagesMap, getLanguagesIdList],
  (languagesMap, languageIdList) => languageIdList
    .filter(value => languagesMap[value].isActive)
    .map(languageId => (
      {
        code: languageId,
        name: languagesMap[languageId].description,
        isDefault: languagesMap[languageId].isDefault,
      }
    )).sort(a => (a.isDefault ? -1 : 1)),
);

export const getDefaultLanguage = createSelector(
  [getLanguagesMap, getLanguagesIdList],
  (languagesMap, languageIdList) => (
    languageIdList.filter(value => languagesMap[value].isDefault).length > 0 ?
      languageIdList.filter(value => languagesMap[value].isDefault)[0] : ''
  ),
);
