import { LIST_DIGITAL_EXCHANGES_OK } from 'test/mocks/digital-exchange/digitalExchanges';
import { makeRequest, METHODS } from '@entando/apimanager';

// eslint-disable-next-line import/prefer-default-export
export const getDigitalExchanges = (page = { page: 1, pageSize: 10 }, params = '') => (
  makeRequest(
    {
      uri: `/api/digitalExchange/exchanges${params}`,
      method: METHODS.GET,
      mockResponse: LIST_DIGITAL_EXCHANGES_OK,
      useAuthentication: true,
    },
    page,
  )
);

export const getDigitalExchange = id => (
  makeRequest({
    uri: `/api/digitalExchange/exchanges/${id}`,
    method: METHODS.GET,
    mockResponse: {},
    useAuthentication: true,
  })
);

export const deleteDigitalExchange = id => (
  makeRequest({
    uri: `/api/digitalExchange/exchanges/${id}`,
    method: METHODS.DELETE,
    mockResponse: {},
    useAuthentication: true,
  })
);

export const postDigitalExchange = marketplace => (
  makeRequest({
    uri: '/api/digitalExchange/exchanges',
    method: METHODS.POST,
    mockResponse: {},
    useAuthentication: true,
    body: marketplace,
  })
);

export const putDigitalExchange = marketplace => (
  makeRequest({
    uri: `/api/digitalExchange/exchanges/${marketplace.id}`,
    method: METHODS.PUT,
    mockResponse: {},
    useAuthentication: true,
    body: marketplace,
  })
);
