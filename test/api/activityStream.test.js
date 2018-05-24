import 'test/enzyme-init';
import {
  getActivityStream,
  postActivityStreamComment,
  deleteActivityStreamComment,
  postActivityStreamLike,
  deleteActivityStreamLike,

} from 'api/activityStream';

import { makeRequest, METHODS } from '@entando/apimanager';
import { COMMENT, NOTIFICATION } from 'test/mocks/activityStream';

jest.unmock('api/activityStream');
jest.mock('@entando/apimanager', () => ({
  makeRequest: jest.fn(() => new Promise(resolve => resolve({}))),
  METHODS: require.requireActual('@entando/apimanager').METHODS,
}));

const RECORD = {
  id: 10,
  comment: 'text comment',
  commentId: 99,
};

describe('api/activityStream', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getActivityStream', () => {
    it('returns a promise', () => {
      expect(getActivityStream()).toBeInstanceOf(Promise);
    });

    it('if successful, returns a mock ok response', () => {
      getActivityStream();
      expect(makeRequest).toHaveBeenCalledWith(expect.objectContaining({
        uri: '/api/activityStream',
        method: METHODS.GET,
        useAuthentication: true,
      }));
    });
  });
  describe('postActivityStreamComment', () => {
    it('returns a promise', () => {
      expect(postActivityStreamComment(RECORD)).toBeInstanceOf(Promise);
    });

    it('if successful, returns a mock ok response', () => {
      postActivityStreamComment(RECORD);
      expect(makeRequest).toHaveBeenCalledWith(expect.objectContaining({
        uri: '/api/activityStream/10/comments',
        method: METHODS.POST,
        body: RECORD,
        useAuthentication: true,
      }));
    });
  });
  describe('deleteActivityStreamComment', () => {
    it('returns a promise', () => {
      expect(deleteActivityStreamComment(RECORD)).toBeInstanceOf(Promise);
    });

    it('if successful, returns a mock ok response', () => {
      deleteActivityStreamComment(RECORD);
      expect(makeRequest).toHaveBeenCalledWith(expect.objectContaining({
        uri: '/api/activityStream/10/comments/99',
        method: METHODS.DELETE,
        useAuthentication: true,
      }));
    });
  });
  describe('postActivityStreamLike', () => {
    it('returns a promise', () => {
      expect(postActivityStreamLike(RECORD)).toBeInstanceOf(Promise);
    });

    it('if successful, returns a mock ok response', () => {
      postActivityStreamLike(RECORD);
      expect(makeRequest).toHaveBeenCalledWith(expect.objectContaining({
        uri: '/api/activityStream/10/like',
        method: METHODS.POST,
        useAuthentication: true,
      }));
    });
  });
  describe('deleteActivityStreamLike', () => {
    it('returns a promise', () => {
      expect(deleteActivityStreamLike(RECORD)).toBeInstanceOf(Promise);
    });

    it('if successful, returns a mock ok response', () => {
      deleteActivityStreamLike(RECORD);
      expect(makeRequest).toHaveBeenCalledWith(expect.objectContaining({
        uri: '/api/activityStream/10/like',
        method: METHODS.DELETE,
        useAuthentication: true,
      }));
    });
  });
});
