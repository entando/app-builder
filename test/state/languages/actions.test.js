import { isFSA } from 'flux-standard-action';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import {
  setLanguages, setLanguageActiveSync, fetchLanguages, activateLanguage,
  deactivateLanguage,
} from 'state/languages/actions';
import { SET_LANGUAGE_ACTIVE, SET_LANGUAGES } from 'state/languages/types';
import { getLanguagesMap } from 'state/languages/selectors';
import { SET_PAGE } from 'state/pagination/types';
import { getLanguages, putLanguage } from 'api/languages';

import { LANGUAGES_LIST } from 'test/mocks/languages';


const mockStore = configureMockStore([thunk]);
const INITIAL_STATE = {
  languages: {
    map: {
      en: { code: 'en', description: 'English', isActive: true },
      it: { code: 'it', description: 'Italiano', isActive: false },
    },
    list: ['en', 'it'],
  },
};
const PAGE = { page: 1, pageSize: 10 };

const mockApi = ({ ok, payload, metaData }) =>
  () => new Promise(resolve => resolve({
    ok,
    json: () => new Promise(resolveJson => resolveJson({
      payload,
      metaData,
    })),
  }));

jest.mock('api/languages', () => ({
  getLanguages: jest.fn(),
  putLanguage: jest.fn(),
}));

jest.mock('state/languages/selectors', () => ({
  getLanguagesMap: jest.fn(),
}));

describe('state/languages/actions', () => {
  beforeEach(jest.clearAllMocks);

  describe('setLanguages', () => {
    let action;
    beforeEach(() => {
      action = setLanguages(LANGUAGES_LIST);
    });

    it('is FSA compliant', () => {
      expect(isFSA(action)).toBe(true);
    });

    it('is of type SET_LANGUAGES', () => {
      expect(action.type).toBe(SET_LANGUAGES);
    });

    it('defines the "languages" payload property', () => {
      expect(action.payload.languages).toBe(LANGUAGES_LIST);
    });
  });

  describe('setLanguageActiveSync', () => {
    let action;
    beforeEach(() => {
      action = setLanguageActiveSync('en', true);
    });

    it('is FSA compliant', () => {
      expect(isFSA(action)).toBe(true);
    });

    it('is of type SET_LANGUAGE_ACTIVE', () => {
      expect(action.type).toBe(SET_LANGUAGE_ACTIVE);
    });

    it('defines the "langCode" payload property', () => {
      expect(action.payload.langCode).toBe('en');
    });

    it('defines the "active" payload property', () => {
      expect(action.payload.active).toBe(true);
    });
  });

  describe('fetchLanguages', () => {
    let store;
    beforeEach(() => {
      store = mockStore(INITIAL_STATE);
    });

    it('if API response is ok, dispatch SET_LANGUAGES and SET_PAGE', (done) => {
      getLanguages.mockImplementation(mockApi({
        ok: true,
        payload: LANGUAGES_LIST,
        metaData: PAGE,
      }));
      store.dispatch(fetchLanguages()).then(() => {
        const actions = store.getActions();
        expect(actions[0].type).toBe(SET_LANGUAGES);
        expect(actions[0].payload.languages).toEqual(LANGUAGES_LIST);
        expect(actions[1].type).toBe(SET_PAGE);
        expect(actions[1].payload.page).toEqual(PAGE);
        done();
      }).catch(done.fail);
    });

    it('if API response is not ok, dispatch nothing', (done) => {
      getLanguages.mockImplementation(mockApi({
        ok: false,
      }));
      store.dispatch(fetchLanguages()).then(() => {
        expect(store.getActions()).toHaveLength(0);
        done();
      }).catch(done.fail);
    });
  });

  describe('activateLanguage', () => {
    let store;
    beforeEach(() => {
      store = mockStore(INITIAL_STATE);
      getLanguagesMap.mockReturnValue(INITIAL_STATE.languages.map);
      putLanguage.mockImplementation(mockApi({
        ok: true,
        payload: LANGUAGES_LIST,
        metaData: PAGE,
      }));
    });

    it('if API response is ok, dispatch SET_LANGUAGE_ACTIVE = true', (done) => {
      store.dispatch(activateLanguage('it')).then(() => {
        const actions = store.getActions();
        expect(actions[0].type).toBe(SET_LANGUAGE_ACTIVE);
        expect(actions[0].payload.langCode).toBe('it');
        expect(actions[0].payload.active).toBe(true);
        done();
      }).catch(done.fail);
    });

    it('if API response is not ok, dispatch nothing', (done) => {
      putLanguage.mockImplementation(mockApi({
        ok: false,
      }));

      store.dispatch(activateLanguage('it')).then(() => {
        expect(store.getActions()).toHaveLength(0);
        done();
      }).catch(done.fail);
    });

    it('if there is no mapped language, dispatch nothing', (done) => {
      getLanguagesMap.mockReturnValue({});
      store.dispatch(activateLanguage('it')).then(() => {
        expect(store.getActions()).toHaveLength(0);
        done();
      }).catch(done.fail);
    });
  });

  describe('deactivateLanguage', () => {
    let store;
    beforeEach(() => {
      store = mockStore(INITIAL_STATE);
      getLanguagesMap.mockReturnValue(INITIAL_STATE.languages.map);
      putLanguage.mockImplementation(mockApi({
        ok: true,
        payload: LANGUAGES_LIST,
        metaData: PAGE,
      }));
    });

    it('if API response is ok, dispatch SET_LANGUAGE_ACTIVE = false', (done) => {
      store.dispatch(deactivateLanguage('it')).then(() => {
        const actions = store.getActions();
        expect(actions[0].type).toBe(SET_LANGUAGE_ACTIVE);
        expect(actions[0].payload.langCode).toBe('it');
        expect(actions[0].payload.active).toBe(false);
        done();
      }).catch(done.fail);
    });

    it('if API response is not ok, dispatch nothing', (done) => {
      putLanguage.mockImplementation(mockApi({
        ok: false,
      }));

      store.dispatch(deactivateLanguage('it')).then(() => {
        expect(store.getActions()).toHaveLength(0);
        done();
      }).catch(done.fail);
    });

    it('if there is no mapped language, dispatch nothing', (done) => {
      getLanguagesMap.mockReturnValue({});
      store.dispatch(deactivateLanguage('it')).then(() => {
        expect(store.getActions()).toHaveLength(0);
        done();
      }).catch(done.fail);
    });
  });
});
