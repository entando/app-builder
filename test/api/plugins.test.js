import 'test/enzyme-init';
import { makeRequest, METHODS } from '@entando/apimanager';
import {
  getPlugins,
  getPlugin,
  putPluginConfig,
} from 'api/plugins';
import { PLUGIN_OK, PLUGINS_OK } from 'test/mocks/plugins';

jest.unmock('api/plugins');
jest.mock('@entando/apimanager', () => ({
  makeRequest: jest.fn(() => new Promise(resolve => resolve({}))),
  METHODS: require.requireActual('@entando/apimanager').METHODS,
}));

describe('api/plugins', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getPlugins', () => {
    it('returns a promise', () => {
      expect(getPlugins()).toBeInstanceOf(Promise);
    });

    it('makes the correct request', () => {
      getPlugins();
      expect(makeRequest).toHaveBeenCalledWith(expect.objectContaining({
        uri: '/plugins/info',
        domain: '/digital-exchange',
        method: METHODS.GET,
        useAuthentication: true,
      }), undefined);
    });
  });

  xdescribe('getPlugin', () => {
    it('returns a promise', () => {
      expect(getPlugin(1)).toBeInstanceOf(Promise);
    });

    it('makes the correct request', () => {
      getPlugin(1);
      expect(makeRequest).toHaveBeenCalledWith(expect.objectContaining({
        uri: '/api/plugins/1',
        method: METHODS.GET,
        useAuthentication: true,
      }));
    });
  });

  xdescribe('putPluginConfig', () => {
    it('returns a promise', () => {
      expect(putPluginConfig({})).toBeInstanceOf(Promise);
    });

    it('makes the correct request', () => {
      const body = PLUGIN_OK;
      putPluginConfig(body);
      expect(makeRequest).toHaveBeenCalledWith(expect.objectContaining({
        uri: '/api/plugins/config/1',
        method: METHODS.PUT,
        body: PLUGIN_OK.formData,
        useAuthentication: true,
      }));
    });
  });
});
