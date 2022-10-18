import { makeRequest, METHODS } from '@entando/apimanager';
import {
  GET_CONTENT_TYPES_RESPONSE_OK,
  CONTENT_TYPES_ATTRIBUTES,
  CONTENT_TYPE_ATTRIBUTE,
  ATTRIBUTE_CONTENT_TYPES_DELETE_OK,
  ATTRIBUTE_MOVE_UP,
  ATTRIBUTE_MOVE_DOWN,
} from 'test/mocks/contentType';

const contentTypePath = '/api/plugins/cms/contentTypes';

export const getContentTypes = (page = { page: 1, pageSize: 10 }, params = '') => makeRequest(
  {
    uri: `${contentTypePath}${params}`,
    method: METHODS.GET,
    mockResponse: GET_CONTENT_TYPES_RESPONSE_OK,
    useAuthentication: true,
  },
  page,
);

export const getContentType = contentTypeCode => makeRequest({
  uri: `${contentTypePath}/${contentTypeCode}`,
  method: METHODS.GET,
  mockResponse: GET_CONTENT_TYPES_RESPONSE_OK[0],
  useAuthentication: true,
});

// attributes

export const getAttributeFromContentType = (contentTypeCode, attributeCode) => makeRequest({
  uri: `${contentTypePath}/${contentTypeCode}/attributes/${attributeCode}`,
  method: METHODS.GET,
  mockResponse: GET_CONTENT_TYPES_RESPONSE_OK[0].attributes[0],
  useAuthentication: true,
});

export const postAttributeFromContentType = (contentTypeCode, attributeObject) => makeRequest({
  uri: `${contentTypePath}/${contentTypeCode}/attributes`,
  method: METHODS.POST,
  body: attributeObject,
  mockResponse: GET_CONTENT_TYPES_RESPONSE_OK[0].attributes[0],
  useAuthentication: true,
});

export const putAttributeFromContentType = (contentTypeCode, attributeObject) => makeRequest({
  uri: `${contentTypePath}/${contentTypeCode}/attributes/${attributeObject.code}`,
  method: METHODS.PUT,
  body: attributeObject,
  mockResponse: GET_CONTENT_TYPES_RESPONSE_OK[0].attributes[0],
  useAuthentication: true,
});

export const deleteAttributeFromContentType = (contentTypeCode, attributeCode) => makeRequest({
  uri: `${contentTypePath}/${contentTypeCode}/attributes/${attributeCode}`,
  method: METHODS.DELETE,
  mockResponse: ATTRIBUTE_CONTENT_TYPES_DELETE_OK,
  useAuthentication: true,
});

export const getContentTypeAttributes = (page = { page: 1, pageSize: 10 }, params = '') => makeRequest(
  {
    uri: `/api/plugins/cms/contentTypeAttributes${params}`,
    method: METHODS.GET,
    mockResponse: CONTENT_TYPES_ATTRIBUTES,
    useAuthentication: true,
  },
  page,
);

export const getContentTypeAttribute = (contentTypeCode, attributeTypeCode) => makeRequest({
  uri: `/api/plugins/cms/contentTypeAttributes/${contentTypeCode}/attribute/${attributeTypeCode}`,
  method: METHODS.GET,
  mockResponse: CONTENT_TYPE_ATTRIBUTE,
  useAuthentication: true,
});

export const moveAttributeUp = (contentTypeCode, attributeCode) => makeRequest({
  uri: `${contentTypePath}/${contentTypeCode}/attributes/${attributeCode}/moveUp`,
  body: {},
  method: METHODS.PUT,
  mockResponse: ATTRIBUTE_MOVE_UP,
  useAuthentication: true,
});

export const moveAttributeDown = (contentTypeCode, attributeCode) => makeRequest({
  uri: `${contentTypePath}/${contentTypeCode}/attributes/${attributeCode}/moveDown`,
  body: {},
  method: METHODS.PUT,
  mockResponse: ATTRIBUTE_MOVE_DOWN,
  useAuthentication: true,
});
