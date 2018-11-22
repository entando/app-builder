import { LIST_DE_COMPONENTS_OK } from 'test/mocks/digital-exchange/components';
import { makeRequest, METHODS } from '@entando/apimanager';

// eslint-disable-next-line import/prefer-default-export
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
