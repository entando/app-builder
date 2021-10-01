import { mockApi } from 'test/testUtils';
import { GET_CONTENT_TYPES_RESPONSE_OK } from 'test/mocks/contentType';

// eslint-disable-next-line import/prefer-default-export
export const getContentTypes = jest.fn(mockApi({ payload: GET_CONTENT_TYPES_RESPONSE_OK }));
