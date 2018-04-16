import { makeRequest, METHODS } from 'api/apiManager';
import { LIST_PERMISSIONS_OK } from 'test/mocks/permissions';

export const getPermissions = (page = { page: 1, pageSize: 10 }, params = '') => (
  makeRequest(
    {
      uri: `/api/permissions${params}`,
      method: METHODS.GET,
      mockResponse: LIST_PERMISSIONS_OK,
      useAuthentication: true,
    },
    page,
  )
);

export default getPermissions;
