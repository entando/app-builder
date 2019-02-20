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
