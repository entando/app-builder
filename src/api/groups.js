import { makeMockRequest, METHODS } from 'api/apiManager';
import {
  GROUPS_NORMALIZED,
  PAGE_REFERENCES,
  USER_REFERENCES,
  WIDGETTYPE_REFERENCES,
  GROUP_CONTENT_REFERENCES,
  RESOURCE_REFERENCES,
  LIST_GROUPS_OK,
  BODY_OK,
} from 'test/mocks/groups';

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

const getErrorsReferences = (ref, groupname) => (
  ref[groupname].list ? [] :
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
      errors: () => getErrorsReferences(PAGE_REFERENCES, groupname),
    },
    page,
  )
);

export const getUserReferences = (page = { page: 1, pageSize: 10 }, groupname) => (
  makeMockRequest(
    {
      uri: `/groups/${groupname}/references/UserManager`,
      method: METHODS.GET,
      mockResponse: USER_REFERENCES[groupname].list,
      errors: () => getErrorsReferences(USER_REFERENCES, groupname),
    },
    page,
  )
);

export const getWidgetTypeReferences = (page = { page: 1, pageSize: 10 }, groupname) => (
  makeMockRequest(
    {
      uri: `/groups/${groupname}/references/WidgetTypeManager`,
      method: METHODS.GET,
      mockResponse: WIDGETTYPE_REFERENCES[groupname].list,
      errors: () => getErrorsReferences(WIDGETTYPE_REFERENCES, groupname),
    },
    page,
  )
);

export const getContentReferences = (page = { page: 1, pageSize: 10 }, groupname) => (
  makeMockRequest(
    {
      uri: `/groups/${groupname}/references/ContentManager`,
      method: METHODS.GET,
      mockResponse: GROUP_CONTENT_REFERENCES[groupname].list,
      errors: () => getErrorsReferences(GROUP_CONTENT_REFERENCES, groupname),
    },
    page,
  )
);


export const getResourceReferences = (page = { page: 1, pageSize: 10 }, groupname) => (
  makeMockRequest(
    {
      uri: `/groups/${groupname}/references/ResourceManager`,
      method: METHODS.GET,
      mockResponse: RESOURCE_REFERENCES[groupname].list,
      errors: () => getErrorsReferences(RESOURCE_REFERENCES, groupname),
    },
    page,
  )
);


export default getGroups;
