import { makeMockRequest, METHODS } from 'api/apiManager';
import { LIST_ROLES_OK, BODY_OK } from 'test/mocks/roles';

export const getRoles = (page = { page: 1, pageSize: 10 }, params = '') => (
  makeMockRequest(
    {
      uri: `/api/roles${params}`,
      method: METHODS.GET,
      mockResponse: LIST_ROLES_OK,
      useAuthentication: true,
    },
    page,
  )
);

export const postRoles = rolesObject => (
  makeMockRequest({
    uri: '/api/roles',
    method: METHODS.POST,
    mockResponse: BODY_OK,
    body: rolesObject,
    useAuthentication: true,
  })
);

export default getRoles;
