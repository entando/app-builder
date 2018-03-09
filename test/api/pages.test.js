
import 'test/enzyme-init';
import {
  fetchPage, fetchPageChildren, setPagePosition, postPage, putPage,
  getPageSettingsList, getFreePages,
} from 'api/pages';

import {
  ERROR, HOMEPAGE_PAYLOAD, DASHBOARD_PAYLOAD, SERVICE_PAYLOAD, CONTACTS_PAYLOAD,
  FREE_PAGES_PAYLOAD, PAGE_SETTINGS_PAYLOAD,
} from 'test/mocks/pages';

jest.unmock('api/pages');
jest.useFakeTimers();

global.console.info = () => {}; // avoid spamming the test report

describe('api/pages', () => {
  afterEach(() => {
    jest.runOnlyPendingTimers();
  });
  describe('fetchPage()', () => {
    it('resolves with a mock page if present', () => {
      expect(fetchPage('homepage')).resolves.toEqual({ payload: HOMEPAGE_PAYLOAD });
    });
    it('rejects if a mock page is not present', () => {
      expect(fetchPage('pippo')).rejects.toEqual(ERROR);
    });
  });

  describe('fetchPageChildren()', () => {
    it('resolves with a mock page children if present', () => {
      expect(fetchPageChildren('homepage')).resolves.toEqual({
        payload: [DASHBOARD_PAYLOAD, SERVICE_PAYLOAD, CONTACTS_PAYLOAD],
      });
    });
    it('rejects if a mock page is not present', () => {
      expect(fetchPageChildren('pippo')).rejects.toEqual(ERROR);
    });
  });

  describe('setPagePosition()', () => {
    const PAGE_CODE = 'dashboard';
    const POSITION = 2;
    const PARENT_CODE = 'service';
    it('resolves with a mock response', () => {
      expect(setPagePosition(PAGE_CODE, POSITION, PARENT_CODE)).resolves.toEqual({
        code: PAGE_CODE,
        position: POSITION,
        parent: PARENT_CODE,
      });
    });
  });

  describe('postPage()', () => {
    it('if successful, returns a mock ok response', () => {
      expect(postPage(CONTACTS_PAYLOAD)).resolves.toEqual({ payload: CONTACTS_PAYLOAD });
    });

    it('if given a page with code "error", returns an error response', () => {
      const errorPayload = { ...CONTACTS_PAYLOAD, code: 'error' };
      expect(postPage(errorPayload)).resolves
        .toEqual(expect.objectContaining({ errors: expect.any(Array) }));
    });
  });

  describe('putPage()', () => {
    it('if successful, returns a mock ok response', () => {
      expect(putPage(CONTACTS_PAYLOAD)).resolves.toEqual({ payload: CONTACTS_PAYLOAD });
    });

    it('if given a page with en title "error", returns an error response', () => {
      const errorPayload = { ...CONTACTS_PAYLOAD, titles: { en: 'error' } };
      expect(putPage(errorPayload)).resolves
        .toEqual(expect.objectContaining({ errors: expect.any(Array) }));
    });
  });


  describe('test pageSettings API', () => {
    it('returns a promise', () => {
      const filledInput = getPageSettingsList();
      expect(typeof filledInput.then === 'function').toBeDefined();
    });
    it('verify success page settings', () => {
      getPageSettingsList().then((response) => {
        expect(response).toEqual(PAGE_SETTINGS_PAYLOAD);
      });
    });
  });

  describe('test getFreePages API', () => {
    it('returns a promise', () => {
      const filledInput = getFreePages();
      expect(typeof filledInput.then === 'function').toBeDefined();
    });
    it('verify success groups', () => {
      getFreePages().then((response) => {
        expect(response).toEqual(FREE_PAGES_PAYLOAD);
      });
    });
  });
});
