import { makeRequest, METHODS } from '@entando/apimanager';

import { GET_CURRENT_SYSTEM_CONFIGURATION_ADVANCED_SEARCH_ON } from 'test/mocks/currentSystemConfiguration';

// eslint-disable-next-line import/prefer-default-export
export const getCurrentSystemConfiguration = () => makeRequest({
  uri: '/api/currentSystemConfiguration',
  method: METHODS.GET,
  mockResponse: GET_CURRENT_SYSTEM_CONFIGURATION_ADVANCED_SEARCH_ON,
  useAuthentication: true,
});
