import 'test/enzyme-init';
import {
  fetchPage, fetchPageChildren, setPagePosition, postPage, putPage,
  getPageSettingsList, getFreePages, getPageConfig, deletePageWidget, putPageWidget,
} from 'api/pages';

import {
  ERROR, HOMEPAGE_PAYLOAD, DASHBOARD_PAYLOAD, SERVICE_PAYLOAD, CONTACTS_PAYLOAD,
  FREE_PAGES_PAYLOAD, PAGE_SETTINGS_PAYLOAD,
} from 'test/mocks/pages';

import { makeRequest, METHODS } from 'api/apiManager';

jest.mock('api/apiManager', () => ({
  makeRequest: jest.fn(() => new Promise(resolve => resolve({}))),
  METHODS: require.requireActual('api/apiManager').METHODS,
}));
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
    it('returns a promise', () => {
      expect(putPage(CONTACTS_PAYLOAD)).toBeInstanceOf(Promise);
    });

    it('get fragment page 1 by default', () => {
      putPage(CONTACTS_PAYLOAD);
      expect(makeRequest).toHaveBeenCalledWith(expect.objectContaining({
        uri: `/api/pages/${CONTACTS_PAYLOAD.code}`,
        body: CONTACTS_PAYLOAD,
        method: METHODS.PUT,
        errors: expect.any(Function),
        useAuthentication: true,
      }));
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
      expect(typeof filledInput.then === 'function').toBe(true);
    });
    it('verify success groups', () => {
      getFreePages().then((response) => {
        expect(response).toEqual(FREE_PAGES_PAYLOAD);
      });
    });
  });

  describe('getPageConfig', () => {
    it('returns a promise resolved with errors if called with a not found pageCode', () => {
      getPageConfig('blabla').then((response) => {
        expect(Array.isArray(response.errors)).toBe(true);
        expect(response.errors.length).toBe(1);
      });
    });

    it('returns a promise resolved with payload if called with a valid pageCode', () => {
      getPageConfig('homepage').then((response) => {
        const isErrorResponse = !!(response.errors && response.errors.length);
        expect(isErrorResponse).toBe(false);
        expect(response.payload).toBeTruthy();
      });
    });
  });

  describe('deletePageWidget', () => {
    it('returns a promise resolved with errors if called with a not found pageCode', () => {
      deletePageWidget('blabla', 1).then((response) => {
        expect(Array.isArray(response.errors)).toBe(true);
        expect(response.errors.length).toBe(1);
      });
    });

    it('returns a promise resolved with payload if called with a valid pageCode', () => {
      deletePageWidget('homepage', 1).then((response) => {
        const isErrorResponse = !!(response.errors && response.errors.length);
        expect(isErrorResponse).toBe(false);
        expect(response.payload).toBeTruthy();
      });
    });
  });

  describe('putPageWidget', () => {
    const WIDGET = { code: 'some_code' };

    it('returns a promise resolved with errors if called with a not found pageCode', () => {
      putPageWidget('blabla', 1, WIDGET).then((response) => {
        expect(Array.isArray(response.errors)).toBe(true);
        expect(response.errors.length).toBe(1);
      });
    });

    it('returns a promise resolved with payload if called with a valid pageCode', () => {
      putPageWidget('homepage', 1, WIDGET).then((response) => {
        const isErrorResponse = !!(response.errors && response.errors.length);
        expect(isErrorResponse).toBe(false);
        expect(response.payload).toBeTruthy();
      });
    });
  });
});
