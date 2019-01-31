import 'test/enzyme-init';
import {
  getPage, getPageChildren, setPagePosition, postPage, putPage, patchPage, deletePage,
  getSearchPages, getPageSettings, getFreePages, getPageConfig, deletePageWidget, putPageWidget,
  getReferencesPage, restorePageConfig, applyDefaultPageConfig, putPageSettings,
} from 'api/pages';

import { CONTACTS_PAYLOAD, FREE_PAGES_PAYLOAD, PAGE_SETTINGS_PAYLOAD, SEARCH_PAGES } from 'test/mocks/pages';
import { makeRequest, METHODS } from '@entando/apimanager';
import { PAGE_STATUS_DRAFT, PAGE_STATUS_PUBLISHED } from 'state/pages/const';

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
        uri: `/api/pages/${PAGE_CODE}?status=${PAGE_STATUS_DRAFT}`,
        method: METHODS.GET,
        useAuthentication: true,
      }));
    });

    it('makes the correct request with other page status', () => {
      getPage(PAGE_CODE, PAGE_STATUS_PUBLISHED);
      expect(makeRequest).toHaveBeenCalledWith(expect.objectContaining({
        uri: `/api/pages/${PAGE_CODE}?status=${PAGE_STATUS_PUBLISHED}`,
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

  fdescribe('patchPage', () => {
    const jsonPatch = [
      {
        op: 'replace',
        path: '/pageModel',
        value: 'new_model',
      },
    ];
    const pageCode = 'pageCode';

    it('returns a promise', () => {
      expect(patchPage(jsonPatch, pageCode)).toBeInstanceOf(Promise);
    });

    it('makes the correct request', () => {
      patchPage(jsonPatch, pageCode);
      expect(makeRequest).toHaveBeenCalledWith(expect.objectContaining({
        uri: `/api/pages/${pageCode}`,
        body: jsonPatch,
        method: METHODS.PATCH,
        errors: expect.any(Function),
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

  describe('getPageSettings', () => {
    it('returns a promise', () => {
      expect(getPageSettings()).toBeInstanceOf(Promise);
    });

    it('verify success page settings', () => {
      getPageSettings();
      expect(makeRequest).toHaveBeenCalledWith(expect.objectContaining({
        uri: '/api/pageSettings',
        method: METHODS.GET,
        mockResponse: PAGE_SETTINGS_PAYLOAD,
        useAuthentication: true,
      }));
    });
  });

  describe('putPageSettings', () => {
    it('returns a promise', () => {
      expect(putPageSettings()).toBeInstanceOf(Promise);
    });

    it('verify success page settings', () => {
      putPageSettings({});
      expect(makeRequest).toHaveBeenCalledWith(expect.objectContaining({
        uri: '/api/pageSettings',
        method: METHODS.PUT,
        body: {},
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

  describe('restorePageConfig', () => {
    it('returns a promise', () => {
      expect(restorePageConfig(PAGE_CODE)).toBeInstanceOf(Promise);
    });

    it('makes the correct request', () => {
      restorePageConfig(PAGE_CODE);
      expect(makeRequest).toHaveBeenCalledWith(expect.objectContaining({
        uri: `/api/pages/${PAGE_CODE}/configuration/restore`,
        method: METHODS.PUT,
        body: {},
        useAuthentication: true,
      }));
    });
  });

  describe('applyDefaultPageConfig', () => {
    it('returns a promise', () => {
      expect(applyDefaultPageConfig(PAGE_CODE)).toBeInstanceOf(Promise);
    });

    it('makes the correct request', () => {
      applyDefaultPageConfig(PAGE_CODE);
      expect(makeRequest).toHaveBeenCalledWith(expect.objectContaining({
        uri: `/api/pages/${PAGE_CODE}/configuration/defaultWidgets`,
        method: METHODS.PUT,
        body: {},
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
        useAuthentication: true,
      }));
    });
  });
});
