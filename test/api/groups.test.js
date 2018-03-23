import 'test/enzyme-init';
import { getGroups, postGroup } from 'api/groups';
import { makeMockRequest, METHODS } from 'api/apiManager';
import { LIST_GROUPS_OK, GROUP_PAYLOAD } from 'test/mocks/groups';


const correctRequest = {
  uri: '/api/groups',
  method: METHODS.GET,
  mockResponse: LIST_GROUPS_OK,
  useAuthentication: true,
};

jest.unmock('api/groups');
jest.mock('api/apiManager', () => ({
  makeMockRequest: jest.fn(() => new Promise(resolve => resolve({}))),
  METHODS: { GET: 'GET', POST: 'POST' },
}));

describe('api/groups', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getGroups', () => {
    it('returns a promise', () => {
      expect(getGroups()).toBeInstanceOf(Promise);
    });

    it('get group page 1 by default', () => {
      getGroups({ page: 1, pageSize: 10 });
      expect(makeMockRequest).toHaveBeenCalledWith(
        correctRequest,
        {
          page: 1,
          pageSize: 10,
        },
      );
    });

    it('request page 2', () => {
      getGroups({ page: 2, pageSize: 10 });
      expect(makeMockRequest).toHaveBeenCalledWith(
        correctRequest,
        {
          page: 2,
          pageSize: 10,
        },
      );
    });

    it('request different page size', () => {
      getGroups({ page: 1, pageSize: 5 });
      expect(makeMockRequest).toHaveBeenCalledWith(
        correctRequest,
        {
          page: 1,
          pageSize: 5,
        },
      );
    });

    it('makes the request with additional params', () => {
      getGroups({ page: 1, pageSize: 10 }, '?param=true');
      expect(makeMockRequest).toHaveBeenCalledWith(
        {
          ...correctRequest,
          uri: '/api/groups?param=true',
        },
        {
          page: 1,
          pageSize: 10,
        },
      );
    });
  });

  describe('postGroup()', () => {
    it('if successful, returns a mock ok response', () => {
      expect(postGroup(GROUP_PAYLOAD)).resolves.toEqual({ payload: GROUP_PAYLOAD });
    });
  });
});
