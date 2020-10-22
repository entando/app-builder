import 'test/enzyme-init';
import { getUserPreferences, putUserPreferences } from 'api/userPreferences';
import { makeRequest, METHODS } from '@entando/apimanager';
import { USER_PREFERENCES } from 'test/mocks/userPreferences';

jest.unmock('api/userPreferences');
jest.mock('@entando/apimanager', () => ({
  makeRequest: jest.fn(() => new Promise(resolve => resolve({}))),
  METHODS: require.requireActual('@entando/apimanager').METHODS,
}));
const username = 'username';

describe('api/userPreferences', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getUserPreferences', () => {
    it('returns a promise', () => {
      expect(getUserPreferences()).toBeInstanceOf(Promise);
    });

    it('makes the correct request', () => {
      getUserPreferences(username);
      expect(makeRequest).toHaveBeenCalledWith({
        uri: `/api/userPreferences/${username}`,
        method: METHODS.GET,
        mockResponse: USER_PREFERENCES,
        useAuthentication: true,
      });
    });
  });

  describe('putUserPreferences', () => {
    it('returns a promise', () => {
      expect(putUserPreferences(username, USER_PREFERENCES)).toBeInstanceOf(Promise);
    });

    it('makes the correct request', () => {
      putUserPreferences(username, USER_PREFERENCES);
      expect(makeRequest).toHaveBeenCalledWith({
        uri: `/api/userPreferences/${username}`,
        method: METHODS.PUT,
        body: USER_PREFERENCES,
        mockResponse: USER_PREFERENCES,
        useAuthentication: true,
      });
    });
  });
});
