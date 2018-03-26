import reducer from 'state/languages/reducer';
import { setLanguages, setLanguageActiveSync } from 'state/languages/actions';
import { LANGUAGES_LIST } from 'test/mocks/languages';


describe('state/languages/reducer', () => {
  const INITIAL_STATE = reducer();

  it('should return an object', () => {
    expect(typeof INITIAL_STATE).toBe('object');
  });

  it('should define an empty map object', () => {
    expect(INITIAL_STATE.map).toEqual({});
  });

  it('should define an empty list array', () => {
    expect(INITIAL_STATE.list).toEqual([]);
  });

  describe('after action SET_LANGUAGES', () => {
    let newState;
    beforeEach(() => {
      newState = reducer(INITIAL_STATE, setLanguages(LANGUAGES_LIST));
    });

    it('should populate the list', () => {
      LANGUAGES_LIST.forEach((lang, i) => {
        expect(newState.list[i]).toBe(lang.code);
      });
    });

    it('should populate the map', () => {
      LANGUAGES_LIST.forEach((lang) => {
        expect(newState.map[lang.code]).toEqual(lang);
      });
    });
  });

  describe('after action SET_LANGUAGE_ACTIVE', () => {
    const STATE_WITH_LIST = reducer(INITIAL_STATE, setLanguages(LANGUAGES_LIST));

    it('should set language isActive === true', () => {
      const newState = reducer(STATE_WITH_LIST, setLanguageActiveSync('it', true));
      expect(STATE_WITH_LIST.map).not.toBe(newState.map);
      expect(newState.map.it.isActive).toBe(true);
    });

    it('should set language isActive === false', () => {
      const newState = reducer(STATE_WITH_LIST, setLanguageActiveSync('it', false));
      expect(STATE_WITH_LIST.map).not.toBe(newState.map);
      expect(newState.map.it.isActive).toBe(false);
    });

    it('should do nothing if the language is not mapped', () => {
      const newState = reducer(STATE_WITH_LIST, setLanguageActiveSync('notmapped', false));
      expect(STATE_WITH_LIST.map).toBe(newState.map);
    });
  });
});
