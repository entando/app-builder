import { mockApi } from 'test/testUtils';

export const getPageModels = jest.fn(mockApi({ payload: [] }));
export const getPageModel = jest.fn(mockApi({ payload: {} }));
export const deletePageModel = jest.fn(mockApi({ payload: {} }));
