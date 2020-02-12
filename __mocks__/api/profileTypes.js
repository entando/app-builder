import { mockApi } from 'test/testUtils';

export const postProfileType = jest.fn(mockApi({ payload: {} }));
export const putProfileType = jest.fn(mockApi({ payload: {} }));
export const deleteProfileType = jest.fn(mockApi({ payload: {} }));
export const getProfileType = jest.fn(mockApi({ payload: {} }));
export const getProfileTypes = jest.fn(mockApi({ payload: [] }));
export const getProfileTypeAttributes = jest.fn(mockApi({ payload: [] }));
export const getProfileTypeAttribute = jest.fn(mockApi({ payload: {} }));
export const deleteAttributeFromProfileType = jest.fn(mockApi({ payload: {} }));
export const getAttributeFromProfileType = jest.fn(mockApi({ payload: {} }));
export const postAttributeFromProfileType = jest.fn(mockApi({ payload: {} }));
export const putAttributeFromProfileType = jest.fn(mockApi({ payload: {} }));
export const postRefreshProfileType = jest.fn(mockApi({ payload: {} }));
