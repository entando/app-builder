import { makeRequest, METHODS } from '@entando/apimanager';
import {
  HOMEPAGE_PAYLOAD, LOGIN_PAYLOAD, SERVICE_PAYLOAD, CONTACTS_PAYLOAD,
  NOTFOUND_PAYLOAD, ERROR_PAYLOAD, DASHBOARD_PAYLOAD, FREE_PAGES_PAYLOAD,
  PAGE_SETTINGS_PAYLOAD,
} from 'test/mocks/pages';

import {
  HOMEPAGE_CONFIG, LOGIN_CONFIG, SERVICE_CONFIG, CONTACTS_CONFIG,
  NOTFOUND_CONFIG, ERROR_CONFIG, DASHBOARD_CONFIG,
} from 'test/mocks/pageConfig';

import { PAGE_STATUS_DRAFT } from 'state/pages/const';

import { throttle } from '@entando/utils';


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


export const getPage = pageCode => makeRequest({
  uri: `/api/pages/${pageCode}`,
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


// will call http://confluence.entando.org/display/E5/Page+Position+Change
// e.g. /pages/<pageCode>/position  (code, position, parent)
export const setPagePosition = (pageCode, position, parentCode) => new Promise((resolve) => {
  const response = {
    code: pageCode,
    position,
    parent: parentCode,
  };
  // eslint-disable-next-line no-console
  console.info(`calling API /pages/${pageCode}/position\n\t${JSON.stringify(response, 2)}`);
  throttle(() => resolve(response));
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

export const getFreePages = () => (
  new Promise((resolve) => {
    resolve(FREE_PAGES_PAYLOAD);
  })
);

export const getPageSettingsList = () => (
  new Promise((resolve) => {
    resolve(PAGE_SETTINGS_PAYLOAD);
  })
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
  uri: `/api/pages/${pageCode}/widgets/restore`,
  method: METHODS.PUT,
  body: {},
  mockResponse: {},
  useAuthentication: true,
});

export const applyDefaultPageConfig = pageCode => makeRequest({
  uri: `/api/pages/${pageCode}/widgets/applyDefault`,
  method: METHODS.PUT,
  body: {},
  mockResponse: {},
  useAuthentication: true,
});
