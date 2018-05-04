import 'test/enzyme-init';
import { getUsers, getUser, postUser, putUser, deleteUser } from 'api/users';
import { USER, USERS, ERROR } from 'test/mocks/users';

import { makeRequest, METHODS } from '@entando/apimanager';

const correctRequest = {
  uri: '/api/users',
  method: METHODS.GET,
  mockResponse: USERS,
  useAuthentication: true,
};
jest.mock('@entando/apimanager', () => ({
  makeRequest: jest.fn(() => new Promise(resolve => resolve({}))),
  METHODS: { GET: 'GET', POST: 'POST', PUT: 'PUT' },
}));

jest.unmock('api/users');

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
describe('postUser', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it('returns a promise', () => {
    expect(postUser(USER)).toBeInstanceOf(Promise);
  });

  it('makes the correct request with user body', () => {
    postUser(USER);
    expect(makeRequest).toHaveBeenCalledWith(expect.objectContaining({
      method: METHODS.POST,
      uri: '/api/users/',
      body: USER,
      mockResponse: USER,
      useAuthentication: true,

    }));
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

describe('deleteUser', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it('returns a promise', () => {
    expect(deleteUser(USER.username)).toBeInstanceOf(Promise);
  });

  it('makes the correct request with user body', () => {
    deleteUser(USER.username);
    expect(makeRequest).toHaveBeenCalledWith(expect.objectContaining({
      uri: `/api/users/${USER.username}`,
      method: METHODS.DELETE,
      mockResponse: { code: `${USER.username}` },
      useAuthentication: true,

    }));
  });
});
