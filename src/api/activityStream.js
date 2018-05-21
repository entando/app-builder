import { makeRequest, METHODS } from '@entando/apimanager';

import { NOTIFICATION } from 'test/mocks/activityStream';

export const getActivityStream = (page = { page: 1, pageSize: 10 }, params = '') => (
  makeRequest({
    uri: `/api/activityStream${params}`,
    method: METHODS.GET,
    mockResponse: NOTIFICATION,
    useAuthentication: true,
  }, page)
);

export const postActivityStreamComment = comment => (
  makeRequest({
    uri: `/api/activityStream/${comment.recordId}/comments`,
    method: METHODS.POST,
    body: comment,
    mockResponse: NOTIFICATION,
    useAuthentication: true,
  })
);

export const deleteActivityStreamComment = comment => (
  makeRequest({
    uri: `/api/activityStream/${comment.recordId}/comments/${comment.commentId}`,
    method: METHODS.DELETE,
    mockResponse: comment.recordId,
    useAuthentication: true,
  })
);


export const postActivityStreamLike = record => (
  makeRequest({
    uri: `/api/activityStream/${record.id}/like`,
    method: METHODS.POST,
    body: {},
    mockResponse: NOTIFICATION,
    useAuthentication: true,
  })
);

export const deleteActivityStreamLike = record => (
  makeRequest({
    uri: `/api/activityStream/${record.id}/like`,
    method: METHODS.DELETE,
    body: {},
    mockResponse: NOTIFICATION,
    useAuthentication: true,
  })
);
