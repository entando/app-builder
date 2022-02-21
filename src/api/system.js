import { makeRequest, METHODS } from '@entando/apimanager';

// eslint-disable-next-line import/prefer-default-export
export const getSystemReport = () => makeRequest({
  uri: '/api/system/report',
  method: METHODS.GET,
  mockResponse: {},
  useAuthentication: true,
});
