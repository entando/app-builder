import { makeRequest, METHODS } from '@entando/apimanager';
import { GET_CATEGORIES_RESPONSE_OK } from 'test/mocks/contentType';

import { GET_CONTENT_RESPONSE_OK, POST_CONTENT_ADD_RESPONSE_OK } from 'test/mocks/editContent';

const getContentPath = '/api/plugins/cms/contents';
const getCategoriesPath = '/api/categories';

export const getContent = (params = '') => makeRequest({
  uri: `${getContentPath}${params}`,
  method: METHODS.GET,
  contentType: 'application/json',
  mockResponse: GET_CONTENT_RESPONSE_OK,
  useAuthentication: true,
});

export const getCategories = (params = '') => makeRequest({
  uri: `${getCategoriesPath}${params}`,
  method: METHODS.GET,
  contentType: 'application/json',
  mockResponse: GET_CATEGORIES_RESPONSE_OK,
  useAuthentication: true,
});

export const postAddContent = addContentObject => makeRequest({
  uri: getContentPath,
  body: [addContentObject],
  contentType: 'application/json',
  method: METHODS.POST,
  mockResponse: POST_CONTENT_ADD_RESPONSE_OK,
  useAuthentication: true,
});

export const putUpdateContent = (id, editContentObject) => makeRequest({
  uri: `${getContentPath}/${id}`,
  body: editContentObject,
  contentType: 'application/json',
  method: METHODS.PUT,
  mockResponse: POST_CONTENT_ADD_RESPONSE_OK,
  useAuthentication: true,
});
