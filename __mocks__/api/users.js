import { mockApi } from 'test/testUtils';

export const getUserDetail = jest.fn(mockApi({ payload: {} }));
export const getUsers = jest.fn(mockApi({ payload: [] }));
export const postUser = jest.fn(mockApi({ payload: {} }));
export const putUser = jest.fn(mockApi({ payload: {} }));
export const getUser = jest.fn(mockApi({ payload: {} }));
export const deleteUser = jest.fn(mockApi({ payload: {} }));
