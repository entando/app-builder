import { makeRequest, METHODS } from '@entando/apimanager';
import { BODY_OK } from 'test/mocks/login';

export const getErrors = (username, password) => (
  (username === 'admin' && password === 'adminadmin') ?
    [] :
    [{ code: 1, message: 'invalid credentials' }]
);

const login = (username, password) => makeRequest({
  uri: '/oauth/token',
  method: METHODS.POST,
  mockResponse: BODY_OK,
  contentType: 'application/x-www-form-urlencoded',
  headers: {
    Authorization: `Basic ${btoa(`${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`)}`,
  },
  body: {
    username,
    password,
    grant_type: 'password',
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET,
  },
  errors: () => getErrors(username, password),
});

export default login;
