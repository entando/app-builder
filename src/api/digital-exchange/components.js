import { GET_DE_COMPONENT_OK, LIST_DE_COMPONENTS_OK } from 'test/mocks/digital-exchange/components';
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
