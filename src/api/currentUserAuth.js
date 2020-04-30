import { makeMockRequest, METHODS } from '@entando/apimanager';
import { USER_AUTH_PAYLOAD_OK } from 'test/mocks/currentUserAuth';

// eslint-disable-next-line import/prefer-default-export
export const getCurrentUserAuth = () => (
  makeMockRequest({
    uri: '/api/myAuthorities',
    method: METHODS.GET,
    mockResponse: USER_AUTH_PAYLOAD_OK,
    useAuthentication: true,
  })
);
