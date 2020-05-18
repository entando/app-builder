import { makeRequest, METHODS } from '@entando/apimanager';
import { USER_AUTH_PAYLOAD_OK } from 'test/mocks/currentUserAuth';

// eslint-disable-next-line import/prefer-default-export
export const getCurrentUserAuth = () => (
  makeRequest({
    uri: '/api/users/userProfiles/myGroupPermissions',
    method: METHODS.GET,
    mockResponse: USER_AUTH_PAYLOAD_OK,
    useAuthentication: true,
  })
);
