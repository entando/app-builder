import { makeRequest, METHODS } from '@entando/apimanager';

export const getContent = id =>
  makeRequest({
    uri: `/api/plugins/cms/contents/${id}`,
    method: METHODS.GET,
    mockResponse: {},
    contentType: 'application/json',
    useAuthentication: true,
    errors: () => [],
  });

export const getContents = (page, params = '') =>
  makeRequest(
    {
      uri: `/api/plugins/cms/contents${params}`,
      method: METHODS.GET,
      mockResponse: [],
      contentType: 'application/json',
      useAuthentication: true,
      errors: () => [],
    },
    page,
  );
