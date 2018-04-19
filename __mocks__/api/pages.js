import { mockApi } from 'test/testUtils';

export const getPage = jest.fn(mockApi({ payload: {} }));
export const getPageChildren = jest.fn(mockApi({ payload: {} }));
export const setPagePosition = jest.fn(mockApi({ payload: {} }));
export const postPage = jest.fn(mockApi({ payload: {} }));
export const putPage = jest.fn(mockApi({ payload: {} }));
export const putPageStatus = jest.fn(mockApi({ payload: {} }));
export const getFreePages = jest.fn(mockApi({ payload: [] }));
export const getPageSettingsList = jest.fn(mockApi({ payload: {} }));
export const deletePage = jest.fn(mockApi({ payload: {} }));
