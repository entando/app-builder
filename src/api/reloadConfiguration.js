import { makeRequest, METHODS } from '@entando/apimanager';
import { SUCCESS } from 'test/mocks/reloadConfiguration';

export const reloadConf = () => (
  makeRequest({
    uri: '/api/reloadConfiguration',
    method: METHODS.POST,
    mockResponse: SUCCESS,
    body: {},
    useAuthentication: true,
  })
);


export default reloadConf;
