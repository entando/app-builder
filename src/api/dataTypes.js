import {
  DATA_TYPES,
  DATA_TYPES_DELETE_OK,
  ATTRIBUTE_DATA_TYPES_DELETE_OK,
  DATA_TYPES_OK_PAGE_1,
  DATA_TYPES_ATTRIBUTES,
  DATA_TYPE_ATTRIBUTE,
  ATTRIBUTE_MOVE_UP,
  ATTRIBUTE_MOVE_DOWN,
  DATA_TYPE_REFERENCES_STATUS,
  DATA_TYPE_RELOAD_REFERENCES_STATUS,
} from 'test/mocks/dataTypes';
import { makeRequest, METHODS } from '@entando/apimanager';

export const postDataType = dataTypeObject => makeRequest({
  uri: '/api/dataTypes',
  body: dataTypeObject,
  method: METHODS.POST,
  mockResponse: DATA_TYPES,
  useAuthentication: true,
});

export const putDataType = dataTypeObject => makeRequest({
  uri: `/api/dataTypes/${dataTypeObject.code}`,
  body: dataTypeObject,
  method: METHODS.PUT,
  mockResponse: DATA_TYPES,
  useAuthentication: true,
});

export const deleteDataType = dataTypeCode => makeRequest({
  uri: `/api/dataTypes/${dataTypeCode}`,
  body: dataTypeCode,
  method: METHODS.DELETE,
  mockResponse: DATA_TYPES_DELETE_OK,
  useAuthentication: true,
});

export const getDataType = dataTypeCode => makeRequest({
  uri: `/api/dataTypes/${dataTypeCode}`,
  method: METHODS.GET,
  mockResponse: DATA_TYPES,
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

export const getDataTypesStatus = () => (
  makeRequest({
    uri: '/api/dataTypesStatus',
    method: METHODS.GET,
    mockResponse: DATA_TYPE_REFERENCES_STATUS,
    useAuthentication: true,
  })
);

export const postDataTypesStatus = dataTypeCodes => (
  makeRequest({
    uri: '/api/dataTypesStatus',
    method: METHODS.POST,
    body: dataTypeCodes,
    mockResponse: DATA_TYPE_RELOAD_REFERENCES_STATUS,
    useAuthentication: true,
  })
);

export const postRefreshDataTypes = dataTypeCode => makeRequest({
  uri: `/api/dataTypes/refresh/${dataTypeCode}`,
  method: METHODS.POST,
  body: { dataTypeCode },
  mockResponse: { dataTypeCode },
  useAuthentication: true,
});


// attributes

export const deleteAttributeFromDataType = (dataTypeCode, attributeCode) => (
  makeRequest({
    uri: `/api/dataTypes/${dataTypeCode}/attribute/${attributeCode}`,
    method: METHODS.DELETE,
    mockResponse: ATTRIBUTE_DATA_TYPES_DELETE_OK,
    useAuthentication: true,
  })
);

export const getAttributeFromDataType = (dataTypeCode, attributeCode) => (
  makeRequest({
    uri: `/api/dataTypes/${dataTypeCode}/attribute/${attributeCode}`,
    method: METHODS.GET,
    mockResponse: DATA_TYPES.attributes[0],
    useAuthentication: true,
  })
);

export const postAttributeFromDataType = (dataTypeCode, attributeObject) => (
  makeRequest({
    uri: `/api/dataTypes/${dataTypeCode}/attribute`,
    method: METHODS.POST,
    body: attributeObject,
    mockResponse: DATA_TYPES.attributes[0],
    useAuthentication: true,
  })
);

export const putAttributeFromDataType = (dataTypeCode, attributeObject) => (
  makeRequest({
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

export const moveAttributeUp = (dataTypeCode, attributeCode) => (
  makeRequest({
    uri: `/api/dataTypes/${dataTypeCode}/attribute/${attributeCode}/moveUp`,
    body: {},
    method: METHODS.PUT,
    mockResponse: ATTRIBUTE_MOVE_UP,
    useAuthentication: true,
  })
);

export const moveAttributeDown = (dataTypeCode, attributeCode) => (
  makeRequest({
    uri: `/api/dataTypes/${dataTypeCode}/attribute/${attributeCode}/moveDown`,
    body: {},
    method: METHODS.PUT,
    mockResponse: ATTRIBUTE_MOVE_DOWN,
    useAuthentication: true,
  })
);

export default getDataTypes;
