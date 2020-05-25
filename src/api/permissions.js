import { makeRequest, METHODS } from '@entando/apimanager';
import { LIST_PERMISSIONS_OK } from 'test/mocks/permissions';
import { MY_PERMISSIONS_PAYLOAD_OK } from 'test/mocks/loggedUserPermissions';

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

export const getMyGroupPermissions = () => (
  makeRequest({
    uri: '/api/users/userProfiles/myGroupPermissions',
    method: METHODS.GET,
    mockResponse: MY_PERMISSIONS_PAYLOAD_OK,
    useAuthentication: true,
    useCredentials: true,
  })
);

export default getPermissions;
