import { DATA_TYPES_OK_PAGE_1, DATA_TYPES_ATTRIBUTES } from 'test/mocks/dataTypes';
import { makeMockRequest, makeRequest, METHODS } from 'api/apiManager';

const getGenericError = obj => (
  obj || (obj === '') ? [] : [{ code: 1, message: 'object is invalid' }]
);

export const getDataTypes = (page = { page: 1, pageSize: 10 }, params = '') => (
  makeRequest(
    {
      uri: `/api/dataTypes${params}`,
      method: METHODS.GET,
      mockResponse: DATA_TYPES_OK_PAGE_1,
      useAuthentication: true,
      errors: () => getGenericError(params),
    },
    page,
  )
);

export const getDataTypeAttributes = () => (
  makeMockRequest({
    uri: '/api/dataTypeAttributes',
    method: METHODS.GET,
    mockResponse: DATA_TYPES_ATTRIBUTES,
    useAuthentication: true,
  })
);


export default getDataTypes;
