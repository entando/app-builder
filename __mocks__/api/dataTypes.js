import { mockApi } from 'test/testUtils';

export const postDataType = jest.fn(mockApi({ payload: {} }));
export const putDataType = jest.fn(mockApi({ payload: {} }));
export const deleteDataType = jest.fn(mockApi({ payload: {} }));
export const getDataType = jest.fn(mockApi({ payload: {} }));
export const getDataTypes = jest.fn(mockApi({ payload: [] }));
export const getDataTypeAttributes = jest.fn(mockApi({ payload: [] }));
export const getDataTypeAttribute = jest.fn(mockApi({ payload: {} }));
export const deleteAttributeFromDataType = jest.fn(mockApi({ payload: {} }));
export const getAttributeFromDataType = jest.fn(mockApi({ payload: {} }));
export const postAttributeFromDataType = jest.fn(mockApi({ payload: {} }));
export const putAttributeFromDataType = jest.fn(mockApi({ payload: {} }));
export const getDataTypesStatus = jest.fn(mockApi({ payload: {} }));
