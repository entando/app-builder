import 'test/enzyme-init';
import {
  getGroups,
  postGroup,
  putGroup,
  getGroup,
  getPageReferences,
  getUserReferences,
  getWidgetTypeReferences,
  getContentReferences,
  getResourceReferences,
} from 'api/groups';
import { makeRequest, makeMockRequest, METHODS } from 'api/apiManager';
import {
  PAGE_REFERENCES,
  USER_REFERENCES,
  WIDGETTYPE_REFERENCES,
  GROUP_CONTENT_REFERENCES,
  RESOURCE_REFERENCES,
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
jest.mock('api/apiManager', () => ({
  makeRequest: jest.fn(() => new Promise(resolve => resolve({}))),
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

  describe('getPageReferences', () => {
    it('returns a promise', () => {
      expect(getPageReferences({ page: 1, pageSize: 10 }, 'administrators')).toBeInstanceOf(Promise);
    });

    it('makes the request with additional params', () => {
      const correctRequestPageReferences = {
        uri: '/groups/administrators/references/PageManager',
        method: METHODS.GET,
        mockResponse: PAGE_REFERENCES.administrators.list,
        errors: expect.any(Function),
      };
      getPageReferences({ page: 1, pageSize: 10 }, 'administrators');
      expect(makeMockRequest).toHaveBeenCalledWith(
        correctRequestPageReferences,
        {
          page: 1,
          pageSize: 10,
        },
      );
    });
  });

  describe('getUserReferences', () => {
    it('returns a promise', () => {
      expect(getUserReferences({ page: 1, pageSize: 10 }, 'administrators')).toBeInstanceOf(Promise);
    });

    it('makes the request with additional params', () => {
      const correctRequestUserReferences = {
        uri: '/groups/administrators/references/UserManager',
        method: METHODS.GET,
        mockResponse: USER_REFERENCES.administrators.list,
        errors: expect.any(Function),
      };
      getUserReferences({ page: 1, pageSize: 10 }, 'administrators');
      expect(makeMockRequest).toHaveBeenCalledWith(
        correctRequestUserReferences,
        {
          page: 1,
          pageSize: 10,
        },
      );
    });
  });

  describe('getWidgetTypeReferences', () => {
    it('returns a promise', () => {
      expect(getWidgetTypeReferences({ page: 1, pageSize: 10 }, 'administrators')).toBeInstanceOf(Promise);
    });

    it('makes the request with additional params', () => {
      const correctRequestWidgetTypeReferences = {
        uri: '/groups/administrators/references/WidgetTypeManager',
        method: METHODS.GET,
        mockResponse: WIDGETTYPE_REFERENCES.administrators.list,
        errors: expect.any(Function),
      };
      getWidgetTypeReferences({ page: 1, pageSize: 10 }, 'administrators');
      expect(makeMockRequest).toHaveBeenCalledWith(
        correctRequestWidgetTypeReferences,
        {
          page: 1,
          pageSize: 10,
        },
      );
    });
  });

  describe('getContentReferences', () => {
    it('returns a promise', () => {
      expect(getContentReferences({ page: 1, pageSize: 10 }, 'administrators')).toBeInstanceOf(Promise);
    });

    it('makes the request with additional params', () => {
      const correctRequestContentReferences = {
        uri: '/groups/administrators/references/ContentManager',
        method: METHODS.GET,
        mockResponse: GROUP_CONTENT_REFERENCES.administrators.list,
        errors: expect.any(Function),
      };
      getContentReferences({ page: 1, pageSize: 10 }, 'administrators');
      expect(makeMockRequest).toHaveBeenCalledWith(
        correctRequestContentReferences,
        {
          page: 1,
          pageSize: 10,
        },
      );
    });
  });

  describe('getResourceReferences', () => {
    it('returns a promise', () => {
      expect(getResourceReferences({ page: 1, pageSize: 10 }, 'administrators')).toBeInstanceOf(Promise);
    });

    it('makes the request with additional params', () => {
      const correctRequestResourceReferences = {
        uri: '/groups/administrators/references/ResourceManager',
        method: METHODS.GET,
        mockResponse: RESOURCE_REFERENCES.administrators.list,
        errors: expect.any(Function),
      };
      getResourceReferences({ page: 1, pageSize: 10 }, 'administrators');
      expect(makeMockRequest).toHaveBeenCalledWith(
        correctRequestResourceReferences,
        {
          page: 1,
          pageSize: 10,
        },
      );
    });
  });
});
