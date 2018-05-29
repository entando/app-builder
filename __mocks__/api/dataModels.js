import { mockApi } from 'test/testUtils';
import { DATA_MODELS } from 'test/mocks/dataModels';

export const getDataModels = jest.fn(mockApi({ payload: DATA_MODELS.payload }));
export const postDataModel = jest.fn(mockApi({ payload: {} }));
