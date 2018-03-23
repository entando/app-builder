import { makeMockRequest, METHODS } from 'api/apiManager';
import { LIST_GROUPS_OK, GROUPS_NORMALIZED, BODY_OK } from 'test/mocks/groups';

const getErrors = groupname => (
  GROUPS_NORMALIZED.groups.map[groupname] ? [] :
    [{ code: 1, message: 'invalid group name' }]
);

export const getGroups = (page = { page: 1, pageSize: 10 }, params = '') => (
  makeMockRequest(
    {
      uri: `/api/groups${params}`,
      method: METHODS.GET,
      mockResponse: LIST_GROUPS_OK,
      useAuthentication: true,
    },
    page,
  )
);

export const postGroup = groupObject => (
  makeMockRequest({
    uri: '/api/groups',
    method: METHODS.POST,
    mockResponse: BODY_OK,
    body: groupObject,
    useAuthentication: true,
  })
);

export const getGroup = groupname => makeMockRequest({
  uri: `/api/groups/${groupname}`,
  method: METHODS.GET,
  mockResponse: GROUPS_NORMALIZED.groups.map[groupname] || {},
  errors: () => getErrors(groupname),
});
export default getGroups;
