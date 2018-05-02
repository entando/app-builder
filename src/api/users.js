import { USER, USERS } from 'test/mocks/users';
import { makeRequest, METHODS } from '@entando/apimanager';

export const getUsers = (page = { page: 1, pageSize: 10 }, params = '') => (
  makeRequest(
    {
      uri: `/api/users${params}`,
      method: METHODS.GET,
      mockResponse: USERS,
      useAuthentication: true,
    },
    page,
  )
);

export const getUser = params => makeRequest({
  uri: `/api/users/${params}`,
  method: METHODS.GET,
  mockResponse: USER,
  useAuthentication: true,
});

export const postUser = user => makeRequest({
  uri: '/api/users/',
  method: METHODS.POST,
  body: user,
  mockResponse: user,
  useAuthentication: true,
});

export const putUser = user => makeRequest({
  uri: `/api/users/${user.username}`,
  method: METHODS.PUT,
  body: user,
  mockResponse: [],
  useAuthentication: true,
});

export const deleteUser = username => makeRequest({
  uri: `/api/users/${username}`,
  method: METHODS.DELETE,
  mockResponse: { code: username },
  useAuthentication: true,
});

export const postUserAuthorities = (username, authorities) => makeRequest({
  uri: `/api/users/${username}/authorities`,
  method: METHODS.POST,
  body: authorities,
  mockResponse: authorities,
  useAuthentication: true,
});

export const putUserAuthorities = (username, authorities) => makeRequest({
  uri: `/api/users/${username}/authorities`,
  method: METHODS.PUT,
  body: authorities,
  mockResponse: authorities,
  useAuthentication: true,
});

export default getUsers;
