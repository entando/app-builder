import { mockApi } from 'test/testUtils';

export const getWidget = jest.fn(mockApi({ payload: {} }));
export const getWidgets = jest.fn(mockApi({ payload: [] }));
export const postWidgets = jest.fn(mockApi({ payload: {} }));
export const putWidgets = jest.fn(mockApi({ payload: {} }));
export const deleteWidgets = jest.fn(mockApi({ payload: {} }));
