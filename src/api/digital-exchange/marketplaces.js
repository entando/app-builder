import { LIST_DE_MARKETPLACES_OK } from 'test/mocks/digital-exchange/marketplaces';
import { makeRequest, METHODS } from '@entando/apimanager';

// eslint-disable-next-line import/prefer-default-export
export const getDEMarketplaces = (page = { page: 1, pageSize: 10 }, params = '') => (
  makeRequest(
    {
      uri: `/api/digitalExchange/marketplaces${params}`,
      method: METHODS.GET,
      mockResponse: LIST_DE_MARKETPLACES_OK,
      useAuthentication: true,
    },
    page,
  )
);
