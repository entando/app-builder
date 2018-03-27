import { makeRequest, METHODS } from 'api/apiManager';
import {
  ERROR, HOMEPAGE_PAYLOAD, LOGIN_PAYLOAD, SERVICE_PAYLOAD, CONTACTS_PAYLOAD,
  NOTFOUND_PAYLOAD, ERROR_PAYLOAD, DASHBOARD_PAYLOAD, FREE_PAGES_PAYLOAD,
  PAGE_SETTINGS_PAYLOAD,
} from 'test/mocks/pages';

import {
  HOMEPAGE_RESPONSE, LOGIN_RESPONSE, SERVICE_RESPONSE, CONTACTS_RESPONSE,
  NOTFOUND_RESPONSE, ERROR_RESPONSE, DASHBOARD_RESPONSE,
} from 'test/mocks/pageConfig';

import { PAGE_STATUS_DRAFT } from 'state/pages/const';

import throttle from 'util/throttle';
import { errorResponse } from 'test/testUtils';


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


export const fetchPage = pageCode => new Promise((resolve, reject) => {
  if (fetchPageResponseMap[pageCode]) {
    throttle(() => resolve({ payload: fetchPageResponseMap[pageCode] }));
  } else {
    reject(ERROR);
  }
});


const fetchPageChildrenResponseMap = {
  homepage: [DASHBOARD_PAYLOAD, SERVICE_PAYLOAD, CONTACTS_PAYLOAD],
  login: [],
  service: [NOTFOUND_PAYLOAD, ERROR_PAYLOAD, LOGIN_PAYLOAD],
  notfound: [],
  error: [],
  contacts: [],
};

// will call http://confluence.entando.org/display/E5/Page+Tree
// e.g. /pages?parentCode=homepage
export const fetchPageChildren = pageCode => new Promise((resolve, reject) => {
  if (fetchPageChildrenResponseMap[pageCode]) {
    throttle(() => resolve({ payload: fetchPageChildrenResponseMap[pageCode] }));
  } else {
    reject(ERROR);
  }
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


export const postPage = pageObject => new Promise((resolve) => {
  // eslint-disable-next-line no-console
  console.info(`calling POST /pages\n\t${JSON.stringify(pageObject, 2)}`);
  if (pageObject.code !== 'error') {
    throttle(() => resolve({ payload: pageObject }));
  } else {
    resolve({
      errors: [
        { code: 1, message: 'Page code cannot be error!' },
        { code: 2, message: 'This is a mock error!' },
      ],
    });
  }
});

export const putPage = pageObject => makeRequest({
  uri: `/pages/${pageObject.code}`,
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
  uri: `/pages/${pageCode}/status`,
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
  homepage: HOMEPAGE_RESPONSE,
  dashboard: DASHBOARD_RESPONSE,
  login: LOGIN_RESPONSE,
  service: SERVICE_RESPONSE,
  notfound: NOTFOUND_RESPONSE,
  error: ERROR_RESPONSE,
  contacts: CONTACTS_RESPONSE,
};

const PAGE_CONFIG_PUBLISHED_MAP = {
  homepage: HOMEPAGE_RESPONSE,
  dashboard: DASHBOARD_RESPONSE,
  login: LOGIN_RESPONSE,
  service: SERVICE_RESPONSE,
  notfound: NOTFOUND_RESPONSE,
  error: ERROR_RESPONSE,
  contacts: CONTACTS_RESPONSE,
};

// call GET /pages/<pageCode>/widget/
export const getPageConfig = (pageCode, status = PAGE_STATUS_DRAFT) =>
  new Promise((resolve) => {
    // eslint-disable-next-line no-console
    console.info(`calling GET /pages/${pageCode}/widget`);
    const responseMap = status === PAGE_STATUS_DRAFT ?
      PAGE_CONFIG_DRAFT_MAP :
      PAGE_CONFIG_PUBLISHED_MAP;
    throttle(() => {
      if (responseMap[pageCode]) {
        resolve(responseMap[pageCode]);
      } else {
        resolve(errorResponse(`No page with the code ${pageCode} could be found.`));
      }
    });
  });

// call DELETE /pages/<pageCode>/widget/<frameId>
export const deletePageWidget = (pageCode, frameId) =>
  new Promise((resolve) => {
    // eslint-disable-next-line no-console
    console.info(`calling DELETE /pages/${pageCode}/widget/${frameId}`);
    throttle(() => {
      if (PAGE_CONFIG_DRAFT_MAP[pageCode]) {
        resolve({
          payload: {
            code: frameId,
          },
        });
      } else {
        resolve(errorResponse(`No page with the code ${pageCode} could be found.`));
      }
    });
  });

// call PUT /pages/<pageCode>/widget/<frameId>
export const putPageWidget = (pageCode, frameId, widget) =>
  new Promise((resolve) => {
    // eslint-disable-next-line no-console
    console.info(`calling PUT /pages/${pageCode}/widget/${frameId}\n\t${JSON.stringify(widget)}`);
    throttle(() => {
      if (PAGE_CONFIG_DRAFT_MAP[pageCode]) {
        resolve({
          payload: widget,
        });
      } else {
        resolve(errorResponse(`No page with the code ${pageCode} could be found.`));
      }
    });
  });

export const restorePageConfig = pageCode => makeRequest({
  uri: `/pages/${pageCode}/widgets/restore`,
  method: METHODS.PUT,
  body: {},
  mockResponse: {},
  useAuthentication: true,
});

export const applyDefaultPageConfig = pageCode => makeRequest({
  uri: `/pages/${pageCode}/widgets/applyDefault`,
  method: METHODS.PUT,
  body: {},
  mockResponse: {},
  useAuthentication: true,
});
