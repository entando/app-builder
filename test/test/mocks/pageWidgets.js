

/*
 * - homepage
 *   |- dashboard
 *   |- service
 *   |  |- notfound
 *   |  |- error
 *   |  |- login
 *   |- contacts
 */

export const HOMEPAGE_WIDGETS = [
  null,
  { type: 'login_form' },
  null,
  { type: 'pippo' },
];
export const DASHBOARD_WIDGETS = [];
export const SERVICE_WIDGETS = [];
export const NOTFOUND_WIDGETS = [];
export const ERROR_WIDGETS = [];
export const LOGIN_WIDGETS = [];
export const CONTACTS_WIDGETS = [];

export const HOMEPAGE_RESPONSE = { payload: HOMEPAGE_WIDGETS };
export const DASHBOARD_RESPONSE = { payload: DASHBOARD_WIDGETS };
export const SERVICE_RESPONSE = { payload: SERVICE_WIDGETS };
export const NOTFOUND_RESPONSE = { payload: NOTFOUND_WIDGETS };
export const ERROR_RESPONSE = { payload: ERROR_WIDGETS };
export const LOGIN_RESPONSE = { payload: LOGIN_WIDGETS };
export const CONTACTS_RESPONSE = { payload: CONTACTS_WIDGETS };
