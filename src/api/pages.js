import { makeRequest, METHODS } from '@entando/apimanager';
import {
  HOMEPAGE_PAYLOAD, LOGIN_PAYLOAD, SERVICE_PAYLOAD, CONTACTS_PAYLOAD,
  NOTFOUND_PAYLOAD, ERROR_PAYLOAD, DASHBOARD_PAYLOAD, FREE_PAGES_PAYLOAD,
  PAGE_SETTINGS_PAYLOAD, SEARCH_PAGES, MOCK_REFERENCES,
} from 'test/mocks/pages';

import {
  HOMEPAGE_CONFIG, LOGIN_CONFIG, SERVICE_CONFIG, CONTACTS_CONFIG,
  NOTFOUND_CONFIG, ERROR_CONFIG, DASHBOARD_CONFIG,
} from 'test/mocks/pageConfig';

import { PAGE_STATUS_DRAFT } from 'state/pages/const';

/*
 * - homepage
 *   |- dashboard
 *   |- service
 *   |  |- notfound
 *   |  |- error
 *   |  |- login
 *   |- contacts
 */

const fetchPageResponseMap = {
  homepage: HOMEPAGE_PAYLOAD,
  dashboard: DASHBOARD_PAYLOAD,
  login: LOGIN_PAYLOAD,
  service: SERVICE_PAYLOAD,
  notfound: NOTFOUND_PAYLOAD,
  error: ERROR_PAYLOAD,
  contacts: CONTACTS_PAYLOAD,
};


export const getPage = (pageCode, status = PAGE_STATUS_DRAFT) => makeRequest({
  uri: `/api/pages/${pageCode}?status=${status}`,
  method: METHODS.GET,
  mockResponse: fetchPageResponseMap[pageCode] || {},
  useAuthentication: true,
  errors: () => (
    fetchPageResponseMap[pageCode] ?
      [] :
      [{ code: 1, message: `no page with the code ${pageCode} could be found.` }]
  ),
});


const fetchPageChildrenResponseMap = {
  homepage: [DASHBOARD_PAYLOAD, SERVICE_PAYLOAD, CONTACTS_PAYLOAD],
  login: [],
  service: [NOTFOUND_PAYLOAD, ERROR_PAYLOAD, LOGIN_PAYLOAD],
  notfound: [],
  error: [],
  contacts: [],
};

export const getPageChildren = pageCode => makeRequest({
  uri: `/api/pages?parentCode=${pageCode}`,
  method: METHODS.GET,
  mockResponse: fetchPageChildrenResponseMap[pageCode] || {},
  useAuthentication: true,
  errors: () => (
    fetchPageChildrenResponseMap[pageCode] ?
      [] :
      [{ code: 1, message: `no page with the code ${pageCode} could be found.` }]
  ),
});


export const setPagePosition = (pageCode, position, parentCode) => makeRequest({
  uri: `/api/pages/${pageCode}/position`,
  method: METHODS.PUT,
  useAuthentication: true,
  body: { code: pageCode, position, parentCode },
  mockResponse: { code: pageCode, position, parentCode },
});

export const postPage = pageObject => makeRequest({
  uri: '/api/pages',
  body: pageObject,
  method: METHODS.POST,
  mockResponse: { ...pageObject },
  useAuthentication: true,
});

export const putPage = pageObject => makeRequest({
  uri: `/api/pages/${pageObject.code}`,
  body: pageObject,
  method: METHODS.PUT,
  mockResponse: { ...pageObject },
  useAuthentication: true,
  errors: () => (
    fetchPageResponseMap[pageObject.code] ?
      [] :
      [{ code: 1, message: `no page with the code ${pageObject.code} could be found.` }]
  ),
});

export const patchPage = (jsonPatchObject, pageCode) => makeRequest({
  uri: `/api/pages/${pageCode}`,
  body: jsonPatchObject,
  method: METHODS.PATCH,
  contentType: 'application/json-patch+json',
  mockResponse: fetchPageResponseMap[pageCode],
  useAuthentication: true,
  errors: () => (
    fetchPageResponseMap[pageCode] ?
      [] :
      [{ code: 1, message: `no page with the code ${pageCode} could be found.` }]
  ),
});

export const deletePage = page => makeRequest({
  uri: `/api/pages/${page.code}`,
  method: METHODS.DELETE,
  mockResponse: { code: `${page.code}` },
  useAuthentication: true,
});

