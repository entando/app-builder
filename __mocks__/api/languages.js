import { mockApi } from 'test/testUtils';
import { LANGUAGES_LIST } from 'test/mocks/languages';

// eslint-disable-next-line import/prefer-default-export
export const getLanguages = jest.fn(mockApi({ payload: LANGUAGES_LIST }));
