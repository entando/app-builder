import { USER_OK } from 'test/mocks/user';
import { makeMockRequest, METHODS } from 'api/apiManager';

export const getUser = params => makeMockRequest({
  uri: `/users/${params}`,
  method: METHODS.GET,
  mockResponse: USER_OK,
});

export const putUser = user => makeMockRequest({
  uri: '/users/',
  method: METHODS.PUT,
  mockResponse: USER_OK,
  body: user,
});
