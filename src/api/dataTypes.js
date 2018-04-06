import { DATA_TYPES_OK_PAGE_1, DATA_TYPES_ATTRIBUTES } from 'test/mocks/dataTypes';
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


export default getDataTypes;
