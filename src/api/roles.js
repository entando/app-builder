import { makeRequest, METHODS } from 'api/apiManager';
import { LIST_ROLES_OK, BODY_OK, GET_ROLE_PAYLOAD, ROLE_USER_REFERENCES_PAYLOAD } from 'test/mocks/roles';

export const filterMockList = (roleCode) => {
  const selected = LIST_ROLES_OK.filter(role => (role.code === roleCode));
  if (selected.length) {
    return selected[0];
  }

  return {};
};

export const getRoles = (page = { page: 1, pageSize: 10 }, params = '') => (
  makeRequest(
    {
      uri: `/api/roles${params}`,
      method: METHODS.GET,
      mockResponse: LIST_ROLES_OK,
      useAuthentication: true,
    },
    page,
  )
);

export const getRole = roleCode => (
  makeRequest({
    uri: `/api/roles/${roleCode}`,
    method: METHODS.GET,
    mockResponse: { ...GET_ROLE_PAYLOAD, ...filterMockList(roleCode) },
    useAuthentication: true,
  })
);

export const postRoles = rolesObject => (
  makeRequest({
    uri: '/api/roles',
    method: METHODS.POST,
    mockResponse: BODY_OK,
    body: rolesObject,
    useAuthentication: true,
  })
);

export const putRole = roleObject => (
  makeRequest({
    uri: `/api/roles/${roleObject.code}`,
    method: METHODS.PUT,
    mockResponse: BODY_OK,
    body: roleObject,
    useAuthentication: true,
  })
);

export const deleteRole = roleCode => (
  makeRequest({
    uri: `/api/roles/${roleCode}`,
    method: METHODS.DELETE,
    mockResponse: { code: roleCode },
    useAuthentication: true,
  })
);

export const getUserReferences = (roleCode, page = { page: 1, pageSize: 10 }, params = '') => (
  makeRequest(
    {
      uri: `/api/roles/${roleCode}/userreferences${params}`,
      method: METHODS.GET,
      mockResponse: ROLE_USER_REFERENCES_PAYLOAD,
      useAuthentication: true,
    },
    page,
  )
);

export default getRoles;
