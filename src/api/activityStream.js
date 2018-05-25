import { makeRequest, METHODS } from '@entando/apimanager';

import { NOTIFICATIONS } from 'test/mocks/activityStream';

export const getActivityStream = (page = { page: 1, pageSize: 10 }, params = '') => (
  makeRequest({
    uri: `/api/activityStream${params}`,
    method: METHODS.GET,
    mockResponse: NOTIFICATIONS,
    useAuthentication: true,
  }, page)
);

export const postActivityStreamComment = comment => (
  makeRequest({
    uri: `/api/activityStream/${comment.recordId}/comments`,
    method: METHODS.POST,
    body: comment,
    mockResponse: NOTIFICATIONS,
    useAuthentication: true,
  })
);

export const deleteActivityStreamComment = comment => makeRequest({
  uri: `/api/activityStream/${comment.recordId}/comments/${comment.commentId}`,
  method: METHODS.DELETE,
  mockResponse: NOTIFICATIONS,
  useAuthentication: true,
});


export const postActivityStreamLike = recordId => (
  makeRequest({
    uri: `/api/activityStream/${recordId}/like`,
    method: METHODS.POST,
    body: {},
    mockResponse: NOTIFICATIONS,
    useAuthentication: true,
  })
);

export const deleteActivityStreamLike = recordId => (
  makeRequest({
    uri: `/api/activityStream/${recordId}/like`,
    method: METHODS.DELETE,
    mockResponse: NOTIFICATIONS,
    useAuthentication: true,
  })
);
