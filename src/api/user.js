import { USER_OK } from 'test/mocks/user';
import { makeRequest, METHODS } from 'api/apiManager';

export const getUser = (params) => {
  if (params) {
    console.info(`calling API /user/${params}`);
  }
  return makeRequest({
    uri: '/users/',
    method: METHODS.GET,
    mockResponse: USER_OK,
  });
};

export const putUser = user => makeRequest({
  uri: '/users/',
  method: METHODS.PUT,
  mockResponse: USER_OK,
  body: user,
});
