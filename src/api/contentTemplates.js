import { makeRequest, METHODS } from '@entando/apimanager';
import { GET_CONTENT_TEMPLATES_RESPONSE_OK } from 'test/mocks/contentTemplate';

const contentTemplatesPath = '/api/plugins/cms/contentmodels';

// eslint-disable-next-line import/prefer-default-export
export const getContentTemplates = (page = { page: 1, pageSize: 10 }, params = '') => makeRequest(
  {
    uri: `${contentTemplatesPath}${params}`,
    method: METHODS.GET,
    mockResponse: GET_CONTENT_TEMPLATES_RESPONSE_OK,
    contentType: 'application/json',
    useAuthentication: true,
    errors: () => [],
  },
  page,
);
