import { makeRequest, METHODS } from '@entando/apimanager';
// eslint-disable-next-line import/no-unresolved, import/extensions
import { SUCCESS, STATUS_RESPONSE } from 'test/mocks/reloadConfiguration';

export const reloadConf = () => (
  makeRequest({
    uri: '/api/reloadConfiguration',
    method: METHODS.POST,
    mockResponse: SUCCESS,
    body: {},
    useAuthentication: true,
  })
);

export const getReloadStatus = () => (
  makeRequest({
    uri: '/api/reloadConfiguration/status',
    method: METHODS.GET,
    mockResponse: STATUS_RESPONSE,
    useAuthentication: true,
  })
);

export default reloadConf;
