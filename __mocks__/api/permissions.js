import { mockApi } from 'test/testUtils';

export const getPermissions = jest.fn(mockApi({ payload: [] }));

export const getMyGroupPermissions = jest.fn(mockApi({ payload: [] }));
