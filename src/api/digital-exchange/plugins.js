import { LIST_DE_COMPONENTS_OK } from 'test/mocks/digital-exchange/components';
import { makeRequest, METHODS } from '@entando/apimanager';

// getDEComponents();
export default (page = { page: 1, pageSize: 10 }, params = '') => (
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
