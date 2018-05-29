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

export const getDataModel = dataModelId => (
  makeRequest({
    uri: `/api/dataModels/${dataModelId}`,
    method: METHODS.GET,
    mockResponse: {},
    useAuthentication: true,
  })
);

export const postDataModel = data => (
  makeRequest({
    uri: '/api/dataModels',
    method: METHODS.POST,
    mockResponse: {},
    body: data,
    useAuthentication: true,
  })
);

export const putDataModel = data => (
  makeRequest({
    uri: `/api/dataModels/${data.modelId}`,
    method: METHODS.PUT,
    mockResponse: {},
    body: data,
    useAuthentication: true,
  })
);

export default getDataModels;
