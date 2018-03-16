

/*
 * - homepage
 *   |- dashboard
 *   |- service
 *   |  |- notfound
 *   |  |- error
 *   |  |- login
 *   |- contacts
 */

export const HOMEPAGE_CONFIG = [
  null,
  { type: 'login_form' },
  null,
  { type: 'search_form' },
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  { type: 'single_content', config: {} },
];
export const DASHBOARD_CONFIG = [];
export const SERVICE_CONFIG = [];
export const NOTFOUND_CONFIG = [];
export const ERROR_CONFIG = [];
export const LOGIN_CONFIG = [];
export const CONTACTS_CONFIG = [];

export const HOMEPAGE_RESPONSE = { payload: HOMEPAGE_CONFIG };
export const DASHBOARD_RESPONSE = { payload: DASHBOARD_CONFIG };
export const SERVICE_RESPONSE = { payload: SERVICE_CONFIG };
export const NOTFOUND_RESPONSE = { payload: NOTFOUND_CONFIG };
export const ERROR_RESPONSE = { payload: ERROR_CONFIG };
export const LOGIN_RESPONSE = { payload: LOGIN_CONFIG };
export const CONTACTS_RESPONSE = { payload: CONTACTS_CONFIG };
