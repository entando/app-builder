import { mockApi } from 'test/testUtils';
import { DATA_MODELS } from 'test/mocks/dataModels';

export const getDataModels = jest.fn(mockApi({ payload: DATA_MODELS.payload }));
export const getDataModel = jest.fn(mockApi({ payload: DATA_MODELS.payload[0] }));
export const postDataModel = jest.fn(mockApi({ payload: {} }));
export const putDataModel = jest.fn(mockApi({ payload: {} }));
export const deleteDataModel = jest.fn(mockApi({ payload: {} }));
