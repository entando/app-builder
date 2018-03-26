import { makeMockRequest, METHODS } from 'api/apiManager';
import { GROUPS_NORMALIZED, PAGE_REFERENCES, LIST_GROUPS_OK, BODY_OK } from 'test/mocks/groups';

const filterMockList = (groupCode) => {
  const selected = LIST_GROUPS_OK.filter(group => (group.code === groupCode));
  if (selected.length) {
    return selected[0];
  }

  return {};
};

const getGroupErrors = groupname => (
  GROUPS_NORMALIZED.groups.map[groupname] ? [] :
    [{ code: 1, message: 'invalid group name' }]
);

const getErrorsPageReferences = groupname => (
  PAGE_REFERENCES[groupname].list ? [] :
    [{ code: 1, message: 'invalid group name' }]
);

const getGenericError = obj => (
  obj && obj.length > 0 ? [] : [{ code: 1, message: 'object is invalid' }]
);

export const getGroups = (page = { page: 1, pageSize: 10 }, params = '') => (
  makeMockRequest(
    {
      uri: `/api/groups${params}`,
      method: METHODS.GET,
      mockResponse: LIST_GROUPS_OK,
      useAuthentication: true,
      errors: () => getGenericError(params),
    },
    page,
  )
);

export const getGroup = groupname => makeMockRequest({
  uri: `/api/groups/${groupname}`,
  method: METHODS.GET,
  mockResponse: filterMockList(groupname),
  useAuthentication: true,
  errors: () => getGroupErrors(groupname),
});

export const putGroup = groupObject => (
  makeMockRequest({
    uri: `/api/groups/${groupObject.code}`,
    method: METHODS.PUT,
    mockResponse: BODY_OK,
    body: groupObject,
    useAuthentication: true,
    errors: () => getGenericError(groupObject),
  })
);

export const postGroup = groupObject => (
  makeMockRequest({
    uri: '/api/groups',
    method: METHODS.POST,
    mockResponse: BODY_OK,
    body: groupObject,
    useAuthentication: true,
    errors: () => getGenericError(groupObject),
  })
);


export const getPageReferences = (page = { page: 1, pageSize: 10 }, groupname) => (
  makeMockRequest(
    {
      uri: `/groups/${groupname}/references/PageManager`,
      method: METHODS.GET,
      mockResponse: PAGE_REFERENCES[groupname].list,
      errors: () => getErrorsPageReferences(groupname),
    },
    page,
  )
);


export default getGroups;
