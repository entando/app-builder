
export const ERROR = {
  payload: [
  ],
  errors: [
    {
      code: 1,
      message: 'what went wrong',
    },
  ],
  metaData: {
    status: 'draft',
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

export const HOMEPAGE_PAYLOAD = {
  code: 'homepage',
  status: 'published',
  displayedInMenu: true,
  pageModel: 'home',
  charset: 'utf-8',
  contentType: 'text/xml',
  parentCode: null,
  seo: false,
  position: 1,
  titles: {
    it: 'Pagina iniziale',
    en: 'Home page',
  },
  ownerGroup: 'administrators',
  joinGroups: [
    'administrators',
  ],
  children: [
    'dashboard',
    'service',
    'contacts',
  ],
};

export const DASHBOARD_PAYLOAD = {
  code: 'dashboard',
  status: 'published',
  displayedInMenu: true,
  pageModel: 'home',
  charset: 'utf-8',
  contentType: 'text/html',
  parentCode: 'homepage',
  seo: true,
  position: 2,
  titles: {
    it: 'Pannello',
    en: 'Dashboard',
  },
  ownerGroup: 'administrators',
  joinGroups: [
    'administrators',
  ],
  children: [],
};

export const SERVICE_PAYLOAD = {
  code: 'service',
  status: 'published',
  displayedInMenu: false,
  pageModel: 'service',
  charset: 'utf-8',
  contentType: 'text/html',
  parentCode: 'homepage',
  seo: false,
  position: 3,
  titles: {
    it: 'Pagina di servizio',
    en: 'Service page',
  },
  ownerGroup: 'administrators',
  joinGroups: [
    'administrators',
  ],
  children: [
    'notfound',
    'error',
    'login',
  ],
};

export const NOTFOUND_PAYLOAD = {
  code: 'notfound',
  status: 'published',
  displayedInMenu: true,
  pageModel: 'service',
  charset: 'utf-8',
  contentType: 'text/html',
  parentCode: 'service',
  seo: false,
  position: 4,
  titles: {
    it: 'Non trovato',
    en: 'Not Found',
  },
  ownerGroup: 'administrators',
  joinGroups: [
    'administrators',
  ],
  children: [],
};

export const ERROR_PAYLOAD = {
  code: 'error',
  status: 'unpublished',
  displayedInMenu: false,
  pageModel: 'service',
  charset: 'utf-8',
  contentType: 'text/html',
  parentCode: 'service',
  seo: false,
  position: 5,
  titles: {
    it: 'Errore',
    en: 'Error',
  },
  ownerGroup: 'administrators',
  joinGroups: [
    'administrators',
  ],
  children: [],
};

export const LOGIN_PAYLOAD = {
  code: 'login',
  status: 'published',
  displayedInMenu: true,
  pageModel: 'service',
  charset: 'utf-8',
  contentType: 'text/html',
  parentCode: 'service',
  seo: false,
  position: 6,
  titles: {
    it: 'Accesso',
    en: 'Log In',
  },
  ownerGroup: 'administrators',
  joinGroups: [
    'administrators',
    'free',
    'customers',
  ],
  children: [],
};

export const CONTACTS_PAYLOAD = {
  code: 'contacts',
  status: 'draft',
  displayedInMenu: false,
  pageModel: 'service',
  charset: 'utf-8',
  contentType: 'text/html',
  parentCode: 'homepage',
  seo: false,
  position: 6,
  titles: {
    it: 'Contatti',
    en: 'Contacts',
  },
  ownerGroup: 'customers',
  joinGroups: [
    'administrators',
    'free',
    'customers',
  ],
  children: [],
};
