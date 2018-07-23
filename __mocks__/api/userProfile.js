import { mockApi } from 'test/testUtils';
import { USER_PROFILE } from 'test/mocks/userProfile';

export const getUserProfile = jest.fn(mockApi({ payload: USER_PROFILE }));
export const putUserProfile = jest.fn(mockApi({ payload: USER_PROFILE }));
export const postUserProfile = jest.fn(mockApi({ payload: USER_PROFILE }));
