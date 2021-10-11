import { makeRequest, METHODS } from '@entando/apimanager';
import { GET_CONTENT_TEMPLATES_RESPONSE_OK } from 'test/mocks/contentTemplate';

const contentTemplatesPath = '/api/plugins/cms/contentmodels';

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

export const getContentTemplateDictionary = () => (
  makeRequest({
    uri: `${contentTemplatesPath}/dictionary`,
    method: METHODS.GET,
    mockResponse: GET_CONTENT_TEMPLATES_RESPONSE_OK,
    useAuthentication: true,
    errors: () => [],
  })
);

export const postContentTemplate = contModelObject => makeRequest({
  uri: contentTemplatesPath,
  body: contModelObject,
  method: METHODS.POST,
  mockResponse: GET_CONTENT_TEMPLATES_RESPONSE_OK[0],
  useAuthentication: true,
});

export const getContentTemplate = id => makeRequest({
  uri: `${contentTemplatesPath}/${id}`,
  method: METHODS.GET,
  mockResponse: GET_CONTENT_TEMPLATES_RESPONSE_OK[0],
  contentType: 'application/json',
  useAuthentication: true,
});

export const putContentTemplate = contModelObject => makeRequest({
  uri: `${contentTemplatesPath}/${contModelObject.id}`,
  body: contModelObject,
  method: METHODS.PUT,
  mockResponse: GET_CONTENT_TEMPLATES_RESPONSE_OK[0],
  useAuthentication: true,
});

export const deleteContentTemplate = id => makeRequest({
  uri: `${contentTemplatesPath}/${id}`,
  method: METHODS.DELETE,
  mockResponse: { code: '<contentTemplateId>' },
  useAuthentication: true,
});
