import {
  HOMEPAGE_PAYLOAD, LOGIN_PAYLOAD, SERVICE_PAYLOAD, CONTACTS_PAYLOAD,
  NOTFOUND_PAYLOAD, ERROR_PAYLOAD, DASHBOARD_PAYLOAD,
} from 'test/mocks/pages';

import { getPageTreePages } from 'state/page-tree/selectors';


const MOCK_STATE = {
  pages: {
    homepage: HOMEPAGE_PAYLOAD,
    dashboard: DASHBOARD_PAYLOAD,
    login: LOGIN_PAYLOAD,
    service: SERVICE_PAYLOAD,
    notfound: NOTFOUND_PAYLOAD,
    error: ERROR_PAYLOAD,
    contacts: CONTACTS_PAYLOAD,
  },
  pageTree: {
    homepage: { expanded: true },
    service: { expanded: false },
  },
};

describe('state/page-tree/selectors', () => {
  describe('getPageTreePages', () => {
    let pageTreePages;
    beforeEach(() => {
      pageTreePages = getPageTreePages(MOCK_STATE);
    });

    it('returns an array', () => {
      expect(Array.isArray(pageTreePages)).toBe(true);
    });

    it('the array will contain only expanded pages and their sorted children', () => {
      expect(pageTreePages.length).toBe(4);
      expect(pageTreePages[0].code).toBe(HOMEPAGE_PAYLOAD.code);
      expect(pageTreePages[1].code).toBe(DASHBOARD_PAYLOAD.code);
      expect(pageTreePages[2].code).toBe(SERVICE_PAYLOAD.code);
      expect(pageTreePages[3].code).toBe(CONTACTS_PAYLOAD.code);
    });
  });
});
