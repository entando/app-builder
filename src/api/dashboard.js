import { makeRequest, METHODS } from '@entando/apimanager';
import { INTEGRATIONS, PAGE_STATUS } from 'test/mocks/dashboard';

export const getIntegration = () => (
  makeRequest({
    uri: '/api/dashboard/integration',
    method: METHODS.GET,
    mockResponse: INTEGRATIONS,
    useAuthentication: true,
  })
);

export const getPageStatus = () => (
  makeRequest({
    uri: '/api/dashboard/pageStatus',
    method: METHODS.GET,
    mockResponse: PAGE_STATUS,
    useAuthentication: true,
  })
);
