import { mockApi } from 'test/testUtils';

export const getPageModels = jest.fn(mockApi({ payload: [] }));
export const getPageModel = jest.fn(mockApi({ payload: {} }));
export const deletePageModel = jest.fn(mockApi({ payload: {} }));
export const putPageModel = jest.fn(mockApi({ payload: {} }));
export const postPageModel = jest.fn(mockApi({ payload: {} }));
export const getPageReferences = jest.fn(mockApi({ payload: [] }));
