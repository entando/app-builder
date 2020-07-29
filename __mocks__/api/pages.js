import { mockApi } from 'test/testUtils';

export const getPage = jest.fn(mockApi({ payload: {} }));
export const getPageSEO = jest.fn(mockApi({ payload: {} }));
export const getPageChildren = jest.fn(mockApi({ payload: {} }));
export const setPagePosition = jest.fn(mockApi({ payload: {} }));
export const postPage = jest.fn(mockApi({ payload: {} }));
export const putPage = jest.fn(mockApi({ payload: {} }));
export const postPageSEO = jest.fn(mockApi({ payload: {} }));
export const putPageSEO = jest.fn(mockApi({ payload: {} }));
export const patchPage = jest.fn(mockApi({ payload: {} }));
export const putPageStatus = jest.fn(mockApi({ payload: {} }));
export const getFreePages = jest.fn(mockApi({ payload: [] }));
export const getPageSettings = jest.fn(mockApi({ payload: {} }));
export const putPageSettings = jest.fn(mockApi({ payload: {} }));
export const deletePage = jest.fn(mockApi({ payload: {} }));
export const getSearchPages = jest.fn(mockApi({ payload: [] }));
export const getReferencesPage = jest.fn(mockApi({ payload: [] }));
