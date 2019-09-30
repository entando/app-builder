import { WIDGET } from 'test/mocks/widgets';

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
  { code: 'login_form' },
  null,
  { code: 'search_form' },
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  { code: 'single_content' },
];
export const DASHBOARD_CONFIG = [];
export const SERVICE_CONFIG = [];
export const NOTFOUND_CONFIG = [];
export const ERROR_CONFIG = [];
export const LOGIN_CONFIG = [];
export const CONTACTS_CONFIG = [{
  code: WIDGET.code,
}];
