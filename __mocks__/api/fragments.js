import { mockApi } from 'test/testUtils';
import { PLUGINS_OK } from 'test/mocks/fragments';

export const getFragment = jest.fn(mockApi({ payload: {} }));
export const getFragments = jest.fn(mockApi({ payload: [] }));
export const getWidgetTypes = jest.fn();
export const getPlugins = jest.fn(mockApi({ payload: PLUGINS_OK.payload }));
export const getFragmentSettings = jest.fn(mockApi({ payload: [] }));
export const putFragmentSettings = jest.fn(mockApi({ payload: {} }));
export const deleteFragment = jest.fn(mockApi({ payload: {} }));
export const postFragment = jest.fn(mockApi({ payload: {} }));
export const putFragment = jest.fn(mockApi({ payload: {} }));
