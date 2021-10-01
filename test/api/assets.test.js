import { configEnzymeAdapter } from 'testutils/helpers';

import {
  getAssets, editAsset, deleteAsset, createAsset, cloneAsset,
} from 'api/assets';
import { makeRequest } from '@entando/apimanager';
import { GET_ASSETS_RESPONSE_OK } from 'testutils/mocks/assets';

configEnzymeAdapter();

jest.unmock('api/assets');
jest.mock('@entando/apimanager', () => ({
  makeRequest: jest.fn(() => new Promise(resolve => resolve({}))),
  METHODS: { GET: 'GET', POST: 'POST', DELETE: 'DELETE' },
}));

describe('api/assets', () => {
  describe('getAssets', () => {
    it('returns a promise', () => {
      const response = getAssets();
      expect(makeRequest).toHaveBeenCalledWith({
        uri: '/api/plugins/cms/assets',
        method: 'GET',
        mockResponse: GET_ASSETS_RESPONSE_OK,
        contentType: 'application/json',
        useAuthentication: true,
      }, { page: 1, pageSize: 10 });
      expect(response).toBeInstanceOf(Promise);
    });
  });

  describe('createAsset', () => {
    it('returns a promise', () => {
      const file = { name: 'iamfile.jpg' };
      const response = createAsset(file, '?hello');
      expect(makeRequest).toHaveBeenCalledWith({
        uri: '/api/plugins/cms/assets/?hello',
        body: file,
        method: 'POST',
        mockResponse: GET_ASSETS_RESPONSE_OK,
        contentType: 'multipart/form-data',
        useAuthentication: true,
      });
      expect(response).toBeInstanceOf(Promise);
    });
    it('returns a promise without params', () => {
      const file = { name: 'iamfile.jpg' };
      const response = createAsset(file);
      expect(makeRequest).toHaveBeenCalledWith({
        uri: '/api/plugins/cms/assets/',
        body: file,
        method: 'POST',
        mockResponse: GET_ASSETS_RESPONSE_OK,
        contentType: 'multipart/form-data',
        useAuthentication: true,
      });
      expect(response).toBeInstanceOf(Promise);
    });
  });

  describe('editAssets', () => {
    it('returns a promise', () => {
      const file = { name: 'iamfile.jpg' };
      const response = editAsset(1, file, '?hello');
      expect(makeRequest).toHaveBeenCalledWith({
        uri: '/api/plugins/cms/assets/1?hello',
        body: file,
        method: 'POST',
        mockResponse: GET_ASSETS_RESPONSE_OK,
        contentType: 'multipart/form-data',
        useAuthentication: true,
      });
      expect(response).toBeInstanceOf(Promise);
    });
    it('returns a promise without params', () => {
      const file = { name: 'iamfile.jpg' };
      const response = editAsset(1, file, '');
      expect(makeRequest).toHaveBeenCalledWith({
        uri: '/api/plugins/cms/assets/1',
        body: file,
        method: 'POST',
        mockResponse: GET_ASSETS_RESPONSE_OK,
        contentType: 'multipart/form-data',
        useAuthentication: true,
      });
      expect(response).toBeInstanceOf(Promise);
    });
  });

  describe('deleteAsset', () => {
    it('returns a promise', () => {
      const response = deleteAsset(1);
      expect(makeRequest).toHaveBeenCalledWith({
        uri: '/api/plugins/cms/assets/1',
        method: 'DELETE',
        mockResponse: GET_ASSETS_RESPONSE_OK,
        contentType: 'application/json',
        useAuthentication: true,
      });
      expect(response).toBeInstanceOf(Promise);
    });
  });
  describe('cloneAsset', () => {
    it('returns a promise', () => {
      const response = cloneAsset(1);
      expect(makeRequest).toHaveBeenCalledWith({
        uri: '/api/plugins/cms/assets/1/clone',
        method: 'POST',
        body: {},
        mockResponse: GET_ASSETS_RESPONSE_OK,
        contentType: 'application/json',
        useAuthentication: true,
      });
      expect(response).toBeInstanceOf(Promise);
    });
  });
});
