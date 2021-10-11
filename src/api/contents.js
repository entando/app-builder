import { makeRequest, METHODS } from '@entando/apimanager';
import {
  MOCK_CONTENTS_STATUS,
  RESPONSE_CONTENTS_OK, RESPONSE_DELETE_OK, RESPONSE_PUBLISH_OK, RESPONSE_SINGLE_CONTENT,
} from 'test/mocks/contents';

const contentsPath = '/api/plugins/cms/contents';

export const getContents = (page, params = '', mode = 'list') => makeRequest({
  uri: `${contentsPath}${params}${params ? '&' : '?'}mode=${mode}`,
  method: METHODS.GET,
  contentType: 'application/json',
  mockResponse: RESPONSE_CONTENTS_OK,
  useAuthentication: true,
}, page);

export const getContentById = id => makeRequest({
  uri: `${contentsPath}/${id}`,
  method: METHODS.GET,
  contentType: 'application/json',
  mockResponse: RESPONSE_SINGLE_CONTENT,
  useAuthentication: true,
});

export const deleteContent = id => makeRequest({
  uri: `${contentsPath}/${id}`,
  method: METHODS.DELETE,
  contentType: 'application/json',
  mockResponse: RESPONSE_DELETE_OK,
  useAuthentication: true,
});

export const publishContent = (id, status) => makeRequest({
  uri: `${contentsPath}/${id}/status`,
  method: METHODS.PUT,
  contentType: 'application/json',
  mockResponse: RESPONSE_PUBLISH_OK,
  useAuthentication: true,
  body: { status },
});

export const publishMultipleContents = (contentIds, status) => makeRequest({
  uri: `${contentsPath}/status`,
  method: METHODS.PUT,
  contentType: 'application/json',
  mockResponse: RESPONSE_PUBLISH_OK,
  useAuthentication: true,
  body: { codes: contentIds, status },
});

export const updateContents = contents => makeRequest({
  uri: `${contentsPath}`,
  method: METHODS.PUT,
  contentType: 'application/json',
  mockResponse: RESPONSE_PUBLISH_OK,
  useAuthentication: true,
  body: contents,
});

export const getContentsStatus = () => makeRequest({
  uri: `${contentsPath}/status`,
  method: METHODS.GET,
  contentType: 'application/json',
  mockResponse: MOCK_CONTENTS_STATUS,
  useAuthentication: true,
});

export const cloneContent = content => makeRequest({
  uri: `${contentsPath}/${content}/clone`,
  method: METHODS.POST,
  contentType: 'application/json',
  mockResponse: RESPONSE_PUBLISH_OK,
  useAuthentication: true,
  body: {},
});
