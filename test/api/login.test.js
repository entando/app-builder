
import 'test/enzyme-init';

import login from 'api/login';
import { makeRequest } from '@entando/apimanager';
import { BODY_OK } from 'test/mocks/login';

jest.unmock('api/login');
jest.mock('@entando/apimanager', () => ({
  makeRequest: jest.fn(() => new Promise(resolve => resolve({}))),
  METHODS: { POST: 'POST' },
}));

describe('api/login', () => {
  it('returns a promise', () => {
    const response = login('gianni', 'moi');
    expect(makeRequest).toHaveBeenCalledWith({
      uri: '/oauth/token',
      method: 'POST',
      mockResponse: BODY_OK,
      contentType: 'application/x-www-form-urlencoded',
      headers: {
        Authorization: 'Basic dW5kZWZpbmVkOnVuZGVmaW5lZA==',
      },
      body: {
        username: 'gianni',
        password: 'moi',
        grant_type: 'password',
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
      },
      errors: expect.any(Function),
    });
    expect(response).toBeInstanceOf(Promise);
  });
});
