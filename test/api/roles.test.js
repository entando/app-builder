import 'test/enzyme-init';
import { getRoles, postRoles } from 'api/roles';
import { makeMockRequest, METHODS } from 'api/apiManager';
import { LIST_ROLES_OK, GROUP_PAYLOAD } from 'test/mocks/roles';


const correctRequest = {
  uri: '/api/roles',
  method: METHODS.GET,
  mockResponse: LIST_ROLES_OK,
  useAuthentication: true,
};

jest.unmock('api/roles');
jest.mock('api/apiManager', () => ({
  makeMockRequest: jest.fn(() => new Promise(resolve => resolve({}))),
  METHODS: { GET: 'GET', POST: 'POST' },
}));

describe('api/roles', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getRoles', () => {
    it('returns a promise', () => {
      expect(getRoles()).toBeInstanceOf(Promise);
    });

    it('get role page 1 by default', () => {
      getRoles();
      expect(makeMockRequest).toHaveBeenCalledWith(
        correctRequest,
        {
          page: 1,
          pageSize: 10,
        },
      );
    });

    it('request page 2', () => {
      getRoles({ page: 2, pageSize: 10 });
      expect(makeMockRequest).toHaveBeenCalledWith(
        correctRequest,
        {
          page: 2,
          pageSize: 10,
        },
      );
    });

    it('request different page size', () => {
      getRoles({ page: 1, pageSize: 5 });
      expect(makeMockRequest).toHaveBeenCalledWith(
        correctRequest,
        {
          page: 1,
          pageSize: 5,
        },
      );
    });

    it('makes the request with additional params', () => {
      getRoles({ page: 1, pageSize: 10 }, '?param=true');
      expect(makeMockRequest).toHaveBeenCalledWith(
        {
          ...correctRequest,
          uri: '/api/roles?param=true',
        },
        {
          page: 1,
          pageSize: 10,
        },
      );
    });
  });

  describe('postRoles()', () => {
    it('if successful, returns a mock ok response', () => {
      expect(postRoles(GROUP_PAYLOAD)).resolves.toEqual({ payload: GROUP_PAYLOAD });
    });
  });
});
