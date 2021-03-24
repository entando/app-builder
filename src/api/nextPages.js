
import { makeMockRequest, METHODS } from '@entando/apimanager';
import { FILE_TREE_RESPONSE, GET_FILE_RESPONSE, RESPONSE_SUCCESS } from 'test/mocks/nextPages';

const NEXT_SERVICE_API = 'https://d24e9033-e789-49ec-ab90-71359a6f3c99.mock.pstmn.io';

export const getNextFileTree = (maxDepth = 0, params = '') => (
  makeMockRequest({
    uri: `${NEXT_SERVICE_API}/api/nxfs/browse/maxdepth=${maxDepth}${params}`,
    method: METHODS.GET,
    mockResponse: FILE_TREE_RESPONSE,
    // useAuthentication: true,
  }, { page: 1, pageSize: 100 })
);

export const getNextFile = filePath => (
  makeMockRequest({
    uri: `${NEXT_SERVICE_API}/api/nxfs/objects/${filePath}`,
    method: METHODS.GET,
    mockResponse: GET_FILE_RESPONSE,
    // useAuthentication: true,
  })
);

export const putNextFile = fileObject => (
  makeMockRequest({
    uri: `${NEXT_SERVICE_API}/api/nxfs/objects/${fileObject.path}`,
    method: METHODS.PUT,
    body: fileObject,
    mockResponse: RESPONSE_SUCCESS,
    // useAuthentication: true,
  })
);

export const deleteNextFile = filePath => (
  makeMockRequest({
    uri: `${NEXT_SERVICE_API}/api/nxfs/objects/${filePath}`,
    method: METHODS.DELETE,
    mockResponse: RESPONSE_SUCCESS,
    // useAuthentication: true,
  })
);

export const publishNextFile = filePath => (
  makeMockRequest({
    uri: `${NEXT_SERVICE_API}/api/nxfs/objects/${filePath}/publish`,
    method: METHODS.POST,
    mockResponse: RESPONSE_SUCCESS,
    // useAuthentication: true,
  })
);
