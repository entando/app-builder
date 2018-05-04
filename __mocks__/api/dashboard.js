import { mockApi } from 'test/testUtils';
import { INTEGRATION, PAGE_STATUS } from 'test/mocks/dashboard';

// eslint-disable-next-line import/prefer-default-export
export const getIntegration = jest.fn(mockApi({ payload: INTEGRATION }));
export const getPageStatus = jest.fn(mockApi({ payload: PAGE_STATUS }));
