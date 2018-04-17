import { mockApi } from 'test/testUtils';

export const getRole = jest.fn(mockApi({ payload: {} }));
export const getRoles = jest.fn(mockApi({ payload: [] }));
export const postRole = jest.fn(mockApi({ payload: {} }));
export const putRole = jest.fn(mockApi({ payload: {} }));
export const deleteRole = jest.fn(mockApi({ payload: {} }));
export const getUserReferences = jest.fn(mockApi({ payload: {} }));