export const putPageStatus = (pageCode, status) => makeRequest({
  uri: `/api/pages/${pageCode}/status`,
  body: { status },
  method: METHODS.PUT,
  mockResponse: { ...fetchPageResponseMap[pageCode], status },
  useAuthentication: true,
  errors: () => (
    fetchPageResponseMap[pageCode] ?
      [] :
      [{ code: 1, message: `no page with the code ${pageCode} could be found.` }]
  ),
});

export const getFreePages = () => makeRequest({
  uri: '/api/pages/search/group/free',
  method: METHODS.GET,
  mockResponse: FREE_PAGES_PAYLOAD,
  useAuthentication: true,
});

export const getPageSettings = () => makeRequest({
  uri: '/api/pageSettings',
  method: METHODS.GET,
  mockResponse: PAGE_SETTINGS_PAYLOAD,
  useAuthentication: true,
});

export const putPageSettings = pageSettings => makeRequest({
  uri: '/api/pageSettings',
  method: METHODS.PUT,
  body: pageSettings,
  mockResponse: PAGE_SETTINGS_PAYLOAD,
  useAuthentication: true,
});

export const getSearchPages = (page = { page: 1, pageSize: 10 }, params = '') =>
  makeRequest(
    {
      uri: `/api/pages/search${params}`,
      method: METHODS.GET,
      useAuthentication: true,
      mockResponse: SEARCH_PAGES,
    },
    page,
  );


const PAGE_CONFIG_DRAFT_MAP = {
  homepage: HOMEPAGE_CONFIG,
  dashboard: DASHBOARD_CONFIG,
  login: LOGIN_CONFIG,
  service: SERVICE_CONFIG,
  notfound: NOTFOUND_CONFIG,
  error: ERROR_CONFIG,
  contacts: CONTACTS_CONFIG,
};

const PAGE_CONFIG_PUBLISHED_MAP = {
  homepage: HOMEPAGE_CONFIG,
  dashboard: DASHBOARD_CONFIG,
  login: LOGIN_CONFIG,
  service: SERVICE_CONFIG,
  notfound: NOTFOUND_CONFIG,
  error: ERROR_CONFIG,
  contacts: CONTACTS_CONFIG,
};

export const getPageConfig = (pageCode, status = PAGE_STATUS_DRAFT) => makeRequest({
  uri: `/api/pages/${pageCode}/widgets?status=${status}`,
  method: METHODS.GET,
  body: {},
  mockResponse: (status === PAGE_STATUS_DRAFT) ?
    PAGE_CONFIG_DRAFT_MAP[pageCode] || [] :
    PAGE_CONFIG_PUBLISHED_MAP[pageCode] || [],
  useAuthentication: true,
});

export const getPageWidget = (pageCode, frameId) => makeRequest({
  uri: `/api/pages/${pageCode}/widgets/${frameId}`,
  method: METHODS.GET,
  mockResponse: {},
  useAuthentication: true,
});


export const deletePageWidget = (pageCode, frameId) => makeRequest({
  uri: `/api/pages/${pageCode}/widgets/${frameId}`,
  method: METHODS.DELETE,
  mockResponse: {},
  useAuthentication: true,
});


export const putPageWidget = (pageCode, frameId, configItem) => makeRequest({
  uri: `/api/pages/${pageCode}/widgets/${frameId}`,
  method: METHODS.PUT,
  body: configItem,
  mockResponse: configItem,
  useAuthentication: true,
});

export const restorePageConfig = pageCode => makeRequest({
  uri: `/api/pages/${pageCode}/configuration/restore`,
  method: METHODS.PUT,
  body: {},
  mockResponse: {},
  useAuthentication: true,
});

export const applyDefaultPageConfig = pageCode => makeRequest({
  uri: `/api/pages/${pageCode}/configuration/defaultWidgets`,
  method: METHODS.PUT,
  body: {},
  mockResponse: {},
  useAuthentication: true,
});

export const getReferencesPage = (pageCode, referenceKey) => makeRequest({
  uri: `/api/pages/${pageCode}/references/${referenceKey}`,
  method: METHODS.GET,
  mockResponse: MOCK_REFERENCES[referenceKey],
  useAuthentication: true,
});
