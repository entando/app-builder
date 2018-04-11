import {
  DATA_TYPES,
  DATA_TYPES_DELETE_OK,
  ATTRIBUTE_DATA_TYPES_DELETE_OK,
  DATA_TYPES_OK_PAGE_1,
  DATA_TYPES_ATTRIBUTES,
  DATA_TYPE_ATTRIBUTE,
} from 'test/mocks/dataTypes';
import { makeMockRequest, makeRequest, METHODS } from 'api/apiManager';

export const postDataType = dataTypeObject => makeMockRequest({
  uri: '/api/dataTypes',
  body: dataTypeObject,
  method: METHODS.POST,
  mockResponse: DATA_TYPES,
  useAuthentication: true,
});

export const putDataType = dataTypeObject => makeMockRequest({
  uri: `/api/dataTypes/${dataTypeObject.code}`,
  body: dataTypeObject,
  method: METHODS.PUT,
  mockResponse: DATA_TYPES,
  useAuthentication: true,
});

export const deleteDataType = dataTypeCode => makeMockRequest({
  uri: `/api/dataTypes/${dataTypeCode}`,
  body: dataTypeCode,
  method: METHODS.DELETE,
  mockResponse: DATA_TYPES_DELETE_OK,
  useAuthentication: true,
});


export const getDataTypes = (page = { page: 1, pageSize: 10 }, params = '') => (
  makeRequest(
    {
      uri: `/api/dataTypes${params}`,
      method: METHODS.GET,
      mockResponse: DATA_TYPES_OK_PAGE_1,
      useAuthentication: true,
    },
    page,
  )
);

// attributes

export const deleteAttributeFromDataType = (dataTypeCode, attributeCode) => (
  makeMockRequest({
    uri: `/api/dataTypes/${dataTypeCode}/attribute/${attributeCode}`,
    method: METHODS.DELETE,
    mockResponse: ATTRIBUTE_DATA_TYPES_DELETE_OK,
    useAuthentication: true,
  })
);

export const getAttributeFromDataType = (dataTypeCode, attributeCode) => (
  makeMockRequest({
    uri: `/api/dataTypes/${dataTypeCode}/attribute/${attributeCode}`,
    method: METHODS.GET,
    mockResponse: DATA_TYPES.attributes[0],
    useAuthentication: true,
  })
);

export const postAttributeFromDataType = (dataTypeCode, attributeObject) => (
  makeMockRequest({
    uri: `/api/dataTypes/${dataTypeCode}/attribute`,
    method: METHODS.POST,
    body: attributeObject,
    mockResponse: DATA_TYPES.attributes[0],
    useAuthentication: true,
  })
);

export const putAttributeFromDataType = (dataTypeCode, attributeObject) => (
  makeMockRequest({
    uri: `/api/dataTypes/${dataTypeCode}/attribute/${attributeObject.code}`,
    method: METHODS.PUT,
    body: attributeObject,
    mockResponse: DATA_TYPES.attributes[0],
    useAuthentication: true,
  })
);
export const getDataTypeAttributes = (page = { page: 1, pageSize: 10 }, params = '') => (
  makeRequest(
    {
      uri: `/api/dataTypeAttributes${params}`,
      method: METHODS.GET,
      mockResponse: DATA_TYPES_ATTRIBUTES,
      useAuthentication: true,
    },
    page,
  )
);

export const getDataTypeAttribute = attributeTypeCode => (
  makeRequest({
    uri: `/api/dataTypeAttributes/${attributeTypeCode}`,
    method: METHODS.GET,
    mockResponse: DATA_TYPE_ATTRIBUTE,
    useAuthentication: true,
  })
);


export default getDataTypes;
