import { mockApi } from 'test/testUtils';
import { NOTIFICATIONS } from 'test/mocks/activityStream';

export const getActivityStream = jest.fn(mockApi({ payload: NOTIFICATIONS }));
export const postActivityStreamComment = jest.fn(mockApi({ payload: NOTIFICATIONS[0] }));
export const deleteActivityStreamComment = jest.fn(mockApi({ payload: NOTIFICATIONS[0] }));
export const postActivityStreamLike = jest.fn(mockApi({ payload: NOTIFICATIONS[0] }));
export const deleteActivityStreamLike = jest.fn(mockApi({ payload: NOTIFICATIONS[0] }));
