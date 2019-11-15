import { makeRequest, METHODS } from '@entando/apimanager';
import { GET_CONTENT_MODELS_RESPONSE_OK } from 'test/mocks/contentModel';

const contentModelsPath = '/api/plugins/cms/contentmodels';

// eslint-disable-next-line import/prefer-default-export
export const getContentModels = (page = { page: 1, pageSize: 10 }, params = '') => makeRequest(
  {
    uri: `${contentModelsPath}${params}`,
    method: METHODS.GET,
    mockResponse: GET_CONTENT_MODELS_RESPONSE_OK,
    contentType: 'application/json',
    useAuthentication: true,
    errors: () => [],
  },
  page,
);
