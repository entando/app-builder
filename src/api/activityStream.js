import { makeRequest, METHODS } from '@entando/apimanager';

import { NOTIFICATION } from 'test/mocks/activityStream';

// eslint-disable-next-line
export const getActivityStream = () => (
  makeRequest({
    uri: '/api/activityStream',
    method: METHODS.GET,
    mockResponse: NOTIFICATION,
    useAuthentication: true,
  })
);

export const postActivityStreamComment = record => (
  makeRequest({
    uri: `/api/activityStream/${record.id}/comments`,
    method: METHODS.POST,
    body: record,
    mockResponse: NOTIFICATION,
    useAuthentication: true,
  })
);

export const deleteActivityStreamComment = record => (
  makeRequest({
    uri: `/api/activityStream/${record.id}/comments/${record.commentId}`,
    method: METHODS.DELETE,
    body: record,
    mockResponse: record.id,
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
