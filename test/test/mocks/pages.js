
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
  pageModel: 'complex_model',
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
  pageModel: 'sidebar_holes_model',
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
  pageModel: 'single_cell_model',
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
  pageModel: 'single_cell_model',
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
  pageModel: 'single_cell_model',
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
  pageModel: 'single_cell_model',
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
  pageModel: 'complex_model',
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

export const FREE_PAGES_PAYLOAD = [
  {
    pageCode: 'homepage',
    shortFullTitle: 'Home',
  },
  {
    pageCode: 'service',
    shortFullTitle: '[i].. / Service',
  },
  {
    pageCode: 'notfound',
    shortFullTitle: '.. / .. / Page not found',
  },
  {
    pageCode: 'errorpage',
    shortFullTitle: '.. / .. / Error page',
  },
  {
    pageCode: 'login',
    shortFullTitle: '.. / .. / Login',
  },
];

export const PAGE_SETTINGS_PAYLOAD = {
  param: [{
    name: 'urlStyle',
    value: 'breadcrumbs',
  },
  {
    name: 'treeStyle_page',
    value: 'request',
  },
  {
    name: 'startLangFromBrowser',
    value: 'false',
  },
  {
    name: 'baseUrl',
    value: 'static',
  },
  {
    name: 'baseUrlContext',
    value: 'true',
  },
  {
    name: 'useJsessionId',
    value: 'false',
  }, {
    name: 'notFoundPageCode',
    value: 'notfound',
  },
  {
    name: 'homePageCode',
    value: 'homepage',
  },
  {
    name: 'errorPageCode',
    value: 'errorpage',
  },
  {
    name: 'loginPageCode',
    value: 'login',
  },
  ],
};


export const HOMEPAGE_RESPONSE = {
  payload: HOMEPAGE_PAYLOAD,
};
