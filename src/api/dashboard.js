import { makeRequest, METHODS } from '@entando/apimanager';
import { INTEGRATIONS } from 'test/mocks/dashboard';

// eslint-disable-next-line import/prefer-default-export
export const getIntegration = () => (
  makeRequest({
    uri: '/api/dashboard/integration',
    method: METHODS.GET,
    mockResponse: INTEGRATIONS,
    useAuthentication: true,
  })
);
