import 'test/enzyme-init';
import { reloadConf } from 'api/reloadConfiguration';
import { makeRequest, METHODS } from '@entando/apimanager';

jest.unmock('api/reloadConfiguration');

jest.mock('@entando/apimanager', () => ({
  makeRequest: jest.fn(() => new Promise(resolve => resolve({}))),
  METHODS: require.requireActual('@entando/apimanager').METHODS,
}));

beforeEach(jest.clearAllMocks);
describe('api/reloadConfiguration', () => {
  describe('reloadConf()', () => {
    it('if successful, returns a mock ok response', () => {
      expect(reloadConf()).toBeInstanceOf(Promise);
    });

    it('if successful, returns a mock ok response', () => {
      reloadConf();
      expect(makeRequest).toHaveBeenCalledWith(expect.objectContaining({
        uri: '/api/reloadConfiguration',
        method: METHODS.POST,
        useAuthentication: true,
      }));
    });
  });
});
