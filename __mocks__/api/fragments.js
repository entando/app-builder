import { mockApi } from 'test/testUtils';

export const getFragment = jest.fn(mockApi({ payload: {} }));
export const getFragments = jest.fn(mockApi({ payload: [] }));
export const getWidgetTypes = jest.fn();
export const getPlugins = jest.fn();
export const getFragmentSettings = jest.fn(mockApi({ payload: [] }));
export const putFragmentSettings = jest.fn(mockApi({ payload: {} }));
export const deleteFragment = jest.fn(mockApi({ payload: {} }));
