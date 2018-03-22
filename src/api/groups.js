import { makeRequest, makeMockRequest, METHODS } from 'api/apiManager';
import { LIST_GROUPS_OK } from 'test/mocks/groups';

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

export const getGroup = groupname =>
  makeMockRequest({
    uri: `groups/${groupname}`,
    method: METHODS.GET,
    mockResponse: LIST_GROUPS_OK[groupname],
  });
export default getGroups;
