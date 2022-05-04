import 'test/enzyme-init';
import { getMfeConfigList, addMfeConfig, updateMfeConfig } from 'api/mfe';
import { makeMockRequest, METHODS } from '@entando/apimanager';
import { LIST_MFE_RESPONSE_OK, ADD_MFE_OK, UPDATE_MFE_OK } from 'test/mocks/mfe';

const NO_PAGE = {
  page: 1,
  pageSize: 0,
};

jest.mock('@entando/apimanager', () => ({
  makeRequest: jest.fn(() => new Promise(resolve => resolve({}))),
  makeMockRequest: jest.fn(() => new Promise(resolve => resolve({}))),
  METHODS: require.requireActual('@entando/apimanager').METHODS,
}));

describe('api/mfe', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getMfeConfigList', () => {
    it('returns a promise', () => {
      expect(getMfeConfigList()).toBeInstanceOf(Promise);
    });

    it('makes the correct request', () => {
      getMfeConfigList();
      expect(makeMockRequest).toHaveBeenCalledWith(
        {
          uri: 'api/ecr/config-list',
          method: METHODS.GET,
          mockResponse: LIST_MFE_RESPONSE_OK,
          useAuthentication: true,
        },
        NO_PAGE,
      );
    });
  });
  describe('addMfeConfig', () => {
    it('returns a promise', () => {
      expect(addMfeConfig('1')).toBeInstanceOf(Promise);
    });

    it('makes the correct request', () => {
      addMfeConfig('1');
      expect(makeMockRequest).toHaveBeenCalledWith({
        uri: 'api/ecr/add-config/1',
        method: METHODS.GET,
        mockResponse: ADD_MFE_OK,
        useAuthentication: true,
      });
    });
  });
  describe('updateMfeConfig', () => {
    it('returns a promise', () => {
      expect(updateMfeConfig()).toBeInstanceOf(Promise);
    });

    it('makes the correct request', () => {
      updateMfeConfig('1', 2);
      expect(makeMockRequest).toHaveBeenCalledWith({
        uri: 'api/ecr/update-config/1/2',
        method: METHODS.GET,
        mockResponse: UPDATE_MFE_OK,
        useAuthentication: true,
      });
    });
  });
});
