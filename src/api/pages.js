import {
  ERROR, HOMEPAGE_PAYLOAD, LOGIN_PAYLOAD, SERVICE_PAYLOAD, CONTACTS_PAYLOAD,
  NOTFOUND_PAYLOAD, ERROR_PAYLOAD, DASHBOARD_PAYLOAD,
} from 'test/mocks/pages';

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
    setTimeout(() => {
      resolve(fetchPageResponseMap[pageCode]);
    }, (Math.floor(Math.random() * 700) + 300));
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

export const fetchPageChildren = pageCode => new Promise((resolve, reject) => {
  if (fetchPageChildrenResponseMap[pageCode]) {
    setTimeout(() => {
      resolve(fetchPageChildrenResponseMap[pageCode]);
    }, (Math.floor(Math.random() * 700) + 300));
  } else {
    reject(ERROR);
  }
});
