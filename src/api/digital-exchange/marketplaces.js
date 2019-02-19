import { LIST_DE_MARKETPLACES_OK } from 'test/mocks/digital-exchange/marketplaces';
import { makeRequest, METHODS } from '@entando/apimanager';

export const getDEMarketplaces = (page = { page: 1, pageSize: 10 }, params = '') => (
  makeRequest(
    {
      uri: `/api/digitalExchange/exchanges${params}`,
      method: METHODS.GET,
      mockResponse: LIST_DE_MARKETPLACES_OK,
      useAuthentication: true,
    },
    page,
  )
);

export const getDEMarketplace = id => (
  makeRequest({
    uri: `/api/digitalExchange/exchanges/${id}`,
    method: METHODS.GET,
    mockResponse: {},
    useAuthentication: true,
  })
);

export const deleteDEMarketplace = id => (
  makeRequest({
    uri: `/api/digitalExchange/exchanges/${id}`,
    method: METHODS.DELETE,
    mockResponse: {},
    useAuthentication: true,
  })
);

export const postDEMarketplaces = marketplace => (
  makeRequest({
    uri: '/api/digitalExchange/exchanges',
    method: METHODS.POST,
    mockResponse: {},
    useAuthentication: true,
    body: marketplace,
  })
);

export const putDEMarketplaces = marketplace => (
  makeRequest({
    uri: `/api/digitalExchange/exchanges/${marketplace.id}`,
    method: METHODS.PUT,
    mockResponse: {},
    useAuthentication: true,
    body: marketplace,
  })
);
