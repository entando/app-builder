import { mockApi } from 'test/testUtils';
import { INTEGRATION } from 'test/mocks/dashboard';

// eslint-disable-next-line import/prefer-default-export
export const getIntegration = jest.fn(mockApi({ payload: INTEGRATION }));
