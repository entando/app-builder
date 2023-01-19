import { mockApi } from 'test/testUtils';

export const getCategoryTree = jest.fn(mockApi({ payload: {} }));
export const getCategory = jest.fn(mockApi({ payload: [] }));
export const getReferences = jest.fn(mockApi({ payload: [] }));
