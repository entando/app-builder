import { makeRequest, METHODS } from '@entando/apimanager';
import { GET_ASSETS_RESPONSE_OK } from 'test/mocks/assets';

const getAssetsPath = '/api/plugins/cms/assets';

export const getAssets = (page = { page: 1, pageSize: 10 }, params = '') => makeRequest(
  {
    uri: `${getAssetsPath}${params}`,
    method: METHODS.GET,
    contentType: 'application/json',
    mockResponse: GET_ASSETS_RESPONSE_OK,
    useAuthentication: true,
  },
  page,
);

export const createAsset = (file, params = '') => makeRequest({
  uri: `${getAssetsPath}/${params}`,
  body: file,
  method: METHODS.POST,
  contentType: 'multipart/form-data',
  mockResponse: GET_ASSETS_RESPONSE_OK,
  useAuthentication: true,
});

export const editAsset = (id, file, params = '') => makeRequest({
  uri: `${getAssetsPath}/${id}${params}`,
  body: file,
  method: METHODS.POST,
  contentType: 'multipart/form-data',
  mockResponse: GET_ASSETS_RESPONSE_OK,
  useAuthentication: true,
});

export const deleteAsset = id => makeRequest({
  uri: `${getAssetsPath}/${id}`,
  method: METHODS.DELETE,
  contentType: 'application/json',
  mockResponse: GET_ASSETS_RESPONSE_OK,
  useAuthentication: true,
});

export const cloneAsset = id => makeRequest({
  uri: `${getAssetsPath}/${id}/clone`,
  method: METHODS.POST,
  body: {},
  contentType: 'application/json',
  mockResponse: GET_ASSETS_RESPONSE_OK,
  useAuthentication: true,
});
