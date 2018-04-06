import { DATA_TYPES_OK_PAGE_1 } from 'test/mocks/dataTypes';
import { makeRequest, METHODS } from 'api/apiManager';

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


export default getDataTypes;
