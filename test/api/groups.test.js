import 'test/enzyme-init';
import { getGroups, postGroup, putGroup, getGroup } from 'api/groups';
import { makeMockRequest, METHODS } from 'api/apiManager';
import { LIST_GROUPS_OK, BODY_OK } from 'test/mocks/groups';


const correctRequest = {
  uri: '/api/groups',
  method: METHODS.GET,
  mockResponse: LIST_GROUPS_OK,
  useAuthentication: true,
};

const GROUP_CODE = 'group_code';
const EDITED_GROUP = {
  code: LIST_GROUPS_OK[0].code,
  name: 'new_group_name',
};

jest.unmock('api/groups');
jest.mock('api/apiManager', () => ({
  makeMockRequest: jest.fn(() => new Promise(resolve => resolve({}))),
  METHODS: { GET: 'GET', POST: 'POST', PUT: 'PUT' },
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

  describe('getGroup()', () => {
    it('returns a promise', () => {
      expect(getGroup(GROUP_CODE)).toBeInstanceOf(Promise);
    });

    it('if successful, returns a mock ok response', () => {
      getGroup(GROUP_CODE);
      expect(makeMockRequest).toHaveBeenCalledWith({
        ...correctRequest,
        uri: `/api/groups/${GROUP_CODE}`,
        mockResponse: {},
      });
    });
  });

  describe('postGroup()', () => {
    it('returns a promise', () => {
      expect(postGroup(BODY_OK)).toBeInstanceOf(Promise);
    });

    it('if successful, returns a mock ok response', () => {
      postGroup(BODY_OK);
      expect(makeMockRequest).toHaveBeenCalledWith({
        ...correctRequest,
        method: 'POST',
        mockResponse: BODY_OK,
        body: BODY_OK,
      });
    });
  });

  describe('putGroup()', () => {
    it('returns a promise', () => {
      expect(putGroup(EDITED_GROUP)).toBeInstanceOf(Promise);
    });

    it('if successful, returns a mock ok response', () => {
      putGroup(EDITED_GROUP);
      expect(makeMockRequest).toHaveBeenCalledWith({
        ...correctRequest,
        uri: `/api/groups/${EDITED_GROUP.code}`,
        method: 'PUT',
        mockResponse: BODY_OK,
        body: EDITED_GROUP,
      });
    });
  });
});
