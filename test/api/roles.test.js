import 'test/enzyme-init';
import { getRoles, postRoles, getRole, putRole, deleteRole, getUserReferences, filterMockList } from 'api/roles';
import { makeRequest, METHODS } from 'api/apiManager';
import { LIST_ROLES_OK, BODY_OK, ROLE_USER_REFERENCES_PAYLOAD } from 'test/mocks/roles';

jest.unmock('api/roles');

jest.mock('api/apiManager', () => ({
  makeRequest: jest.fn(() => new Promise(resolve => resolve({}))),
  METHODS: require.requireActual('api/apiManager').METHODS,
}));

const EDITED_ROLE = {
  code: LIST_ROLES_OK[0].code,
  name: 'new_role_name',
};

const ROLE_CODE = LIST_ROLES_OK[0].code;

beforeEach(jest.clearAllMocks);
describe('api/roles', () => {
  describe('getRoles', () => {
    it('returns a promise', () => {
      expect(getRoles()).toBeInstanceOf(Promise);
    });

    it('has default paging', () => {
      getRoles();
      expect(makeRequest).toHaveBeenCalledWith(
        expect.objectContaining({
          uri: '/api/roles',
          method: METHODS.GET,
          useAuthentication: true,
        }),
        {
          page: 1,
          pageSize: 10,
        },
      );
    });

    it('resolves with a paged page models list', () => {
      getRoles({ page: 2, pageSize: 20 });
      expect(makeRequest).toHaveBeenCalledWith(
        expect.objectContaining({
          uri: '/api/roles',
          method: METHODS.GET,
          useAuthentication: true,
        }),
        {
          page: 2,
          pageSize: 20,
        },
      );
    });
  });

  describe('getRole()', () => {
    it('returns a promise', () => {
      expect(getRole(ROLE_CODE)).toBeInstanceOf(Promise);
    });

    it('if successful, returns a mock ok response', () => {
      getRole(ROLE_CODE);
      expect(makeRequest).toHaveBeenCalledWith(expect.objectContaining({
        uri: `/api/roles/${ROLE_CODE}`,
        method: METHODS.GET,
        useAuthentication: true,
      }));
    });
  });

  describe('postRoles()', () => {
    it('if successful, returns a mock ok response', () => {
      expect(postRoles(BODY_OK)).toBeInstanceOf(Promise);
    });

    it('if successful, returns a mock ok response', () => {
      postRoles(BODY_OK);
      expect(makeRequest).toHaveBeenCalledWith(expect.objectContaining({
        uri: '/api/roles',
        method: METHODS.POST,
        useAuthentication: true,
      }));
    });
  });

  describe('putRole()', () => {
    it('returns a promise', () => {
      expect(putRole(EDITED_ROLE)).toBeInstanceOf(Promise);
    });

    it('if successful, returns a mock ok response', () => {
      putRole(EDITED_ROLE);
      expect(makeRequest).toHaveBeenCalledWith(expect.objectContaining({
        uri: `/api/roles/${EDITED_ROLE.code}`,
        method: METHODS.PUT,
        body: EDITED_ROLE,
      }));
    });
  });

  describe('deleteRole()', () => {
    it('returns a promise', () => {
      expect(deleteRole(ROLE_CODE)).toBeInstanceOf(Promise);
    });

    it('if successful, returns a mock ok response', () => {
      deleteRole(ROLE_CODE);
      expect(makeRequest).toHaveBeenCalledWith(expect.objectContaining({
        uri: `/api/roles/${ROLE_CODE}`,
        method: METHODS.DELETE,
        useAuthentication: true,
      }));
    });
  });

  describe('getUserReferences()', () => {
    it('returns a promise', () => {
      expect(getUserReferences(ROLE_CODE)).toBeInstanceOf(Promise);
    });

    it('if successful, returns a mock ok response', () => {
      getUserReferences(ROLE_CODE);
      expect(makeRequest).toHaveBeenCalledWith(
        expect.objectContaining({
          uri: `/api/roles/${ROLE_CODE}/userreferences`,
          method: METHODS.GET,
          mockResponse: ROLE_USER_REFERENCES_PAYLOAD,
          useAuthentication: true,
        }),
        {
          page: 1,
          pageSize: 10,
        },
      );
    });
  });

  describe('util filterMockList', () => {
    it('if role is not into roles list, return void object', () => {
      expect(filterMockList('xxx')).toEqual({});
    });
  });
});
