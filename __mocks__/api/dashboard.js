import { mockApi } from 'test/testUtils';
import { INTEGRATION, PAGE_STATUS } from 'test/mocks/dashboard';

export const getIntegration = jest.fn(mockApi({ payload: INTEGRATION }));
export const getPageStatus = jest.fn(mockApi({ payload: PAGE_STATUS }));
