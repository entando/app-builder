import { mockApi } from 'test/testUtils';

export const postDataType = jest.fn(mockApi({ payload: {} }));
export const putDataType = jest.fn(mockApi({ payload: {} }));
export const getDataTypes = jest.fn(mockApi({ payload: [] }));
export const getDataTypeAttributes = jest.fn(mockApi({ payload: [] }));
export const getDataTypeAttribute = jest.fn(mockApi({ payload: {} }));
