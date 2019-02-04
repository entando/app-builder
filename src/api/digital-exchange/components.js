import { GET_DE_COMPONENT_OK, LIST_DE_COMPONENTS_OK, COMPONENT_INSTALLATION_CREATED, COMPONENT_INSTALLATION_IN_PROGRESS } from 'test/mocks/digital-exchange/components';
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

export const postInstallDEComponent = component => (
  makeRequest({
    uri: `/api/digitalExchange/${component.digitalExchangeId}/install/${component.id}`,
    body: {},
    method: METHODS.POST,
    mockResponse: COMPONENT_INSTALLATION_CREATED,
    useAuthentication: true,
  })
);

export const getDEComponentInstallationStatus = componentId => (
  makeRequest({
    uri: `/api/digitalExchange/install/${componentId}`,
    method: METHODS.GET,
    mockResponse: COMPONENT_INSTALLATION_IN_PROGRESS,
    useAuthentication: true,
  })
);
