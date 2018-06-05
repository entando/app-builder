import {
  PROFILE_TYPES,
  PROFILE_TYPES_DELETE_OK,
  ATTRIBUTE_PROFILE_TYPES_DELETE_OK,
  PROFILE_TYPES_OK_PAGE_1,
  PROFILE_TYPES_ATTRIBUTES,
  PROFILE_TYPE_ATTRIBUTE,
  ATTRIBUTE_MOVE_UP,
  ATTRIBUTE_MOVE_DOWN,
} from 'test/mocks/profileTypes';
import { makeRequest, METHODS } from '@entando/apimanager';

export const postProfileType = profileTypeObject => makeRequest({
  uri: '/api/profileTypes',
  body: profileTypeObject,
  method: METHODS.POST,
  mockResponse: PROFILE_TYPES,
  useAuthentication: true,
});

export const putProfileType = profileTypeObject => makeRequest({
  uri: `/api/profileTypes/${profileTypeObject.code}`,
  body: profileTypeObject,
  method: METHODS.PUT,
  mockResponse: PROFILE_TYPES,
  useAuthentication: true,
});

export const deleteProfileType = profileTypeCode => makeRequest({
  uri: `/api/profileTypes/${profileTypeCode}`,
  body: profileTypeCode,
  method: METHODS.DELETE,
  mockResponse: PROFILE_TYPES_DELETE_OK,
  useAuthentication: true,
});

export const getProfileType = profileTypeCode => makeRequest({
  uri: `/api/profileTypes/${profileTypeCode}`,
  method: METHODS.GET,
  mockResponse: PROFILE_TYPES,
  useAuthentication: true,
});


export const getProfileTypes = (page = { page: 1, pageSize: 10 }, params = '') => (
  makeRequest(
    {
      uri: `/api/profileTypes${params}`,
      method: METHODS.GET,
      mockResponse: PROFILE_TYPES_OK_PAGE_1,
      useAuthentication: true,
    },
    page,
  )
);

// attributes

export const deleteAttributeFromProfileType = (profileTypeCode, attributeCode) => (
  makeRequest({
    uri: `/api/profileTypes/${profileTypeCode}/attribute/${attributeCode}`,
    method: METHODS.DELETE,
    mockResponse: ATTRIBUTE_PROFILE_TYPES_DELETE_OK,
    useAuthentication: true,
  })
);

export const getAttributeFromProfileType = (profileTypeCode, attributeCode) => (
  makeRequest({
    uri: `/api/profileTypes/${profileTypeCode}/attribute/${attributeCode}`,
    method: METHODS.GET,
    mockResponse: PROFILE_TYPES.attributes[0],
    useAuthentication: true,
  })
);

export const postAttributeFromProfileType = (profileTypeCode, attributeObject) => (
  makeRequest({
    uri: `/api/profileTypes/${profileTypeCode}/attribute`,
    method: METHODS.POST,
    body: attributeObject,
    mockResponse: PROFILE_TYPES.attributes[0],
    useAuthentication: true,
  })
);

export const putAttributeFromProfileType = (profileTypeCode, attributeObject) => (
  makeRequest({
    uri: `/api/profileTypes/${profileTypeCode}/attribute/${attributeObject.code}`,
    method: METHODS.PUT,
    body: attributeObject,
    mockResponse: PROFILE_TYPES.attributes[0],
    useAuthentication: true,
  })
);
export const getProfileTypeAttributes = (page = { page: 1, pageSize: 10 }, params = '') => (
  makeRequest(
    {
      uri: `/api/profileTypeAttributes${params}`,
      method: METHODS.GET,
      mockResponse: PROFILE_TYPES_ATTRIBUTES,
      useAuthentication: true,
    },
    page,
  )
);

export const getProfileTypeAttribute = attributeTypeCode => (
  makeRequest({
    uri: `/api/profileTypeAttributes/${attributeTypeCode}`,
    method: METHODS.GET,
    mockResponse: PROFILE_TYPE_ATTRIBUTE,
    useAuthentication: true,
  })
);

export const moveAttributeUp = (profileTypeCode, attributeCode) => (
  makeRequest({
    uri: `/api/profileTypes/${profileTypeCode}/attribute/${attributeCode}/moveUp`,
    body: {},
    method: METHODS.PUT,
    mockResponse: ATTRIBUTE_MOVE_UP,
    useAuthentication: true,
  })
);

export const moveAttributeDown = (profileTypeCode, attributeCode) => (
  makeRequest({
    uri: `/api/profileTypes/${profileTypeCode}/attribute/${attributeCode}/moveDown`,
    body: {},
    method: METHODS.PUT,
    mockResponse: ATTRIBUTE_MOVE_DOWN,
    useAuthentication: true,
  })
);

export default getProfileTypes;
