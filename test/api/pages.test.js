import 'test/enzyme-init';
import {
  getPage, getPageChildren, setPagePosition, postPage, putPage, deletePage, getSearchPages,
  getPageSettingsList, getFreePages, getPageConfig, deletePageWidget, putPageWidget,
  getReferencesPage,
} from 'api/pages';

import { CONTACTS_PAYLOAD, FREE_PAGES_PAYLOAD, PAGE_SETTINGS_PAYLOAD, SEARCH_PAGES, MOCK_REFERENCES } from 'test/mocks/pages';

import { makeRequest, METHODS } from '@entando/apimanager';

jest.mock('@entando/apimanager', () => {
  const makeMockRequest = jest.fn(() => new Promise(resolve => resolve({})));
  return {
    makeRequest: makeMockRequest,
    makeMockRequest,
    METHODS: require.requireActual('@entando/apimanager').METHODS,
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

  describe('getPage', () => {
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

  describe('getPageChildren', () => {
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

  describe('setPagePosition', () => {
    const POSITION = 2;
    const PARENT_CODE = 'service';
    it('returns a promise', () => {
      expect(setPagePosition(PAGE_CODE, POSITION, PARENT_CODE)).toBeInstanceOf(Promise);
    });

    it('makes the correct request', () => {
      setPagePosition(PAGE_CODE, POSITION, PARENT_CODE);
      expect(makeRequest).toHaveBeenCalledWith(expect.objectContaining({
        uri: `/api/pages/${PAGE_CODE}/position`,
        method: METHODS.PUT,
        useAuthentication: true,
        body: { code: PAGE_CODE, position: POSITION, parentCode: PARENT_CODE },
        mockResponse: { code: PAGE_CODE, position: POSITION, parentCode: PARENT_CODE },
      }));
    });
  });

  describe('postPage', () => {
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

  describe('putPage', () => {
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

  describe('deletePage', () => {
    it('returns a promise', () => {
      expect(deletePage(CONTACTS_PAYLOAD)).toBeInstanceOf(Promise);
    });

    it('makes the correct request', () => {
      deletePage(CONTACTS_PAYLOAD);
      expect(makeRequest).toHaveBeenCalledWith(expect.objectContaining({
        uri: `/api/pages/${CONTACTS_PAYLOAD.code}`,
        method: METHODS.DELETE,
        mockResponse: { code: CONTACTS_PAYLOAD.code },
        useAuthentication: true,
      }));
    });
  });

  describe('getPageSettingsList', () => {
    it('returns a promise', () => {
      const filledInput = getPageSettingsList();
      expect(typeof filledInput.then === 'function').toBeDefined();
    });
    it('verify success page settings', () => {
      getPageSettingsList();
      expect(makeRequest).toHaveBeenCalledWith(expect.objectContaining({
        uri: '/api/pageSettings',
        method: METHODS.GET,
        mockResponse: PAGE_SETTINGS_PAYLOAD,
        useAuthentication: true,
      }));
    });
  });

  describe('getSearchPages', () => {
    it('returns a promise', () => {
      expect(getSearchPages()).toBeInstanceOf(Promise);
    });
    it('verify success searchPages', () => {
      getSearchPages();
      expect(makeRequest).toHaveBeenCalledWith(
        expect.objectContaining({
          uri: '/api/pages/search',
          method: METHODS.GET,
          mockResponse: SEARCH_PAGES,
          useAuthentication: true,
        }),
        {
          page: 1,
          pageSize: 10,
        },
      );
    });
  });

  describe('getFreePages', () => {
    it('returns a promise', () => {
      expect(getFreePages()).toBeInstanceOf(Promise);
    });
    it('verify success groups', () => {
      getFreePages();
      expect(makeRequest).toHaveBeenCalledWith({
        uri: '/api/pages/search/group/free',
        method: METHODS.GET,
        mockResponse: FREE_PAGES_PAYLOAD,
        useAuthentication: true,
      });
    });
  });

  describe('getPageConfig', () => {
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

  describe('deletePageWidget()', () => {
    it('returns a promise', () => {
      expect(deletePageWidget(PAGE_CODE, 1)).toBeInstanceOf(Promise);
    });

    it('makes the correct request', () => {
      deletePageWidget(PAGE_CODE, 1);
      expect(makeRequest).toHaveBeenCalledWith(expect.objectContaining({
        uri: `/api/pages/${PAGE_CODE}/widgets/1`,
        method: METHODS.DELETE,
        useAuthentication: true,
      }));
    });
  });

  describe('putPageWidget', () => {
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

  describe('getReferencesPage', () => {
    const pageCode = 'CNG2';
    const referenceKey = 'jacmsContentManager';
    it('returns a promise', () => {
      expect(getReferencesPage(pageCode, referenceKey)).toBeInstanceOf(Promise);
    });

    it('makes the correct request', () => {
      getReferencesPage(pageCode, referenceKey);
      expect(makeRequest).toHaveBeenCalledWith(expect.objectContaining({
        uri: `/api/pages/${pageCode}/references/${referenceKey}`,
        method: METHODS.GET,
        mockResponse: MOCK_REFERENCES[referenceKey],
        useAuthentication: true,
      }));
    });
  });
});
