import 'test/enzyme-init';
import { makeMockRequest, METHODS } from '@entando/apimanager';
import {
  getPlugins,
  getPlugin,
  putPluginConfig,
} from 'api/plugins';
import { PLUGIN_OK, PLUGINS_OK } from 'test/mocks/plugins';

jest.unmock('api/plugins');
jest.mock('@entando/apimanager', () => ({
  makeMockRequest: jest.fn(() => new Promise(resolve => resolve({}))),
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
      expect(makeMockRequest).toHaveBeenCalledWith({
        uri: '/api/plugins',
        method: METHODS.GET,
        mockResponse: PLUGINS_OK,
        useAuthentication: true,
      }, undefined);
    });
  });

  describe('getPlugin', () => {
    it('returns a promise', () => {
      expect(getPlugin(1)).toBeInstanceOf(Promise);
    });

    it('makes the correct request', () => {
      getPlugin(1);
      expect(makeMockRequest).toHaveBeenCalledWith({
        uri: '/api/plugins/1',
        method: METHODS.GET,
        mockResponse: PLUGIN_OK,
        useAuthentication: true,
      });
    });
  });

  describe('putPluginConfig', () => {
    it('returns a promise', () => {
      expect(putPluginConfig({})).toBeInstanceOf(Promise);
    });

    it('makes the correct request', () => {
      const body = PLUGIN_OK;
      putPluginConfig(body);
      expect(makeMockRequest).toHaveBeenCalledWith({
        uri: '/api/plugins/config/1',
        method: METHODS.PUT,
        mockResponse: PLUGIN_OK,
        body: PLUGIN_OK.formData,
        useAuthentication: true,
      });
    });
  });
});
