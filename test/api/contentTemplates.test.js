import { configEnzymeAdapter } from 'test/legacyTestUtils';

import { getContentTemplates } from 'api/contentTemplates';
import { makeRequest } from '@entando/apimanager';
import { GET_CONTENT_TEMPLATES_RESPONSE_OK } from 'test/mocks/contentTemplate';

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
});
