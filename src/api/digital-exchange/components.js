import {
  GET_DE_COMPONENT_OK,
  LIST_DE_COMPONENTS_OK,
  COMPONENT_INSTALLATION_CREATED,
  COMPONENT_INSTALLATION_COMPLETED,
  COMPONENT_UNINSTALLATION_CREATED,
  COMPONENT_UNINSTALLATION_COMPLETED,
  COMPONENT_USAGE_LIST,
} from 'test/mocks/digital-exchange/components';
import { makeRequest, METHODS } from '@entando/apimanager';

export const getDEComponent = id => (
  makeRequest({
    uri: `/components/${id}`,
    domain: '/digital-exchange',
    method: METHODS.GET,
    mockResponse: GET_DE_COMPONENT_OK,
    useAuthentication: true,
  })
);

export const getDEComponents = (page = { page: 1, pageSize: 10 }, params = '') => (
  makeRequest(
    {
      uri: `/components${params}`,
      domain: '/digital-exchange',
      method: METHODS.GET,
      mockResponse: LIST_DE_COMPONENTS_OK,
      useAuthentication: true,
    },
    page,
  )
);

export const postDEComponentInstall = component => (
  makeRequest({
    uri: `/components/${component.id}/install`,
    domain: '/digital-exchange',
    body: {},
    method: METHODS.POST,
    mockResponse: COMPONENT_INSTALLATION_CREATED,
    useAuthentication: true,
  })
);

// should you need to test (un)installation in-progress using mock mode,
// you can set the mockResponse to `COMPONENT_INSTALLATION_IN_PROGRESS` to fully test the process.
// do this the same for `getDEComponentUninstall` API
export const getDEComponentInstall = id => (
  makeRequest({
    uri: `/components/${id}/install`,
    domain: '/digital-exchange',
    method: METHODS.GET,
    mockResponse: COMPONENT_INSTALLATION_COMPLETED,
    useAuthentication: true,
  })
);

export const postDEComponentUninstall = id => (
  makeRequest({
    uri: `/components/${id}/uninstall`,
    domain: '/digital-exchange',
    body: {},
    method: METHODS.POST,
    mockResponse: COMPONENT_UNINSTALLATION_CREATED,
    useAuthentication: true,
  })
);

export const getDEComponentUninstall = id => (
  makeRequest({
    uri: `/components/${id}/uninstall`,
    domain: '/digital-exchange',
    method: METHODS.GET,
    mockResponse: COMPONENT_UNINSTALLATION_COMPLETED,
    useAuthentication: true,
  })
);

export const getComponentUsage = id => (
  makeRequest({
    uri: `/components/${id}/usage`,
    domain: '/digital-exchange',
    method: METHODS.GET,
    mockResponse: COMPONENT_USAGE_LIST,
  })
);
