import 'test/enzyme-init';
import {
  getGroups,
  postGroup,
  putGroup,
  getGroup,
  getReferences,
} from 'api/groups';
import { makeRequest, METHODS } from '@entando/apimanager';
import {
  MOCK_REFERENCES,
  LIST_GROUPS_OK,
  BODY_OK,
} from 'test/mocks/groups';


const correctRequest = {
  uri: '/api/groups',
  method: METHODS.GET,
  mockResponse: LIST_GROUPS_OK,
  useAuthentication: true,
  errors: expect.any(Function),
};

const GROUP_CODE = 'group_code';
const EDITED_GROUP = {
  code: LIST_GROUPS_OK[0].code,
  name: 'new_group_name',
};

jest.unmock('api/groups');
jest.mock('@entando/apimanager', () => ({
  makeRequest: jest.fn(() => new Promise(resolve => resolve({}))),
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
      expect(makeRequest).toHaveBeenCalledWith(
        correctRequest,
        {
          page: 1,
          pageSize: 10,
        },
      );
    });

    it('request page 2', () => {
      getGroups({ page: 2, pageSize: 10 });
      expect(makeRequest).toHaveBeenCalledWith(
        correctRequest,
        {
          page: 2,
          pageSize: 10,
        },
      );
    });

    it('request different page size', () => {
      getGroups({ page: 1, pageSize: 5 });
      expect(makeRequest).toHaveBeenCalledWith(
        correctRequest,
        {
          page: 1,
          pageSize: 5,
        },
      );
    });

    it('makes the request with additional params', () => {
      getGroups({ page: 1, pageSize: 10 }, '?param=true');
      expect(makeRequest).toHaveBeenCalledWith(
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
      expect(makeRequest).toHaveBeenCalledWith({
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
      expect(makeRequest).toHaveBeenCalledWith({
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
      expect(makeRequest).toHaveBeenCalledWith({
        ...correctRequest,
        uri: `/api/groups/${EDITED_GROUP.code}`,
        method: 'PUT',
        mockResponse: BODY_OK,
        body: EDITED_GROUP,
      });
    });
  });

  describe('getReferences', () => {
    it('returns a promise', () => {
      expect(getReferences({ page: 1, pageSize: 10 }, 'administrators', 'PageManager')).toBeInstanceOf(Promise);
    });

    it('makes the request with additional params', () => {
      const correctRequestPageReferences = {
        uri: '/api/groups/administrators/references/PageManager',
        method: METHODS.GET,
        mockResponse: MOCK_REFERENCES.PageManager,
        useAuthentication: true,
      };
      getReferences({ page: 1, pageSize: 10 }, 'administrators', 'PageManager');
      expect(makeRequest).toHaveBeenCalledWith(
        correctRequestPageReferences,
        {
          page: 1,
          pageSize: 10,
        },
      );
    });
  });
});
