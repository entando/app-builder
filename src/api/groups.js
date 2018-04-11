import { makeRequest, METHODS } from 'api/apiManager';
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

const getErrorsReferences = (ref, groupname) =>
  (ref[groupname] ? [] : [{ code: 1, message: 'invalid group name' }]);

const getGenericError = obj => (
  obj || (obj === '') ? [] : [{ code: 1, message: 'object is invalid' }]
);

export const getGroups = (page = { page: 1, pageSize: 10 }, params = '') => (
  makeRequest(
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

export const getGroup = groupCode => (
  makeRequest({
    uri: `/api/groups/${groupCode}`,
    method: METHODS.GET,
    mockResponse: filterMockList(groupCode),
    useAuthentication: true,
    errors: () => getGroupErrors(groupCode),
  })
);

export const putGroup = groupObject => (
  makeRequest({
    uri: `/api/groups/${groupObject.code}`,
    method: METHODS.PUT,
    mockResponse: BODY_OK,
    body: groupObject,
    useAuthentication: true,
    errors: () => getGenericError(groupObject),
  })
);

export const postGroup = groupObject => (
  makeRequest({
    uri: '/api/groups',
    method: METHODS.POST,
    mockResponse: BODY_OK,
    body: groupObject,
    useAuthentication: true,
    errors: () => getGenericError(groupObject),
  })
);

export const deleteGroup = groupCode => (
  makeRequest({
    uri: `/api/groups/${groupCode}`,
    method: METHODS.DELETE,
    mockResponse: { code: 'groupCode' },
    useAuthentication: true,
  })
);

export const getReferences = (entityName, mockRefs) =>
  (page = { page: 1, pageSize: 10 }, groupname) => makeRequest(
    {
      uri: `/api/groups/${groupname}/references/${entityName}`,
      method: METHODS.GET,
      mockResponse: mockRefs[groupname] ? mockRefs[groupname].list : [],
      errors: () => getErrorsReferences(mockRefs, groupname),
    },
    page,
  );

export const getPageReferences = getReferences('PageManager', PAGE_REFERENCES);
export const getUserReferences = getReferences('UserManager', USER_REFERENCES);
export const getWidgetTypeReferences = getReferences('WidgetTypeManager', WIDGETTYPE_REFERENCES);
export const getContentReferences = getReferences('ContentManager', GROUP_CONTENT_REFERENCES);
export const getResourceReferences = getReferences('ResourceManager', RESOURCE_REFERENCES);

export default getGroups;
