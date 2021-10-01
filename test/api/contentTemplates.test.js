import { configEnzymeAdapter } from 'testutils/helpers';

import {
  getContentTemplates,
  postContentTemplate,
  getContentTemplate,
  putContentTemplate,
  deleteContentTemplate,
  getContentTemplateDictionary,
} from 'api/contentTemplates';
import { makeRequest } from '@entando/apimanager';
import { GET_CONTENT_TEMPLATES_RESPONSE_OK } from 'testutils/mocks/contentTemplate';

configEnzymeAdapter();

jest.unmock('api/contentTemplates');
jest.mock('@entando/apimanager', () => ({
  makeRequest: jest.fn(() => new Promise(resolve => resolve({}))),
  METHODS: {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    DELETE: 'DELETE',
  },
}));

describe('api/contentTemplates', () => {
  it('getContentTemplates returns a promise with correct params', () => {
    const response = getContentTemplates();
    expect(makeRequest).toHaveBeenCalledWith(
      {
        uri: '/api/plugins/cms/contentmodels',
        method: 'GET',
        mockResponse: GET_CONTENT_TEMPLATES_RESPONSE_OK,
        contentType: 'application/json',
        useAuthentication: true,
        errors: expect.any(Function),
      },
      { page: 1, pageSize: 10 },
    );
    expect(response).toBeInstanceOf(Promise);
  });

  it('getContentTemplates returns error', () => {
    makeRequest.mockImplementationOnce(jest.fn(({ errors }) => errors()));
    getContentTemplates();
    expect(makeRequest).toHaveBeenCalledWith(
      {
        uri: '/api/plugins/cms/contentmodels',
        method: 'GET',
        mockResponse: GET_CONTENT_TEMPLATES_RESPONSE_OK,
        contentType: 'application/json',
        useAuthentication: true,
        errors: expect.any(Function),
      },
      { page: 1, pageSize: 10 },
    );
  });

  it('postContentTemplate returns a promise with correct params', () => {
    const body = { a: 1, b: 2 };
    const response = postContentTemplate(body);
    expect(makeRequest).toHaveBeenCalledWith({
      uri: '/api/plugins/cms/contentmodels',
      body,
      method: 'POST',
      mockResponse: GET_CONTENT_TEMPLATES_RESPONSE_OK[0],
      useAuthentication: true,
    });
    expect(response).toBeInstanceOf(Promise);
  });

  it('getContentTemplate returns a promise with correct params', () => {
    const response = getContentTemplate(1);
    expect(makeRequest).toHaveBeenCalledWith({
      uri: '/api/plugins/cms/contentmodels/1',
      method: 'GET',
      mockResponse: GET_CONTENT_TEMPLATES_RESPONSE_OK[0],
      contentType: 'application/json',
      useAuthentication: true,
    });
    expect(response).toBeInstanceOf(Promise);
  });

  it('putContentTemplate returns a promise with correct params', () => {
    const body = { id: 1, b: 2 };
    const response = putContentTemplate(body);
    expect(makeRequest).toHaveBeenCalledWith({
      uri: '/api/plugins/cms/contentmodels/1',
      body,
      method: 'PUT',
      mockResponse: GET_CONTENT_TEMPLATES_RESPONSE_OK[0],
      useAuthentication: true,
    });
    expect(response).toBeInstanceOf(Promise);
  });

  it('deleteContentTemplate returns a promise with correct params', () => {
    const response = deleteContentTemplate(1);
    expect(makeRequest).toHaveBeenCalledWith({
      uri: '/api/plugins/cms/contentmodels/1',
      method: 'DELETE',
      mockResponse: { code: '<contentTemplateId>' },
      useAuthentication: true,
    });
    expect(response).toBeInstanceOf(Promise);
  });

  it('getContentTemplateDictionary returns a promise with correct params', () => {
    const response = getContentTemplateDictionary();
    expect(makeRequest).toHaveBeenCalledWith(
      {
        uri: '/api/plugins/cms/contentmodels/dictionary',
        method: 'GET',
        mockResponse: GET_CONTENT_TEMPLATES_RESPONSE_OK,
        useAuthentication: true,
        errors: expect.any(Function),
      },
    );
    expect(response).toBeInstanceOf(Promise);
  });
});
