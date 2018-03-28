import 'test/enzyme-init';
import { getUsers } from 'api/users';
import { USERS_OK } from 'test/mocks/users';

import { makeRequest, METHODS } from 'api/apiManager';

const correctRequest = {
  uri: '/api/users',
  method: METHODS.GET,
  mockResponse: USERS_OK.payload,
  useAuthentication: true,
  errors: expect.any(Function),
};
jest.mock('api/apiManager', () => ({
  makeRequest: jest.fn(() => new Promise(resolve => resolve({}))),
  METHODS: { GET: 'GET', POST: 'POST', PUT: 'PUT' },
}));

jest.unmock('api/users');

describe('api/users', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getUsers', () => {
    it('returns a promise', () => {
      expect(getUsers()).toBeInstanceOf(Promise);
    });

    it('get user page 1 as first page', () => {
      getUsers({ page: 1, pageSize: 10 });
      expect(makeRequest).toHaveBeenCalledWith(
        correctRequest,
        {
          page: 1,
          pageSize: 10,
        },
      );
    });
  });
});
