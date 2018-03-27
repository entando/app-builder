import { createSelector } from 'reselect';


export const getLanguages = state => state.languages;
export const getLanguagesMap = state => state.languages.map;
export const getLanguagesIdList = state => state.languages.list;

export const getLanguagesList = createSelector(
  [getLanguagesMap, getLanguagesIdList],
  (map, idList) => idList.map(id => (map[id])),
);
