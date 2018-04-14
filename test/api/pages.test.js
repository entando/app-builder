import 'test/enzyme-init';
import {
  getPage, getPageChildren, setPagePosition, postPage, putPage,
  getPageSettingsList, getFreePages, getPageConfig, deletePageWidget, putPageWidget,
} from 'api/pages';

import { CONTACTS_PAYLOAD, FREE_PAGES_PAYLOAD, PAGE_SETTINGS_PAYLOAD } from 'test/mocks/pages';

import { makeRequest, METHODS } from 'api/apiManager';

jest.mock('api/apiManager', () => {
  const makeMockRequest = jest.fn(() => new Promise(resolve => resolve({})));
  return {
    makeRequest: makeMockRequest,
    makeMockRequest,
    METHODS: require.requireActual('api/apiManager').METHODS,
  };
});
jest.unmock('api/pages');
jest.useFakeTimers();

const PAGE_CODE = 'page_code';

global.console.info = jest.fn(); // FIXME remove when all the console.info are gone

describe('api/pages', () => {
  afterEach(() => {
    jest.runOnlyPendingTimers();
  });

  describe('getPage()', () => {
    it('returns a promise', () => {
      expect(getPage(PAGE_CODE)).toBeInstanceOf(Promise);
    });

    it('makes the correct request', () => {
      getPage(PAGE_CODE);
      expect(makeRequest).toHaveBeenCalledWith(expect.objectContaining({
        uri: `/api/pages/${PAGE_CODE}`,
        method: METHODS.GET,
        useAuthentication: true,
      }));
    });
  });

  describe('getPageChildren()', () => {
    it('returns a promise', () => {
      expect(getPageChildren(PAGE_CODE)).toBeInstanceOf(Promise);
    });

    it('makes the correct request', () => {
      getPageChildren(PAGE_CODE);
      expect(makeRequest).toHaveBeenCalledWith(expect.objectContaining({
        uri: `/api/pages?parentCode=${PAGE_CODE}`,
        method: METHODS.GET,
        useAuthentication: true,
      }));
    });
  });

  describe('setPagePosition()', () => {
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
    it('returns a promise', () => {
      expect(postPage(CONTACTS_PAYLOAD)).toBeInstanceOf(Promise);
    });

    it('makes the correct request', () => {
      postPage(CONTACTS_PAYLOAD);
      expect(makeRequest).toHaveBeenCalledWith(expect.objectContaining({
        uri: '/api/pages',
        body: CONTACTS_PAYLOAD,
        method: METHODS.POST,
        useAuthentication: true,
      }));
    });
  });

  describe('putPage()', () => {
    it('returns a promise', () => {
      expect(putPage(CONTACTS_PAYLOAD)).toBeInstanceOf(Promise);
    });

    it('makes the correct request', () => {
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

  describe('getPageConfig()', () => {
    it('returns a promise', () => {
      expect(getPageConfig(PAGE_CODE, 'draft')).toBeInstanceOf(Promise);
    });

    it('makes the correct request', () => {
      const CONFIG_STATUS = 'draft';
      getPageConfig(PAGE_CODE, CONFIG_STATUS);
      expect(makeRequest).toHaveBeenCalledWith(expect.objectContaining({
        uri: `/api/pages/${PAGE_CODE}/widgets?status=${CONFIG_STATUS}`,
        method: METHODS.GET,
        useAuthentication: true,
      }));
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

  describe('putPageWidget()', () => {
    const PAGE_CONFIG_ITEM = { code: 'some_code' };
    const FRAME_POS = 1;
    it('returns a promise', () => {
      expect(putPageWidget(PAGE_CODE, FRAME_POS, PAGE_CONFIG_ITEM)).toBeInstanceOf(Promise);
    });

    it('makes the correct request', () => {
      putPageWidget(PAGE_CODE, FRAME_POS, PAGE_CONFIG_ITEM);
      expect(makeRequest).toHaveBeenCalledWith(expect.objectContaining({
        uri: `/api/pages/${PAGE_CODE}/widgets/${FRAME_POS}`,
        method: METHODS.PUT,
        body: PAGE_CONFIG_ITEM,
        useAuthentication: true,
      }));
    });
  });
});
