import 'test/enzyme-init';
import { getUserSettings, putUserSettings } from 'api/userSettings';
import { makeRequest, METHODS } from '@entando/apimanager';
import { USER_SETTINGS } from 'test/mocks/userSettings';


jest.unmock('api/userSettings');
jest.mock('@entando/apimanager', () => ({
  makeRequest: jest.fn(() => new Promise(resolve => resolve({}))),
  METHODS: require.requireActual('@entando/apimanager').METHODS,
}));

describe('api/userSettings', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getUserSettings', () => {
    it('returns a promise', () => {
      expect(getUserSettings()).toBeInstanceOf(Promise);
    });

    it('makes the correct request', () => {
      getUserSettings();
      expect(makeRequest).toHaveBeenCalledWith({
        uri: '/api/userSettings',
        method: METHODS.GET,
        mockResponse: USER_SETTINGS,
        useAuthentication: true,
      });
    });
  });

  describe('putUserSettings', () => {
    it('returns a promise', () => {
      expect(putUserSettings()).toBeInstanceOf(Promise);
    });

    it('makes the correct request', () => {
      const body = { key: true };
      putUserSettings(body);
      expect(makeRequest).toHaveBeenCalledWith({
        uri: '/api/userSettings',
        method: METHODS.PUT,
        body,
        mockResponse: USER_SETTINGS,
        useAuthentication: true,
      });
    });
  });
});
