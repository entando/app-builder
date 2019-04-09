import {
  GET_DE_COMPONENT_OK,
  LIST_DE_COMPONENTS_OK,
  COMPONENT_INSTALLATION_CREATED,
  COMPONENT_INSTALLATION_COMPLETED,
  COMPONENT_UNINSTALLATION_CREATED,
  COMPONENT_UNINSTALLATION_COMPLETED,
} from 'test/mocks/digital-exchange/components';
import { makeRequest, METHODS } from '@entando/apimanager';

export const getDEComponent = id => (
  makeRequest({
    uri: `/api/digitalExchange/components/${id}`,
    method: METHODS.GET,
    mockResponse: GET_DE_COMPONENT_OK,
    useAuthentication: true,
  })
);

export const getDEComponents = (page = { page: 1, pageSize: 10 }, params = '') => (
  makeRequest(
    {
      uri: `/api/digitalExchange/components${params}`,
      method: METHODS.GET,
      mockResponse: LIST_DE_COMPONENTS_OK,
      useAuthentication: true,
    },
    page,
  )
);

export const postDEComponentInstall = component => (
  makeRequest({
    uri: `/api/digitalExchange/${component.digitalExchangeId}/install/${component.id}`,
    body: {},
    method: METHODS.POST,
    mockResponse: COMPONENT_INSTALLATION_CREATED,
    useAuthentication: true,
  })
);

export const getDEComponentInstall = id => (
  makeRequest({
    uri: `/api/digitalExchange/install/${id}`,
    method: METHODS.GET,
    mockResponse: COMPONENT_INSTALLATION_COMPLETED,
    useAuthentication: true,
  })
);

export const postDEComponentUninstall = id => (
  makeRequest({
    uri: `/api/digitalExchange/uninstall/${id}`,
    body: {},
    method: METHODS.POST,
    mockResponse: COMPONENT_UNINSTALLATION_CREATED,
    useAuthentication: true,
  })
);

export const getDEComponentUninstall = id => (
  makeRequest({
    uri: `/api/digitalExchange/uninstall/${id}`,
    method: METHODS.GET,
    mockResponse: COMPONENT_UNINSTALLATION_COMPLETED,
    useAuthentication: true,
  })
);
