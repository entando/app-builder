import { mockApi } from 'test/testUtils';

export const getRole = jest.fn(mockApi({ payload: {} }));
export const getRoles = jest.fn(mockApi({ payload: [] }));
export const postRoles = jest.fn(mockApi({ payload: {} }));
export const putRole = jest.fn(mockApi({ payload: {} }));
