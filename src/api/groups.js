import { makeRequest, makeMockRequest, METHODS } from 'api/apiManager';
import { LIST_GROUPS_OK, GROUPS_NORMALIZED } from 'test/mocks/groups';

export const getGroups = (page = { page: 1, pageSize: 10 }, params = '') => (
  makeRequest(
    {
      uri: `/api/groups${params}`,
      method: METHODS.GET,
      mockResponse: LIST_GROUPS_OK,
      useAuthentication: true,
    },
    page,
  )
);

const getErrors = groupname => (
  GROUPS_NORMALIZED.groups.map[groupname] ? [] :
    [{ code: 1, message: 'invalid group name' }]
);

export const getGroup = groupname => makeMockRequest({
  uri: `/api/groups/${groupname}`,
  method: METHODS.GET,
  mockResponse: GROUPS_NORMALIZED.groups.map[groupname] || {},
  errors: () => getErrors(groupname),
});
export default getGroups;
