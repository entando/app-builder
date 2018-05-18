import { mockApi } from 'test/testUtils';
import { USER_SETTINGS } from 'test/mocks/userSettings';

export const getUserSettings = jest.fn(mockApi({ payload: USER_SETTINGS }));
export const putUserSettings = jest.fn(mockApi({ payload: USER_SETTINGS }));
