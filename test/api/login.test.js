
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
      uri: '/OAuth2/access_token',
      method: 'POST',
      mockResponse: BODY_OK,
      contentType: 'application/x-www-form-urlencoded',
      body: {
        username: 'gianni',
        password: 'moi',
        grant_type: 'password',
        client_id: true,
        client_secret: true,
      },
      errors: expect.any(Function),
    });
    expect(response).toBeInstanceOf(Promise);
  });
});
