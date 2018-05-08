
import {
  getLanguages, getLanguagesIdList, getLanguagesList,
  getLanguagesMap, getLanguagesOptions, getActiveLanguages,
  getDefaultLanguage,
} from 'state/languages/selectors';


const LANGUAGES_MAP = {
  it: {
    code: 'it',
    description: 'Italiano',
    isActive: true,
    isDefault: true,
  },
  en: {
    code: 'en',
    description: 'English',
    isActive: false,
    isDefault: false,
  },
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
    expect(getLanguagesList(STATE)).toHaveLength(2);
    expect(getLanguagesList(STATE)[0]).toEqual(LANGUAGES_MAP.it);
    expect(getLanguagesList(STATE)[1]).toEqual(LANGUAGES_MAP.en);
  });

  it('getLanguagesOptions returns the not active languages list', () => {
    expect(getLanguagesOptions(STATE)).toHaveLength(1);
    expect(getLanguagesOptions(STATE)[0]).toHaveProperty('value', 'en');
    expect(getLanguagesOptions(STATE)[0]).toHaveProperty('text', 'English');
  });

  it('getActiveLanguages returns the active languages list', () => {
    expect(getActiveLanguages(STATE)).toHaveLength(1);
    expect(getActiveLanguages(STATE)[0]).toHaveProperty('code', 'it');
    expect(getActiveLanguages(STATE)[0]).toHaveProperty('name', 'Italiano');
  });

  it('getDefaultLanguage returns the default lang', () => {
    STATE.languages.map.it.isDefault = false;
    expect(getDefaultLanguage(STATE)).toEqual('');
  });
});
