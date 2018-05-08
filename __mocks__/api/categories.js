import { mockApi } from 'test/testUtils';

export const getCategoryTree = jest.fn(mockApi({ payload: {} }));
export const getCategory = jest.fn(mockApi({ payload: [] }));
export const postCategory = jest.fn(mockApi({ payload: {} }));
export const putCategory = jest.fn(mockApi({ payload: {} }));
export const deleteCategory = jest.fn(mockApi({ payload: {} }));
export const getReferences = jest.fn(mockApi({ payload: [] }));
