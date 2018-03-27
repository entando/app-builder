
import { getLanguages, getLanguagesIdList, getLanguagesList, getLanguagesMap } from 'state/languages/selectors';


const LANGUAGES_MAP = {
  it: { code: 'it' },
  en: { code: 'en' },
};
const LANGUAGES_LIST = [
  'it',
  'en',
];
const STATE = {
  languages: {
    map: LANGUAGES_MAP,
    list: LANGUAGES_LIST,
  },
};


describe('state/languages/selectors', () => {
  it('getLanguages returns the languages state', () => {
    expect(getLanguages(STATE)).toEqual(STATE.languages);
  });

  it('getLanguagesIdList returns the languages id list', () => {
    expect(getLanguagesIdList(STATE)).toEqual(STATE.languages.list);
  });

  it('getLanguagesMap returns the languages map', () => {
    expect(getLanguagesMap(STATE)).toEqual(STATE.languages.map);
  });

  it('getLanguagesList returns the languages list', () => {
    expect(getLanguagesList(STATE)).toEqual([
      { code: 'it' },
      { code: 'en' },
    ]);
  });
});
