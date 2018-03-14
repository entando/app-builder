import { makeRequest, METHODS } from 'api/apiManager';
import { BODY_OK } from 'test/mocks/login';

export const getErrors = (username, password) => (
  (username === 'admin' && password === 'adminadmin') ?
    [] :
    [{ code: 1, message: 'invalid credentials' }]
);

const login = (username, password) => makeRequest({
  uri: '/OAuth2/access_token',
  method: METHODS.POST,
  mockResponse: BODY_OK,
  contentType: 'application/x-www-form-urlencoded',
  body: {
    username,
    password,
    grant_type: 'password',
    client_id: true,
    client_secret: true,
  },
  errors: () => getErrors(username, password),
});

export default login;
