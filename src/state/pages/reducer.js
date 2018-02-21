import {
  HOMEPAGE_PAYLOAD, LOGIN_PAYLOAD, SERVICE_PAYLOAD, CONTACTS_PAYLOAD,
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
const initialState = {
  homepage: HOMEPAGE_PAYLOAD,
  dashboard: DASHBOARD_PAYLOAD,
  login: LOGIN_PAYLOAD,
  service: SERVICE_PAYLOAD,
  notfound: NOTFOUND_PAYLOAD,
  error: ERROR_PAYLOAD,
  contacts: CONTACTS_PAYLOAD,
};


const reducer = (state = initialState) => state;

export default reducer;
