import { DATA_TYPES_OK_PAGE_1, DATA_TYPES_ATTRIBUTES, DATA_TYPE_ATTRIBUTE, DATA_TYPE_GET_PAYLOAD } from 'test/mocks/dataTypes';
import { makeMockRequest, makeRequest, METHODS } from 'api/apiManager';

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

export const getDataType = dataTypeCode => (
  makeRequest({
    uri: `/api/dataTypes/${dataTypeCode}`,
    method: METHODS.GET,
    mockResponse: DATA_TYPE_GET_PAYLOAD,
    useAuthentication: true,
  })
);

export const getDataTypeAttributes = (page = { page: 1, pageSize: 10 }, params = '') => (
  makeMockRequest(
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
  makeMockRequest({
    uri: `/api/dataTypeAttributes/${attributeTypeCode}`,
    method: METHODS.GET,
    mockResponse: DATA_TYPE_ATTRIBUTE,
    useAuthentication: true,
  })
);


export default getDataTypes;
