import { makeRequest, METHODS } from '@entando/apimanager';
import { DATA_MODELS } from 'test/mocks/dataModels';

const getGenericError = obj => (obj || (obj === '') ? [] : [{ code: 1, message: 'object is invalid' }]);

export const getDataModels = (page = { page: 1, pageSize: 10 }, params = '') => (
  makeRequest(
    {
      uri: `/api/dataModels${params}`,
      method: METHODS.GET,
      mockResponse: DATA_MODELS.payload,
      useAuthentication: true,
      errors: () => getGenericError(params),
    },
    page,
  )
);

export const postDataModels = data => (
  makeRequest({
    uri: '/api/dataModels',
    method: METHODS.POST,
    mockResponse: {},
    body: data,
    useAuthentication: true,
  })
);

export default getDataModels;
