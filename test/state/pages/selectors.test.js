
import {
  HOMEPAGE_PAYLOAD, DASHBOARD_PAYLOAD, SERVICE_PAYLOAD, CONTACTS_PAYLOAD, ERROR_PAYLOAD,
  LOGIN_PAYLOAD, NOTFOUND_PAYLOAD,
} from 'test/mocks/pages';

import {
  getPages, getPagesMap, getChildrenMap, getTitlesMap, getStatusMap, getPositionMap,
  getPageTreePages, getCharsets, getContentTypes, getFreePages,
} from 'state/pages/selectors';

const LOCALE_MOCK = 'en';
jest.mock('state/locale/selectors', () => ({ getLocale: () => ('en') }));


const MOCK_STATE = {
  pages: {
    map: {
      homepage: HOMEPAGE_PAYLOAD,
      dashboard: DASHBOARD_PAYLOAD,
      service: SERVICE_PAYLOAD,
      contacts: CONTACTS_PAYLOAD,
      error: ERROR_PAYLOAD,
      login: LOGIN_PAYLOAD,
      notfound: NOTFOUND_PAYLOAD,
    },
    childrenMap: {
      homepage: HOMEPAGE_PAYLOAD.children,
      dashboard: DASHBOARD_PAYLOAD.children,
      service: SERVICE_PAYLOAD.children,
      contacts: CONTACTS_PAYLOAD.children,
      error: ERROR_PAYLOAD.children,
      login: LOGIN_PAYLOAD.children,
      notfound: NOTFOUND_PAYLOAD.children,
    },
    titlesMap: {
      homepage: HOMEPAGE_PAYLOAD.titles,
      dashboard: DASHBOARD_PAYLOAD.titles,
      service: SERVICE_PAYLOAD.titles,
      contacts: CONTACTS_PAYLOAD.titles,
      error: ERROR_PAYLOAD.titles,
      login: LOGIN_PAYLOAD.titles,
      notfound: NOTFOUND_PAYLOAD.titles,
    },
    statusMap: {
      homepage: { expanded: true, loading: false, loaded: true },
      dashboard: {},
      service: { expanded: false, loading: false, loaded: false },
      contacts: {},
      error: {},
      login: {},
      notfound: {},
    },
    freePages: [],
  },
};

/*
 * - homepage
 *   |- dashboard
 *   |- service
 *   |  |- notfound
 *   |  |- error
 *   |  |- login
 *   |- contacts
 */

describe('state/pages/selectors', () => {
  it('getPages(state) returns the pages object', () => {
    const selected = getPages(MOCK_STATE);
    expect(selected).toBe(MOCK_STATE.pages);
  });
  it('getPagesMap(state) returns the pages map', () => {
    const selected = getPagesMap(MOCK_STATE);
    expect(selected).toBe(MOCK_STATE.pages.map);
  });
  it('getChildrenMap(state) returns the pages object', () => {
    const selected = getChildrenMap(MOCK_STATE);
    expect(selected).toBe(MOCK_STATE.pages.childrenMap);
  });
  it('getTitlesMap(state) returns the pages object', () => {
    const selected = getTitlesMap(MOCK_STATE);
    expect(selected).toBe(MOCK_STATE.pages.titlesMap);
  });
  it('getStatusMap(state) returns the pages object', () => {
    const selected = getStatusMap(MOCK_STATE);
    expect(selected).toBe(MOCK_STATE.pages.statusMap);
  });

  describe('getPositionMap(state)', () => {
    it('returns a calculated position map', () => {
      const positionMap = getPositionMap(MOCK_STATE);
      expect(positionMap.homepage).toBe(1);
      expect(positionMap.dashboard).toBe(1); // homepage child #1
      expect(positionMap.service).toBe(2); // homepage child #2
      expect(positionMap.contacts).toBe(3); // homepage child #3
      expect(positionMap.notfound).toBe(1); // service child #1
      expect(positionMap.error).toBe(2); // service child #2
      expect(positionMap.login).toBe(3); // service child #3
    });
  });

  describe('getPageTreePages(state)', () => {
    let pageTreePages;
    beforeEach(() => {
      pageTreePages = getPageTreePages(MOCK_STATE);
    });
    it('only returns expanded rows and their children', () => {
      expect(pageTreePages.length).toBe(4); // homepage and its 3 children
    });
    it('returns an array sorted by position', () => {
      expect(pageTreePages[0].code).toBe('homepage');
      expect(pageTreePages[1].code).toBe('dashboard');
      expect(pageTreePages[2].code).toBe('service');
      expect(pageTreePages[3].code).toBe('contacts');
    });
    it('defines the depth property for each page', () => {
      expect(pageTreePages[0].depth).toBe(0);
      expect(pageTreePages[1].depth).toBe(1);
      expect(pageTreePages[2].depth).toBe(1);
      expect(pageTreePages[3].depth).toBe(1);
    });
    it('defines the isEmpty property for each page', () => {
      expect(pageTreePages[0].isEmpty).toBe(false);
      expect(pageTreePages[1].isEmpty).toBe(true);
      expect(pageTreePages[2].isEmpty).toBe(false); // has children
      expect(pageTreePages[3].isEmpty).toBe(true);
    });
    it('defines the title property for each page', () => {
      expect(pageTreePages[0].title).toBe(pageTreePages[0].titles[LOCALE_MOCK]);
      expect(pageTreePages[1].title).toBe(pageTreePages[1].titles[LOCALE_MOCK]);
      expect(pageTreePages[2].title).toBe(pageTreePages[2].titles[LOCALE_MOCK]);
      expect(pageTreePages[3].title).toBe(pageTreePages[3].titles[LOCALE_MOCK]);
    });
    it('defines the expanded property for each page', () => {
      expect(pageTreePages[0].expanded).toBe(true);
      expect(pageTreePages[1].expanded).toBe(false); // default
      expect(pageTreePages[2].expanded).toBe(false);
      expect(pageTreePages[3].expanded).toBe(false); // default
    });
    it('defines the loading property for each page', () => {
      expect(pageTreePages[0].loading).toBe(false);
      expect(pageTreePages[1].loading).toBe(false);
      expect(pageTreePages[2].loading).toBe(false);
      expect(pageTreePages[3].loading).toBe(false);
    });
    it('defines the loaded property for each page', () => {
      expect(pageTreePages[0].loaded).toBe(true);
      expect(pageTreePages[1].loaded).toBe(false);
      expect(pageTreePages[2].loaded).toBe(false);
      expect(pageTreePages[3].loaded).toBe(false);
    });
  });

  describe('getCharsets(state)', () => {
    let charsets;
    beforeEach(() => {
      charsets = getCharsets(MOCK_STATE);
    });
    it('returns the page possible charsets', () => {
      expect(charsets.length).toBe(2);
      expect(charsets[0]).toBe('iso-8859-1');
      expect(charsets[1]).toBe('utf-8');
    });
  });

  describe('getContentTypes(state)', () => {
    let contentTypes;
    beforeEach(() => {
      contentTypes = getContentTypes(MOCK_STATE);
    });
    it('returns the page possible charsets', () => {
      expect(contentTypes).toEqual([
        'application/json',
        'application/xhtml+xml',
        'application/xml',
        'text/html',
        'text/xml',
      ]);
    });
  });

  describe('getFreePages(state)', () => {
    it('verify getFreePages selector', () => {
      expect(getFreePages(MOCK_STATE)).toBeDefined();
    });
  });
});
