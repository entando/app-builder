import { USER_OK } from 'test/mocks/user';
import { makeRequest, METHODS } from 'api/apiManager';
import throttle from 'util/throttle';

export const getUser = params => new Promise((resolve) => {
  if (params) {
    console.info(`calling API /user/${params}`);
  }
  throttle(resolve(USER_OK));
});

export const putUser = user => makeRequest({
  uri: '/users/',
  method: METHODS.PUT,
  mockResponse: USER_OK,
  body: {
    username: user.username,
    password: user.password,
    status: user.status,
    reset: user.reset,
  },
});
