
import { makeRequest, METHODS } from 'api/apiManager';
import { LABELS_LIST } from 'test/mocks/labels';

export const getLabels = (page = { page: 1, pageSize: 10 }, params = '') => (
  makeRequest(
    {
      uri: `/api/labels${params}`,
      method: METHODS.GET,
      mockResponse: LABELS_LIST,
      useAuthentication: true,
    },
    page,
  )
);

export const postLabel = labelObj => (
  makeRequest({
    uri: '/api/labels',
    method: METHODS.POST,
    body: labelObj,
    mockResponse: { ...labelObj },
    useAuthentication: true,
  })
);

export const putLabel = labelObj => (
  makeRequest({
    uri: `/api/labels/${labelObj.key}`,
    method: METHODS.PUT,
    body: labelObj,
    mockResponse: { ...labelObj },
    useAuthentication: true,
  })
);

export const deleteLabel = labelKey => (
  makeRequest({
    uri: `/api/labels/${labelKey}`,
    method: METHODS.DELETE,
    mockResponse: {},
    useAuthentication: true,
  })
);
