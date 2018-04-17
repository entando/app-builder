import { USERS_OK, USER_PROFILE_MOCK } from 'test/mocks/users';
import { makeRequest, METHODS } from '@entando/apimanager';

const getGenericError = obj => (
  obj || obj === '' ? [] : [{ code: 1, message: 'object is invalid' }]
);

export const getUsers = (page = { page: 1, pageSize: 10 }, params = '') => (
  makeRequest(
    {
      uri: `/api/users${params}`,
      method: METHODS.GET,
      mockResponse: USERS_OK.payload,
      useAuthentication: true,
      errors: () => getGenericError(params),
    },
    page,
  )
);

const getErrors = username => (
  USER_PROFILE_MOCK[username] ? [] : [
    { code: 1, message: 'user not found' },
  ]
);

export const getUserDetail = username => makeRequest({
  uri: `/api/users/${username}`,
  method: METHODS.GET,
  mockResponse: USER_PROFILE_MOCK[username],
  useAuthentication: true,
  errors: () => getErrors(username),
});

export const getUser = params => makeRequest({
  uri: `/api/users/${params}`,
  method: METHODS.GET,
  mockResponse: USERS_OK,
  useAuthentication: true,
});

export const putUser = user => makeRequest({
  uri: `/api/users/${user.username}`,
  method: METHODS.PUT,
  body: user,
  mockResponse: [],
  useAuthentication: true,
});

export default getUsers;
