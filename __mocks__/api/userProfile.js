import { mockApi } from 'test/testUtils';
import { USER_PROFILE, USER_PROFILE_PICTURE } from 'test/mocks/userProfile';

export const getUserProfile = jest.fn(mockApi({ payload: USER_PROFILE }));
export const putUserProfile = jest.fn(mockApi({ payload: USER_PROFILE }));
export const postUserProfile = jest.fn(mockApi({ payload: USER_PROFILE }));
export const getUserProfilePicture = jest.fn(mockApi({ payload: USER_PROFILE_PICTURE }));
export const postUserProfilePicture = jest.fn(mockApi({ payload: USER_PROFILE_PICTURE }));
export const deleteUserProfilePicture = jest.fn(mockApi({ payload: USER_PROFILE_PICTURE }));
