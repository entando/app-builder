import 'test/enzyme-init';
import { getUsers, getUser, putUser } from 'api/users';
import { USERS_OK, ERROR } from 'test/mocks/users';

import { makeRequest, METHODS } from '@entando/apimanager';

const correctRequest = {
  uri: '/api/users',
  method: METHODS.GET,
  mockResponse: USERS_OK.payload,
  useAuthentication: true,
  errors: expect.any(Function),
};
jest.mock('@entando/apimanager', () => ({
  makeRequest: jest.fn(() => new Promise(resolve => resolve({}))),
  METHODS: { GET: 'GET', POST: 'POST', PUT: 'PUT' },
}));

jest.unmock('api/users');

const USER = {
  username: 'login',
  registration: '2018-01-08 00:00:00',
  lastLogin: '2018-01-08 00:00:00',
  lastPasswordChange: '2018-01-08 00:00:00',
  status: 'active',
};

const USERS_BAD = {
  payload: [],
};
const USER_BAD = {
  payload: [],
};

describe('api/users', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getUsers', () => {
    it('returns a promise', () => {
      expect(getUsers()).toBeInstanceOf(Promise);
    });

    it('et an error response with wrong users payload', () => {
      getUsers(USERS_BAD).then(() => {}, (error) => {
        expect(error).toEqual(ERROR);
      });
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
describe('api/users', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getUser', () => {
    it('returns a promise', () => {
      expect(getUser()).toBeInstanceOf(Promise);
    });

    it('get an error response with wrog user payload', () => {
      getUser(USER_BAD).then(() => {}, (error) => {
        expect(error).toEqual(ERROR);
      });
    });
  });
});
describe('putUser', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it('returns a promise', () => {
    expect(putUser(USER)).toBeInstanceOf(Promise);
  });

  it('makes the correct request with user body', () => {
    putUser(USER);
    expect(makeRequest).toHaveBeenCalledWith(expect.objectContaining({
      method: METHODS.PUT,
      uri: `/api/users/${USER.username}`,
      body: USER,
      useAuthentication: true,

    }));
  });
});
