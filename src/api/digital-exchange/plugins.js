import { LIST_DE_PLUGINS_OK } from 'test/mocks/digital-exchange/plugins';
import { makeRequest, METHODS } from '@entando/apimanager';

// getDEPlugins();
export default (page = { page: 1, pageSize: 10 }, params = '') => (
  makeRequest(
    {
      uri: `/api/de/plugins${params}`,
      method: METHODS.GET,
      mockResponse: LIST_DE_PLUGINS_OK,
      useAuthentication: true,
    },
    page,
  )
);
