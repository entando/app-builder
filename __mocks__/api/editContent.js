import { mockApi } from 'test/testUtils';
import { GET_CONTENT_RESPONSE_OK } from 'test/mocks/editContent';

// eslint-disable-next-line import/prefer-default-export
export const getContent = jest.fn(mockApi({ payload: GET_CONTENT_RESPONSE_OK }));
