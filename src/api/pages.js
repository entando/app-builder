import {
  ERROR, HOMEPAGE_PAYLOAD, LOGIN_PAYLOAD, SERVICE_PAYLOAD, CONTACTS_PAYLOAD,
  NOTFOUND_PAYLOAD, ERROR_PAYLOAD, DASHBOARD_PAYLOAD,
} from 'test/mocks/pages';

const throttle = (func) => {
  setTimeout(func, (Math.floor(Math.random() * 700) + 300));
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
    throttle(() => resolve(fetchPageResponseMap[pageCode]));
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
    throttle(() => resolve(fetchPageChildrenResponseMap[pageCode]));
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
  console.info(`calling API /pages/${pageCode}/position\n\t${JSON.stringify(response, 2)}`);
  throttle(() => resolve(response));
});
