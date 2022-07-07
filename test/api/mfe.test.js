import 'test/enzyme-init';
import { getMfeConfigList } from 'api/mfe';
import { makeMockRequest, METHODS } from '@entando/apimanager';
import { LIST_MFE_RESPONSE_OK } from 'test/mocks/mfe';

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
          uri: '/bundles/all/widgets?widgetType="app-builder"',
          method: METHODS.GET,
          mockResponse: LIST_MFE_RESPONSE_OK,
          useAuthentication: true,
        },
        NO_PAGE,
      );
    });
  });
});
