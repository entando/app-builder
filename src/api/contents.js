import { makeRequest, METHODS } from '@entando/apimanager';
import { MOCK_CONTENTS_STATUS, RESPONSE_CONTENTS_OK, RESPONSE_SINGLE_CONTENT } from 'test/mocks/contents';
import { MODE_LIST } from 'state/contents/const';

const contentsPath = '/api/plugins/cms/contents';

export const getContents = (page, params = '', mode = MODE_LIST) => makeRequest({
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

export const getContentsStatus = () => makeRequest({
  uri: `${contentsPath}/status`,
  method: METHODS.GET,
  contentType: 'application/json',
  mockResponse: MOCK_CONTENTS_STATUS,
  useAuthentication: true,
});
