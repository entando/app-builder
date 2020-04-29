import { mockApi } from 'test/testUtils';

export const getPageTemplates = jest.fn(mockApi({ payload: [] }));
export const getPageTemplate = jest.fn(mockApi({ payload: {} }));
export const deletePageTemplate = jest.fn(mockApi({ payload: {} }));
export const putPageTemplate = jest.fn(mockApi({ payload: {} }));
export const postPageTemplate = jest.fn(mockApi({ payload: {} }));
export const getPageReferences = jest.fn(mockApi({ payload: [] }));
