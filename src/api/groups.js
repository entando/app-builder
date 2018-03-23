import { makeMockRequest, METHODS } from 'api/apiManager';
import { LIST_GROUPS_OK, BODY_OK } from 'test/mocks/groups';

const filterMockList = (groupCode) => {
  const selected = LIST_GROUPS_OK.filter(group => (group.code === groupCode));
  if (selected.length) {
    return selected[0];
  }

  return {};
};

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

export const getGroup = groupCode => (
  makeMockRequest({
    uri: `/api/groups/${groupCode}`,
    method: METHODS.GET,
    mockResponse: filterMockList(groupCode),
    useAuthentication: true,
  })
);

export const putGroup = groupObject => (
  makeMockRequest({
    uri: `/api/groups/${groupObject.code}`,
    method: METHODS.PUT,
    mockResponse: BODY_OK,
    body: groupObject,
    useAuthentication: true,
  })
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

export default getGroups;
