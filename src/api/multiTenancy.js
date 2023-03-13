import { makeRequest, METHODS } from '@entando/apimanager';

import { GET_CURRENT_TENANT_RESPONSE_OK_PRIMARY } from 'test/mocks/multiTenancy';

// eslint-disable-next-line import/prefer-default-export
export const getCurrentTenant = () => makeRequest({
  uri: '/api/currentTenant',
  method: METHODS.GET,
  mockResponse: GET_CURRENT_TENANT_RESPONSE_OK_PRIMARY,
  useAuthentication: true,
});
